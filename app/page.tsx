"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/aschmidtriquelme001/30min";
const CLIENT_PORTAL_URL =
  "https://www.timetopet.com/portal/tobys-pet-sitting";

const services = [
  {
    name: "Drop-In Sitting",
    description:
      "A convenient visit to make sure your pet gets the attention, care, and company they need.",
    price: "$10",
    note: "per hour",
  },
  {
    name: "Overnight Pet Sitting",
    description:
      "Pet sitting takes place in our home, with walks, feeding, playtime, and plenty of love and attention included.",
    price: "$45–$50",
    note: "small dogs $45/day · large dogs $50/day",
  },
  {
    name: "Dog Baths",
    description:
      "A refreshing bath to keep your pup clean, comfortable, and happy.",
    price: "$20–$35",
    note: "based on your dog's size",
  },
  {
    name: "Airport Transportation",
    description:
      "Need help transporting your pet to or from the airport? Reach out for availability and pricing.",
    price: "Contact Us",
    note: "availability varies",
  },
];

type DogPhoto = {
  _id: string;
  name: string;
  caption?: string;
  featured?: boolean;
  displayOrder?: number;
  imageUrl: string;
};

type Testimonial = {
  _id: string;
  customerName: string;
  petName?: string;
  quote: string;
  rating?: number;
  source?: string;
  featured?: boolean;
  displayOrder?: number;
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dogPhotos, setDogPhotos] = useState<DogPhoto[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) =>
        element.classList.add("visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07 }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const items = await client.fetch<Testimonial[]>(`
  *[_type == "testimonial"] | order(displayOrder asc) {
    _id,
    customerName,
    petName,
    quote,
    rating,
    source,
    featured,
    displayOrder
  }
`);

      setTestimonials(items);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
    }
  };

  fetchTestimonials();
}, []);
  useEffect(() => {
  const fetchDogPhotos = async () => {
    try {
      const photos = await client.fetch<DogPhoto[]>(`
        *[_type == "dogPhoto"] | order(displayOrder asc) {
          _id,
          name,
          caption,
          featured,
          displayOrder,
          "imageUrl": image.asset->url
        }
      `);

      setDogPhotos(photos);
    } catch (error) {
      console.error("Failed to load dog photos:", error);
    }
  };

  fetchDogPhotos();
}, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`site-nav ${scrolled ? "scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <Link className="nav-brand" href="/">
          Toby&apos;s Pet Sitting
        </Link>

        <div className="mobile-nav-actions">
          <a
            className="mobile-login"
            href={CLIENT_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Client Login
          </a>
          <button
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <svg viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#cta">Contact</a>
          </li>
          <li>
            <a
              href={CLIENT_PORTAL_URL}
              className="nav-login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Client Login
            </a>
          </li>
          <li>
            <a
              href={CALENDLY_URL}
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meet &amp; Greet
            </a>
          </li>
        </ul>
      </nav>

      <nav className="mobile-section-nav" aria-label="Page sections">
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#gallery" onClick={closeMenu}>Photos</a>
        <a href="#testimonials" onClick={closeMenu}>Reviews</a>
        <a href="#cta" onClick={closeMenu}>Contact</a>
      </nav>

      <div id="mobile-menu" className={`nav-drawer ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="#gallery" onClick={closeMenu}>
              Gallery
            </a>
          </li>
          <li>
            <a href="#cta" onClick={closeMenu}>
              Contact
            </a>
          </li>
          <li>
            <a href="#how-it-works" onClick={closeMenu}>
              How to Become a Customer
            </a>
          </li>
          <li>
            <a
              href={CLIENT_PORTAL_URL}
              className="nav-login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Client Login
            </a>
          </li>
          <li>
            <a
              href={CALENDLY_URL}
              className="nav-cta"
              onClick={closeMenu}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Meet &amp; Greet
            </a>
          </li>
        </ul>
      </div>

      <main>
        <section className="hero">
          <video autoPlay muted loop playsInline>
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="hero-overlay" />

          <div className="hero-copy">
            <h1>
              Personal pet care
              <br />
              <em>in South Bay.</em>
            </h1>

            <p className="hero-tagline">
              Toby&apos;s Pet Sitting: run by Alan &amp; Julio, for the
              families in our community.
            </p>

            <a
              href={CALENDLY_URL}
              className="hero-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Meet &amp; Greet
            </a>
            <a className="hero-secondary" href="#how-it-works">
              How to become a customer
            </a>
          </div>
        </section>

        <section id="how-it-works">
          <h2 className="sec-heading reveal">How to become a customer</h2>
          <p className="how-intro reveal">
            Start with a meet and greet. After we&apos;ve talked, we&apos;ll send
            your Time To Pet login so you can set up your dog&apos;s care.
          </p>
          <div className="how-steps reveal">
            <div>
              <span>01</span>
              <h3>Schedule a meet and greet</h3>
              <p>Pick a time to talk with Julio and Alan.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Meet your way</h3>
              <p>We can talk on Zoom or another video call, by phone, or in person. Tell us about your dog and the care they need.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Get your client login</h3>
              <p>After the meet and greet, we&apos;ll send your Time To Pet invitation. Use it to upload vaccination records and request the specific care your dog needs.</p>
            </div>
          </div>
          <a href={CALENDLY_URL} className="how-button" target="_blank" rel="noopener noreferrer">
            Schedule a Meet &amp; Greet
          </a>
        </section>

        <section id="services">
          <h2 className="sec-heading reveal">Services &amp; Pricing</h2>

          <table
            className="services-table reveal"
            aria-label="Services and pricing"
          >
            <thead>
              <tr>
                <th style={{ width: 72 }} />
                <th>Service</th>
                <th style={{ textAlign: "right" }}>Price</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr key={service.name}>
                  <td>
                    <div className="svc-photo">
                      <div className="svc-photo-ph">
                        <svg viewBox="0 0 24 24">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="svc-name">{service.name}</div>
                    <p className="svc-desc">{service.description}</p>
                  </td>

                  <td>
                    <div className="svc-price">{service.price}</div>
                    <div className="svc-price-note">{service.note}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="about">
          <div className="about-copy reveal">
            <h2>
              Meet Julio &amp; Alan
            </h2>

            <p>
              Hi, we&apos;re Julio and Alan. We&apos;ve been fostering and caring
              for dogs in the South Bay since 2023. We know it takes trust to
              leave your dog with someone new.
            </p>

            <p>
              When you book with Toby&apos;s, one of us will be looking after
              your dog. We want to learn their routine, what they love, and
              what helps them settle in.
            </p>

            <p>
              Let&apos;s meet before the first visit. You can tell us about your
              dog, ask us anything, and see if we&apos;re a good fit.
            </p>
          </div>

                  <div className="about-photo">
          <Image
            src="/julio-alan-meet-the-owners.jpeg"
            alt="Alan and Julio with dogs"
            fill
            sizes="(max-width: 960px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        </section>

        <div className="trust-bar">
          <div className="trust-item reveal">
            <div className="trust-num">40+</div>
            <div className="trust-label">
              Dogs fostered and cared for since 2023
            </div>
          </div>

          <div className="trust-item reveal">
            <div className="trust-num">25+</div>
            <div className="trust-label">Families served in the South Bay</div>
          </div>

          <div className="trust-item reveal">
            <div className="trust-num">1:1</div>
            <div className="trust-label">
              Personal care from Alan or Julio, every time
            </div>
          </div>
        </div>

        <section id="gallery">
          <div className="gallery-header reveal">
            <h2>The dogs we&apos;ve cared for</h2>
            <Link href="/photos">See all photos</Link>
          </div>

          <div className="gallery-grid reveal">
              {[0, 1, 2, 3, 4].map((index) => {
                const dog = dogPhotos[index];

                return (
                  <div className="gi" key={dog?._id ?? index}>
                    <div
                      className={`giph gp${index + 1}`}
                      style={
                        dog
                          ? {
                              backgroundImage: `url("${dog.imageUrl}")`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : undefined
                      }
                    >
                      {dog && (
                        <div className="giph-note">
                          <strong>{dog.name}</strong>
                          {dog.caption && <span>{dog.caption}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
        </section>

        <section id="testimonials">
  <h2 className="sec-heading reveal">What clients say</h2>

  <div className="testimonials-grid">
    {testimonials.length > 0 ? (
      testimonials.map((item) => (
        <article className="testimonial-card" key={item._id}>
          <div className="testimonial-top">
            <div className="testimonial-person">
              <div className="testimonial-avatar">
                {item.customerName?.charAt(0).toUpperCase() || "T"}
              </div>

              <div>
                <strong className="testimonial-name">
                  {item.customerName}
                </strong>

                {item.petName && (
                  <span className="testimonial-pet">
                    Pet: {item.petName}
                  </span>
                )}
              </div>
            </div>

            {item.rating && (
              <div
                className="testimonial-stars"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {"★".repeat(item.rating)}
                <span className="empty-stars">
                  {"★".repeat(5 - item.rating)}
                </span>
              </div>
            )}
          </div>

          <p className="testimonial-quote">
            {item.quote}
          </p>

          {item.source && (
            <div className="testimonial-source">
              {item.source.charAt(0).toUpperCase() + item.source.slice(1)}
            </div>
          )}
        </article>
      ))
    ) : (
      <p className="testimonials-empty">
        Client testimonials coming soon.
      </p>
    )}
  </div>
</section>

        <section id="cta">
          <h2 className="cta-heading reveal">
            Let&apos;s <em>meet first.</em>
          </h2>

          <div className="cta-right reveal">
            <p className="cta-body">
              Every new client starts with a complimentary meet and greet.
              We can talk by video, phone, or in person about your dog and
              the care they need before you book.
            </p>

            <a
              href={CALENDLY_URL}
              className="btn-cta-b"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Meet &amp; Greet
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-grid">
          <div>
            <p className="footer-name">Toby&apos;s Pet Sitting</p>

          <div className="footer-contact">
              <a href="tel:+14156089056">(415) 608-9056</a>
              <br />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aschmidtriquelme001@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                aschmidtriquelme001@gmail.com
              </a>
              <br />
              South Bay, CA
          </div>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <a href="#services">Drop-In Sitting</a>
            <a href="#services">Overnight Pet Sitting</a>
            <a href="#services">Dog Baths</a>
            <a href="#services">Airport Transportation</a>
          </div>

          <div className="footer-col">
            <h5>Get Started</h5>
            <a href="#how-it-works">How to Become a Customer</a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Meet &amp; Greet
            </a>

            <a
              href={CLIENT_PORTAL_URL}
              className="footer-portal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Client Login
            </a>
            <a href="#about">About Alan &amp; Julio</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 Toby&apos;s Pet Sitting. All rights reserved.
          </p>

          <nav className="footer-legal" aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
