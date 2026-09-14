"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/site-data";
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from "libphonenumber-js/min";
import type { CountryCode } from "libphonenumber-js/min";

const regionNames = typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames(["en"], { type: "region" }) : null;

const countryList = getCountries().map((cCode) => {
  try {
    const country = cCode as CountryCode;
    const callingCode = getCountryCallingCode(country);
    let name: string = country;
    if (regionNames) {
      try {
        name = regionNames.of(country as string) || country;
      } catch {}
    }
    const flag = country
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
    return {
      country,
      name,
      code: `+${callingCode}`,
      flag,
    };
  } catch {
    return null;
  }
}).filter(Boolean).sort((a, b) => a!.name.localeCompare(b!.name)) as { country: string; name: string; code: string; flag: string }[];

type FormValues = {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
};
type SendPhase = "idle" | "sending" | "flying";

export function ContactForm() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const search = useSearchParams();
  const hinted = search.get("service") ?? "";
  const subservice = search.get("subservice") ?? "";
  const matched = services.some((s) => s.slug === hinted) ? hinted : "";
  const initialDetails = subservice ? `Enquiring about ${subservice}:\n` : "";

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      service: matched,
      countryCode: "+91",
      budget: "$25k - $50k",
      timeline: "Next 30 days",
      details: initialDetails
    },
  });

  const selectedCountryCode = watch("countryCode");

  const [state, setState] = useState("");
  const [sendPhase, setSendPhase] = useState<SendPhase>("idle");

  const submit = async (values: FormValues) => {
    setState("");
    setSendPhase("sending");
    try {
      const fullPhone = values.phoneNumber ? `${values.countryCode} ${values.phoneNumber}` : "";
      const payload = {
        name: values.name,
        email: values.email,
        phone: fullPhone,
        service: values.service,
        details: `[Budget: ${values.budget} | Timeline: ${values.timeline}]\n\n${values.details}`
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to send your enquiry.");
      setSendPhase("flying");
      window.setTimeout(() => setSendPhase("idle"), 1250);
      setState("Thank you! Your enquiry has been sent. Our executive producer will connect within 2 hours.");
    } catch (error) {
      setSendPhase("idle");
      setState(error instanceof Error ? error.message : "Unable to send your enquiry. Please try again.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="contact-form-header-badge" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px", paddingBottom: "10px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, color: "var(--color-primary, #2337C6)" }}>
          ✦ Direct Studio Brief
        </span>
        <span style={{ fontSize: "11px", color: "#666" }}>Response in &lt; 2 hrs</span>
      </div>

      <label>Your name
        <input {...register("name", { required: "Please enter your name", minLength: 2 })} autoComplete="name" placeholder="Shreeraj / Kiran" />
        {errors.name && <small>{errors.name.message}</small>}
      </label>

      <label>Email address
        <input {...register("email", { required: "Please enter an email", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })} type="email" autoComplete="email" placeholder="you@company.com" />
        {errors.email && <small>{errors.email.message}</small>}
      </label>

      <label>Contact number (with country code)
        <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "8px" }}>
          <select {...register("countryCode")} style={{ fontSize: "13px" }}>
            {mounted ? (
              countryList.map((c) => (
                <option key={`${c.country}-${c.code}`} value={c.code}>
                  {c.flag} {c.code} ({c.name})
                </option>
              ))
            ) : (
              <option value="+91">🇮🇳 +91 (India)</option>
            )}
          </select>
          <input
            {...register("phoneNumber", {
              validate: (val) => {
                if (!val) return true;
                const fullNumber = `${selectedCountryCode || "+91"}${val}`;
                return isValidPhoneNumber(fullNumber) || "Please enter a valid phone number";
              }
            })}
            type="tel"
            autoComplete="tel"
            placeholder="74474 74431"
          />
        </div>
        {errors.phoneNumber && <small>{errors.phoneNumber.message}</small>}
      </label>

      <label>Service needed
        <select {...register("service")}>
          <option value="">Select a core service or full chain</option>
          <option value="strategy-consulting">Strategy & Consulting</option>
          <option value="brand-development-pr">Brand Development & PR</option>
          <option value="content-production">Content & Production</option>
          <option value="social-media-growth">Social Media & Audience Growth</option>
          <option value="advertising-campaigns">Advertising & Campaigns</option>
          <option value="events-experiences">Events & Experiences</option>
          <option value="full-production">Full Production Chain</option>
        </select>
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <label>Project Budget
          <select {...register("budget")}>
            <option value="$10k - $25k">$10k - $25k</option>
            <option value="$25k - $50k">$25k - $50k</option>
            <option value="$50k - $100k+">$50k - $100k+</option>
            <option value="Custom / Enterprise">Custom / Enterprise</option>
          </select>
        </label>
        <label>Expected Timeline
          <select {...register("timeline")}>
            <option value="Immediate start">Immediate start</option>
            <option value="Next 30 days">Next 30 days</option>
            <option value="Next 3-6 months">Next 3-6 months</option>
            <option value="Flexible">Flexible</option>
          </select>
        </label>
      </div>

      <label>Tell us about your project
        <textarea {...register("details", { required: "Tell us a little about the project", minLength: 10 })} rows={4} placeholder="Describe your vision, scope, references, or milestones..." />
        {errors.details && <small>{errors.details.message}</small>}
      </label>

      <button className={`button send-button is-${sendPhase}`} disabled={isSubmitting || sendPhase !== "idle"} type="submit" aria-live="polite" style={{ marginTop: "6px", width: "100%", justifyContent: "center", padding: "14px 24px", fontWeight: 600 }}>
        <span className="send-button-label">{sendPhase === "sending" ? "Transmitting Brief…" : "Dispatch Studio Brief ↗"}</span>
        {sendPhase === "flying" && <span className="send-button-plane" aria-hidden="true">✈</span>}
      </button>

      {state && <p className="form-state success" role="status" style={{ marginTop: "12px", fontSize: "13px", padding: "10px", background: "rgba(35,55,198,0.08)", borderRadius: "6px" }}>{state}</p>}
    </form>
  );
}
