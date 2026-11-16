
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import krishnaArtwork from "../assets/images/featured/krishna-featured.png";

function FeaturedArtwork() {
  const numbers = ["919361406259", "919944513464"];

  const message =
    "Hello Nila Arts! I saw your featured Krishna artwork. I would like to know more about your creations.";

  return (
    <section className="featured-artwork-section">
      <div className="featured-artwork-layout">

        <motion.div
          className="featured-artwork-image"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="gold-frame">
            <img
              src={krishnaArtwork}
              alt="Krishna portrait artwork created by Nila Arts"
            />
          </div>
          <span className="featured-stamp">SPECIAL CREATION</span>
        </motion.div>

        <motion.div
          className="featured-artwork-text"
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="gallery-label">
            A LITTLE PIECE OF ART
          </span>

          <h2>
            Art that tells
            <span> a beautiful story.</span>
          </h2>

          <p>
            A special Krishna-inspired portrait, created with
            imagination, colour and attention to detail.
            Discover the creativity behind Nila Arts.
          </p>

          <div className="featured-contact">
            {numbers.map((number, index) => (
              <a
                key={number}
                href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-whatsapp-link"
              >
                <MessageCircle size={17} />
                Enquire on WhatsApp {index + 1}
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default FeaturedArtwork;
