"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

const CALENDLY_URL = "https://calendly.com/aschmidtriquelme001/30min";
const CLIENT_PORTAL_URL =
  "https://www.timetopet.com/portal/tobys-pet-sitting";

const services = [
  {
    name: "Drop-In Sitting",
    description:
      "A convenient visit to make sure your pet gets the attention, care, and company they need.",
    price: "$30",
    note: "per visit",
  },
  {
    name: "Overnight Pet Sitting",
    description:
      "Pet sitting takes place in our home, with walks, feeding, playtime, and plenty of love and attention included.",
    price: "$45–$55",
    note: "small dogs $45/day · large dogs $55/day",
  },
  {
    name: "Doggy Bath",
    description:
      "A refreshing bath to keep your pup clean, comfortable, and happy.",
    price: "$20",
    note: "per bath",
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dogPhotos, setDogPhotos] = useState<DogPhoto[]>([]);

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
        <a className="nav-brand" href="#">
          Toby&apos;s Pet Sitting
        </a>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <svg viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

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

      <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
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
              Toby&apos;s Pet Sitting — run by Alan &amp; Julio, for the
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
          </div>
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
              Meet Alan <em>&amp; Julio</em>
            </h2>

            <p>
              Toby&apos;s Pet Sitting is run by Alan and Julio — a couple
              serving families throughout the South Bay who have been fostering
              and caring for dogs in their community since 2023.
            </p>

            <p>
              This is a personal service, not a platform. When you book with
              Toby&apos;s, Alan or Julio is caring for your dog. No strangers.
              No handoffs.
            </p>

            <p>
              Every new client starts with a meet-and-greet — because that&apos;s
              the right way to begin.
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
            <div className="trust-num">20+</div>
            <div className="trust-label">
              Dogs fostered and cared for since 2023
            </div>
          </div>

          <div className="trust-item reveal">
            <div className="trust-num">4</div>
            <div className="trust-label">
              Services for families throughout the South Bay
            </div>
          </div>

          <div className="trust-item reveal">
            <div className="trust-num">1:1</div>
            <div className="trust-label">
              Every dog cared for personally — no strangers, no handoffs
            </div>
          </div>
        </div>

        <section id="gallery">
          <div className="gallery-header reveal">
            <h2>The dogs we&apos;ve cared for</h2>
            <a href="#">See all photos</a>
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
            <div className="testimonial reveal">
              <div className="test-ph">
                Client testimonial coming soon.
              </div>
            </div>

            <div className="testimonial reveal">
              <div className="test-ph">
                Client testimonial coming soon.
              </div>
            </div>
          </div>
        </section>

        <section id="cta">
          <h2 className="cta-heading reveal">
            Let&apos;s <em>meet first.</em>
          </h2>

          <div className="cta-right reveal">
            <p className="cta-body">
              Every new client starts with a complimentary meet-and-greet — a
              short visit so you and your dog can get comfortable with us before
              anything is booked. No commitment. No pressure.
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
            <a href="#services">Doggy Bath</a>
            <a href="#services">Airport Transportation</a>
          </div>

          <div className="footer-col">
            <h5>Get Started</h5>
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
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </nav>
        </div>
      </footer>
    </>
  );
}