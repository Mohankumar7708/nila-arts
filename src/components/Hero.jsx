
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import artworks from "../data/artworks";

function Hero() {
  const images = artworks.slice(0, 3);

  return (
    <section className="hero-new" id="home">
      <div className="hero-main">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="hero-tag">
            <span /> AN INDEPENDENT CREATIVE ART STUDIO
          </span>

          <h1>
            Creating
            <br />
            <span>beautiful</span>
            <br />
            things.
          </h1>

          <p>
            From detailed drawings to beautiful Mehndi designs,
            handmade crafts and creative projects.
            Discover the artistic world of Nila Arts.
          </p>

          <div className="hero-actions">
            <a href="#gallery" className="hero-primary">
              Explore Artwork <ArrowUpRight size={19} />
            </a>

            <a href="#services" className="hero-secondary">
              Discover Services
            </a>
          </div>
        </motion.div>

        <div className="hero-visual">
          {images.map((item, index) => (
            <motion.div
              key={item.id}
              className={`hero-photo photo-${index + 1}`}
              initial={{ opacity: 0, y: 50, rotate: index === 1 ? 0 : 5 }}
              animate={{ opacity: 1, y: 0, rotate: index === 1 ? 0 : 5 }}
              transition={{ duration: 0.9, delay: index * 0.2 }}
            >
              <img src={item.image} alt={`Nila Arts creation ${item.id}`} />
            </motion.div>
          ))}

          <div className="hero-sticker">MADE WITH CREATIVITY ✳</div>
        </div>
      </div>

      <div className="hero-footer">
        <span>DRAWINGS · PAINTINGS · MEHNDI · CRAFTS</span>
        <a href="#gallery">
          SCROLL TO EXPLORE <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}

export default Hero;
