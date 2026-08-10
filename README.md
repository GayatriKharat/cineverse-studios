# Narayani Studios LLP

Integrated branding, media, entertainment and technology site built with Next.js 15, GSAP/ScrollTrigger, Framer Motion, Lenis, React Three Fiber, and a Resend-backed enquiry form.

## Run locally

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CONTACT_EMAIL` to the email address that should receive enquiries.
2. Copy `cineverse-journey.mp4` into `public/` to activate the scroll-scrub hero (the supplied still image is used until then).
3. Run `npm.cmd install`, then `npm.cmd run dev`.
4. Open `http://localhost:3000`.

## Deploy on GitHub Pages

1. Create an empty GitHub repository and push this project to its `main` branch.
2. In GitHub, open **Settings → Pages**, set **Source** to **GitHub Actions**.
3. In **Settings → Secrets and variables → Actions → Variables**, create `CONTACT_EMAIL` with the recipient email address.
4. Push to `main`. The included workflow publishes the `out/` build automatically.

GitHub Pages is static hosting: the enquiry form opens the visitor’s email app with their details prepared. For automatic sending, attachments and confirmation emails, deploy the same project to Vercel and add a form provider or email API.
