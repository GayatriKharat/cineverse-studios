import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const recipient = "business@narayanistudios.com";
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character] ?? character));

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, details } = await request.json();

    if (![name, email, phone, details].every((value) => typeof value === "string" && value.trim())) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.error("Gmail credentials not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanService = typeof service === "string" && service.trim() ? service.trim() : "General";
    const cleanDetails = details.trim();
    const emailSubject = `Narayani Studios enquiry — ${cleanService}`;

    await transporter.sendMail({
      from: gmailUser,
      to: recipient,
      replyTo: cleanEmail,
      subject: emailSubject,
      html: `
        <h2>${emailSubject}</h2>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(cleanPhone)}</p>
        <p><strong>Service:</strong> ${escapeHtml(cleanService)}</p>
        <h3>Project Details:</h3>
        <p>${escapeHtml(cleanDetails).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Your enquiry has been sent successfully. We will get back to you soon!" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
