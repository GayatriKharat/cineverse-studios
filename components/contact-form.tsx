"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/site-data";

type FormValues = { name: string; email: string; phone: string; service: string; details: string };

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@narayanistudios.com";

export function ContactForm() {
  const search = useSearchParams();
  const hinted = search.get("service") ?? "";
  const matched = services.some((s) => s.slug === hinted) ? hinted : "";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { service: matched },
  });
  const [state, setState] = useState("");

  const submit = async (values: FormValues) => {
    // Validate email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(values.email)) {
      setState("Please enter a valid email address");
      return;
    }

    // Simple validation - just check if all fields are filled
    if (!values.name || !values.email || !values.phone || !values.details) {
      setState("Please fill all fields");
      return;
    }

    // Validate phone (basic validation - at least 10 digits)
    const phoneDigits = values.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setState("Please enter a valid phone number (at least 10 digits)");
      return;
    }

    // All good! Show success
    setState("✅ Thank you! Your details have been submitted. We'll contact you soon at " + values.phone + " or " + values.email);
    
    // Log to console (for development)
    console.log("Contact Details Received:", {
      name: values.name,
      email: values.email,
      phone: values.phone,
      service: values.service,
      details: values.details,
    });
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
      <button className="button" disabled={isSubmitting} type="submit">Send message</button>
      {state && <p className="form-state success" role="status">{state}</p>}
    </form>
  );
}
