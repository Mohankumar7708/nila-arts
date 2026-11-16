
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ArtworkGallery from "./components/ArtworkGallery";
import Services from "./components/Services";
import FeaturedArtwork from "./components/FeaturedArtwork";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Preloader from "./components/Preloader";

import {
  Palette,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Phone,
} from "lucide-react";

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  const phoneNumbers = [
    "919361406259",
    "919944513464",
  ];

  const contactMessage =
    "Hello Nila Arts! I would like to enquire about your services.";

  const address =
    "53, Poosari Muthiya Koundan Street, Near Velapper Kovil, Cumbum, Theni District, Tamil Nadu - 625516";

  const mapLink =
    "https://www.google.com/maps?q=9.736567707626973,77.28136768086998";

  const mapEmbedLink =
    "https://www.google.com/maps?q=9.736567707626973,77.28136768086998&output=embed";

  useEffect(() => {
    const finishIntro = () => {
      setIntroFinished(true);
    };

    window.addEventListener("nila-intro-finished", finishIntro);

    return () => {
      window.removeEventListener("nila-intro-finished", finishIntro);
    };
  }, []);

  return (
    <>
      {!introFinished && <Preloader />}

      <div
        className={
          introFinished ? "website-visible" : "website-hidden"
        }
      >
        <Navbar />

        <main>
          <Hero />

          <FeaturedArtwork />

          <section className="intro-section" id="about">
            <span className="gallery-label">
              WELCOME TO NILA ARTS
            </span>

            <h2>
              Creativity has no limits.
              <span> Neither does imagination.</span>
            </h2>

            <p>
              Nila Arts brings imagination to life through handmade
              drawings, paintings, Mehndi designs and creative crafts.
              Each creation is made with care, detail and love.
            </p>
          </section>

          <Services />

          <ArtworkGallery />

          <section className="classes-section" id="classes">
            <span className="gallery-label">
              LEARN · EXPLORE · CREATE
            </span>

            <h2>Little hands. Big imagination.</h2>

            <p>
              Drawing and creative art classes for children.
              Let them explore their imagination and develop
              their artistic skills.
            </p>

            <a
              href={`https://wa.me/${phoneNumbers[0]}?text=${encodeURIComponent(
                "Hello Nila Arts! I would like to enquire about children's art classes."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-primary"
            >
              Enquire About Classes
              <ArrowUpRight size={18} />
            </a>
          </section>

          <section className="contact-section" id="contact">
            <span className="gallery-label">
              LET'S CREATE SOMETHING
            </span>

            <h2>
              Have an idea?
              <br />
              <span>Let's make it real.</span>
            </h2>

            <p>
              Looking for custom artwork, Mehndi designs,
              craft projects or children's classes?
              Get in touch with Nila Arts.
            </p>

            <div className="contact-whatsapp-links">
              {phoneNumbers.map((number, index) => (
                <a
                  key={number}
                  href={`https://wa.me/${number}?text=${encodeURIComponent(
                    contactMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-primary"
                >
                  <MessageCircle size={18} />
                  Contact on WhatsApp {index + 1}
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </div>

            <div className="nila-contact-details">
              <h3>Visit Nila Arts</h3>

              <p>
                <strong>Anusiya S</strong>
              </p>

              <div className="nila-address">
                <MapPin size={22} />
                <p>{address}</p>
              </div>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-primary"
              >
                Get Directions
                <ArrowUpRight size={18} />
              </a>

              <div className="nila-map-container">
                <iframe
                  title="Nila Arts Location"
                  src={mapEmbedLink}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="nila-phone-details">
                {phoneNumbers.map((number, index) => (
                  <a
                    key={number}
                    href={`tel:+${number}`}
                  >
                    <Phone size={17} />
                    {index === 0 ? "9361406259" : "9944513464"}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a href="#home" className="brand-logo footer-brand-logo">
            <img
              src="/nila-arts-logo.png"
              alt="Nila Arts"
            />
          </a>

          <p>Made with creativity and love.</p>

          <p className="footer-address">
            53, Poosari Muthiya Koundan Street, Cumbum - 625516
          </p>

          <a href="#home" aria-label="Back to top">
            <Palette size={20} />
          </a>

          <span>
            © {new Date().getFullYear()} Nila Arts
          </span>
        </footer>

        <FloatingWhatsApp />
      </div>
    </>
  );
}

export default App;
