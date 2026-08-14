"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/site-data";

type FormValues = { name: string; email: string; service: string; details: string };

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@narayanistudios.com";

export function ContactForm() {
  const search = useSearchParams();
  const hinted = search.get("service");
  const matched = services.find((s) => s.slug === hinted)?.title ?? "";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { service: matched },
  });
  const [state, setState] = useState("");

  const submit = async (values: FormValues) => {
    const subject = encodeURIComponent(`Narayani Studios enquiry — ${values.service || "General"}`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\nService: ${values.service}\n\nProject details:\n${values.details}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setState("Your email app is opening with the enquiry prepared.");
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
      <label>Service needed
        <select {...register("service")}>
          <option value="">Select a service</option>
          {services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
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
