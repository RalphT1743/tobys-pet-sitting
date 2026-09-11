import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="legal-page">

      <section className="legal-hero">
        <div className="legal-hero-inner">
          <div>
            <p className="legal-kicker">TOBY&apos;S PET SITTING</p>

            <h1>
              Privacy
              <br />
              Policy
            </h1>
          </div>

          <div className="legal-hero-copy">
            <p>
              We respect your privacy and want you to understand how
              information may be collected and used when you interact with
              Toby&apos;s Pet Sitting.
            </p>

            <Link href="/" className="legal-back">
              ← Back home
            </Link>
          </div>
        </div>
      </section>

      <section className="legal-meta">
        <div className="legal-meta-inner">
          <span>PRIVACY POLICY</span>
          <span>LAST UPDATED SEPTEMBER 11, 2026</span>
        </div>
      </section>

      <section className="legal-content">
        <article className="legal-document">

          <section>
            <h2>1. Overview</h2>

            <p>
              This Privacy Policy explains how Toby&apos;s LLC, doing business
              as Toby&apos;s Pet Sitting (&quot;Toby&apos;s Pet Sitting,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), may collect,
              use, and share information when you visit our website, contact us,
              schedule a meet and greet, create a client account, or otherwise
              interact with our services.
            </p>

            <p>
              By using this website, you acknowledge the practices described in
              this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>2. Information You Provide</h2>

            <p>
              Depending on how you interact with us, you may provide information
              such as your name, email address, telephone number, appointment
              information, pet information, emergency contact information,
              veterinary information, service requests, and other details
              necessary to provide pet care services.
            </p>

            <p>
              Information used for bookings, client profiles, pet profiles,
              payments, vaccination records, emergency contacts, and related
              pet-care administration may be collected through third-party
              services such as Time To Pet.
            </p>
          </section>

          <section>
            <h2>3. Scheduling Information</h2>

            <p>
              Meet-and-greet appointments may be scheduled using Calendly.
              Information submitted through Calendly is processed according to
              Calendly&apos;s own terms and privacy practices in addition to any
              information we receive for scheduling purposes.
            </p>
          </section>

          <section>
            <h2>4. Information Collected Automatically</h2>

            <p>
              When you visit the website, certain technical information may be
              collected automatically by our hosting, security, or infrastructure
              providers. This can include information such as IP address, browser
              type, device type, operating system, pages visited, referral source,
              and basic request or diagnostic information.
            </p>

            <p>
              This information may be used to operate the website, maintain
              security, diagnose technical issues, and understand general site
              performance.
            </p>
          </section>

          <section>
            <h2>5. How We Use Information</h2>

            <p>We may use information to:</p>

            <ul>
              <li>respond to inquiries and communicate with clients;</li>
              <li>schedule meet-and-greet appointments;</li>
              <li>coordinate and provide pet-sitting services;</li>
              <li>maintain client and pet records;</li>
              <li>process or support service-related transactions;</li>
              <li>operate, maintain, and improve our website;</li>
              <li>protect the security and integrity of our services; and</li>
              <li>comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2>6. Third-Party Services</h2>

            <p>
              We use third-party technology providers to operate portions of our
              website and business. These providers may include:
            </p>

            <ul>
              <li>Time To Pet for client accounts and pet-care management;</li>
              <li>Calendly for appointment scheduling;</li>
              <li>Vercel for website hosting and delivery;</li>
              <li>Sanity for website content management; and</li>
              <li>Cloudflare for domain, network, or security infrastructure.</li>
            </ul>

            <p>
              These third parties may process information according to their own
              privacy policies. We encourage you to review the policies of any
              third-party service you use.
            </p>
          </section>

          <section>
            <h2>7. How Information May Be Shared</h2>

            <p>
              We do not sell your personal information.
            </p>

            <p>
              Information may be shared with service providers that help us
              operate our business, when reasonably necessary to provide
              requested services, to comply with applicable law, or to protect
              the rights, safety, and security of Toby&apos;s Pet Sitting, our
              clients, pets in our care, or others.
            </p>
          </section>

          <section>
            <h2>8. Data Retention</h2>

            <p>
              We may retain information for as long as reasonably necessary to
              provide services, maintain appropriate business records, resolve
              disputes, comply with legal obligations, and protect legitimate
              business interests.
            </p>

            <p>
              Retention periods may vary depending on the type of information
              and the systems in which it is stored.
            </p>
          </section>

          <section>
            <h2>9. Security</h2>

            <p>
              We use reasonable administrative and technical measures intended
              to protect information from unauthorized access, misuse, loss, or
              disclosure.
            </p>

            <p>
              However, no website, network, transmission method, or electronic
              storage system can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2>10. External Links</h2>

            <p>
              Our website may contain links to third-party websites and
              platforms. We are not responsible for the privacy, security, or
              content practices of those third parties.
            </p>
          </section>

          <section>
            <h2>11. Children&apos;s Privacy</h2>

            <p>
              This website is not directed toward children under the age of 13,
              and we do not knowingly collect personal information from children
              through this website.
            </p>
          </section>

          <section>
            <h2>12. Your Privacy Choices</h2>

            <p>
              You may contact us to request access to, correction of, or deletion
              of personal information we maintain about you, subject to
              applicable law and legitimate recordkeeping requirements.
            </p>

            <p>
              California residents may also have additional privacy rights under
              applicable California law.
            </p>
          </section>

          <section>
            <h2>13. Changes to This Policy</h2>

            <p>
              We may update this Privacy Policy from time to time. When changes
              are made, the updated version will be posted on this page with a
              revised &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2>14. Contact Us</h2>

            <p>
              If you have questions about this Privacy Policy or how your
              information is handled, please contact Toby&apos;s Pet Sitting
              using the contact information provided on our website.
            </p>
          </section>

        </article>
      </section>

    </main>
  );
}