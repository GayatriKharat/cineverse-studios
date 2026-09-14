"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import { CountryCodeSelect } from "@/components/country-code-select";

type FormValues = {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  service: string;
  details: string;
};

type SendPhase = "idle" | "sending" | "flying";

const serviceOptions = [
  ["strategy-consulting", "Strategy & Consulting"],
  ["brand-development-pr", "Brand Development & PR"],
  ["content-production", "Content & Production"],
  ["social-media-growth", "Social Media & Audience Growth"],
  ["advertising-campaigns", "Advertising & Campaigns"],
  ["events-experiences", "Events & Experiences"],
  ["full-production", "Full Production Chain"],
  ["other", "Other"],
] as const;

export function ContactForm() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const search = useSearchParams();
  const hinted = search.get("service") ?? "";
  const subservice = search.get("subservice") ?? "";
  const matched = serviceOptions.some(([slug]) => slug === hinted) ? hinted : "";
  const initialDetails = subservice ? `Enquiring about ${subservice}:\n` : "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      service: matched,
      countryCode: "+91",
      details: initialDetails,
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
        details: values.details,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 404 || response.status === 405) {
        const contactEmail =
          process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "business@narayanistudios.com";
        const subject = encodeURIComponent(`Narayani Studios enquiry ${payload.service || "General"}`);
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nService: ${payload.service}\n\n${payload.details}`
        );
        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
        setSendPhase("idle");
        setState("Opening your email app to send the brief…");
        return;
      }

      let result: { error?: string; message?: string } = {};
      try {
        result = await response.json();
      } catch {
        const contactEmail =
          process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "business@narayanistudios.com";
        const subject = encodeURIComponent(`Narayani Studios enquiry ${payload.service || "General"}`);
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nService: ${payload.service}\n\n${payload.details}`
        );
        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
        setSendPhase("idle");
        setState("Opening your email app to send the brief…");
        return;
      }
      if (!response.ok) throw new Error(result.error ?? "Unable to send your enquiry.");
      setSendPhase("flying");
      window.setTimeout(() => setSendPhase("idle"), 1250);
      setState("Brief received. Our team will connect soon.");
    } catch (error) {
      setSendPhase("idle");
      setState(error instanceof Error ? error.message : "Unable to send your enquiry. Please try again.");
    }
  };

  if (!mounted) {
    return <div className="contact-form talk-form" aria-hidden />;
  }

  return (
    <form className="contact-form talk-form" onSubmit={handleSubmit(submit)} noValidate>
      <header className="talk-form-header">
        <div>
          <p className="talk-form-kicker">Studio brief</p>
          <h3>Contact us.</h3>
        </div>
      </header>

      <div className="talk-form-grid">
        <label className="talk-field">
          <span>Your name</span>
          <input
            {...register("name", { required: "Please enter your name", minLength: 2 })}
            autoComplete="name"
            placeholder="Name"
          />
          {errors.name && <small>{errors.name.message}</small>}
        </label>

        <label className="talk-field">
          <span>Email</span>
          <input
            {...register("email", {
              required: "Please enter an email",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
          {errors.email && <small>{errors.email.message}</small>}
        </label>
      </div>

      <label className="talk-field">
        <span>Phone</span>
        <div className="talk-phone">
          <CountryCodeSelect
            value={selectedCountryCode || "+91"}
            onChange={(code) => setValue("countryCode", code, { shouldDirty: true, shouldValidate: true })}
            disabled={isSubmitting || sendPhase !== "idle"}
          />
          <input type="hidden" {...register("countryCode")} />
          <input
            {...register("phoneNumber", {
              validate: (val) => {
                if (!val) return true;
                const fullNumber = `${selectedCountryCode || "+91"}${val}`;
                return isValidPhoneNumber(fullNumber) || "Please enter a valid phone number";
              },
            })}
            type="tel"
            autoComplete="tel"
            placeholder=""
          />
        </div>
        {errors.phoneNumber && <small>{errors.phoneNumber.message}</small>}
      </label>

      <label className="talk-field">
        <span>Service</span>
        <select {...register("service")}>
          <option value="">Select a Service</option>
          {serviceOptions.map(([slug, title]) => (
            <option key={slug} value={slug}>
              {title}
            </option>
          ))}
        </select>
      </label>

      <label className="talk-field">
        <span>Project notes</span>
        <textarea
          {...register("details", {
            required: "Tell us a little about the project",
            minLength: 10,
          })}
          rows={4}
          placeholder="Vision, scope, references, milestones…"
        />
        {errors.details && <small>{errors.details.message}</small>}
      </label>

      <button
        className={`button send-button is-${sendPhase}`}
        disabled={isSubmitting || sendPhase !== "idle"}
        type="submit"
        aria-live="polite"
      >
        <span className="send-button-label">
          {sendPhase === "sending" ? "Sending…" : "Send"}
        </span>
        {sendPhase === "flying" && (
          <span className="send-button-plane" aria-hidden="true">
            ✈
          </span>
        )}
      </button>

      {state && (
        <p
          className={`form-state ${state.startsWith("Brief") || state.startsWith("Thank") ? "success" : "error"}`}
          role="status"
        >
          {state}
        </p>
      )}
    </form>
  );
}
