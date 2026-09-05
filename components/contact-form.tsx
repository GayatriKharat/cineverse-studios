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
  const matched = services.some((s) => s.slug === hinted) ? hinted : "";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { service: matched },
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
        <input {...register("name", { required: "Please enter your name", minLength: 2 })} autoComplete="name" />
        {errors.name && <small>{errors.name.message}</small>}
      </label>
      <label>Email address
        <input {...register("email", { required: "Please enter an email", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })} type="email" autoComplete="email" />
        {errors.email && <small>{errors.email.message}</small>}
      </label>
      <label>Contact number
        <input {...register("phone", { required: "Please enter your contact number" })} type="tel" autoComplete="tel" placeholder="+91 XXXXX XXXXX" />
        {errors.phone && <small>{errors.phone.message}</small>}
      </label>
      <label>Service needed
        <select {...register("service")}>
          <option value="">Select a service</option>
          {services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
        </select>
      </label>
      <label>Tell us about your project
        <textarea {...register("details", { required: "Tell us a little about the project", minLength: 15 })} rows={5} />
        {errors.details && <small>{errors.details.message}</small>}
      </label>
      <button className={`button send-button is-${sendPhase}`} disabled={isSubmitting || sendPhase !== "idle"} type="submit" aria-live="polite">
        <span className="send-button-label">{sendPhase === "sending" ? "Sending…" : "Send message"}</span>
        {sendPhase === "flying" && <span className="send-button-plane" aria-hidden="true">✈</span>}
      </button>
      {state && <p className="form-state success" role="status">{state}</p>}
    </form>
  );
}
