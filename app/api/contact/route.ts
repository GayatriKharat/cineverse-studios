import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, service, details } = await request.json();

    // Validate required fields
    if (!name || !email || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Gmail SMTP configuration
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.error("Gmail credentials not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    const emailSubject = `Narayani Studios Enquiry — ${service || "General"}`;
    const emailBody = `
New Enquiry from Website

Name: ${name}
Email: ${email}
Service: ${service || "General"}

Project Details:
${details}

---
This is an automated message from the Narayani Studios website.
    `;

    // Send email to business inbox
    await transporter.sendMail({
      from: gmailUser,
      to: "business@narayanistudios.com",
      replyTo: email,
      subject: emailSubject,
      html: `
        <h2>${emailSubject}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || "General"}</p>
        <h3>Project Details:</h3>
        <p>${details.replace(/\n/g, "<br>")}</p>
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
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
