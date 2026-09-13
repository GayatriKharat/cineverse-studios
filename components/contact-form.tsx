"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/site-data";

type FormValues = { name: string; email: string; phone: string; service: string; details: string };
type SendPhase = "idle" | "sending" | "flying";

export function ContactForm() {
  const search = useSearchParams();
  const hinted = search.get("service") ?? "";
  const subservice = search.get("subservice") ?? "";
  const matched = services.some((s) => s.slug === hinted) ? hinted : "";
  const initialDetails = subservice ? `Enquiring about ${subservice}:\n` : "";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { service: matched, details: initialDetails },
  });
  const [state, setState] = useState("");
  const [sendPhase, setSendPhase] = useState<SendPhase>("idle");

  const submit = async (values: FormValues) => {
    setState("");
    setSendPhase("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to send your enquiry.");
      setSendPhase("flying");
      window.setTimeout(() => setSendPhase("idle"), 1250);
      setState("Thank you! Your enquiry has been sent. We'll be in touch soon.");
    } catch (error) {
      setSendPhase("idle");
      setState(error instanceof Error ? error.message : "Unable to send your enquiry. Please try again.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
      <label>Your name
        <input {...register("name", { required: "Please enter your name", minLength: 2 })} autoComplete="name" placeholder="Your name" />
        {errors.name && <small>{errors.name.message}</small>}
      </label>
      <label>Email address
        <input {...register("email", { required: "Please enter an email", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })} type="email" autoComplete="email" placeholder="you@company.com" />
        {errors.email && <small>{errors.email.message}</small>}
      </label>
      <label>Contact number (optional)
        <input {...register("phone")} type="tel" autoComplete="tel" placeholder="+91 74474 74431" />
      </label>
      <label>Service needed
        <select {...register("service")}>
          <option value="">Select a service</option>
          <option value="strategy-consulting">Strategy & Consulting</option>
          <option value="brand-development-pr">Brand Development & PR</option>
          <option value="content-production">Content & Production</option>
          <option value="social-media-growth">Social Media & Audience Growth</option>
          <option value="advertising-campaigns">Advertising & Campaigns</option>
          <option value="events-experiences">Events & Experiences</option>
          <option value="full-production">Full production</option>
        </select>
      </label>
      <label>Tell us about your project
        <textarea {...register("details", { required: "Tell us a little about the project", minLength: 10 })} rows={5} placeholder="Tell us about your project, scope, timeline, references" />
        {errors.details && <small>{errors.details.message}</small>}
      </label>
      <button className={`button send-button is-${sendPhase}`} disabled={isSubmitting || sendPhase !== "idle"} type="submit" aria-live="polite">
        <span className="send-button-label">{sendPhase === "sending" ? "Sending…" : "Send Message ↗"}</span>
        {sendPhase === "flying" && <span className="send-button-plane" aria-hidden="true">✈</span>}
      </button>
      {state && <p className="form-state success" role="status">{state}</p>}
    </form>
  );
}
