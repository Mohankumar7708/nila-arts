
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import artworks from "../data/artworks";

const categories = [
  "All",
  "Drawing",
  "Plate Decoration",
  "Art Class",
  "Mehndi & Cone Sales",
  "Project & Craft Work",
];

function ArtworkGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredArtworks =
    activeCategory === "All"
      ? artworks
      : artworks.filter(
          (item) => item.category === activeCategory
        );

  const displayedArtworks = filteredArtworks.slice(0, visibleCount);

  const selectedArtwork =
    selectedIndex !== null
      ? filteredArtworks[selectedIndex]
      : null;

  const closePreview = () => setSelectedIndex(null);

  const showPrevious = () => {
    setSelectedIndex((index) =>
      index > 0 ? index - 1 : index
    );
  };

  const showNext = () => {
    setSelectedIndex((index) =>
      index < filteredArtworks.length - 1 ? index + 1 : index
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, filteredArtworks.length]);

  const changeCategory = (category) => {
    setActiveCategory(category);
    setVisibleCount(12);
    closePreview();
  };

  return (
    <section className="artwork-section" id="gallery">
      <div className="gallery-header">
        <div>
          <span className="gallery-label">
            OUR CREATIVE COLLECTION
          </span>
          <h2>
            Our Work<span>.</span>
          </h2>
        </div>

        <p>
          Every creation has its own story.
          Explore handmade artwork, creative projects
          and beautiful designs by Nila Arts.
        </p>
      </div>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category ? "active" : ""
            }
            onClick={() => changeCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="artwork-grid">
        {displayedArtworks.map((artwork, index) => (
          <motion.article
            key={artwork.id}
            className="artwork-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedIndex(index)}
            role="button"
            tabIndex={0}
            aria-label={`View ${artwork.title}`}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedIndex(index);
              }
            }}
          >
            <div className="artwork-image">
              <img
                src={artwork.image}
                alt={`${artwork.category} by Nila Arts`}
                loading="lazy"
              />

              <div className="artwork-overlay">
                <span>VIEW CREATION</span>
                <ArrowUpRight size={22} />
              </div>
            </div>

            <div className="artwork-info">
              <span>{artwork.category}</span>
              <h3>{artwork.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <p className="empty-gallery">
          Artwork will be added to this collection soon.
        </p>
      )}

      {visibleCount < filteredArtworks.length && (
        <button
          className="load-more-btn"
          onClick={() => setVisibleCount((count) => count + 12)}
        >
          Load More Artwork <ArrowUpRight size={18} />
        </button>
      )}

      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="artwork-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
          >
            <button
              className="lightbox-close"
              onClick={closePreview}
              aria-label="Close preview"
            >
              <X size={26} />
            </button>

            <button
              className="lightbox-arrow lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              disabled={selectedIndex === 0}
              aria-label="Previous artwork"
            >
              <ChevronLeft size={30} />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedArtwork.image}
                alt={`${selectedArtwork.category} by Nila Arts`}
              />

              <div className="lightbox-caption">
                <div>
                  <span>{selectedArtwork.category}</span>
                  <h3>{selectedArtwork.title}</h3>
                </div>

                <p>
                  {selectedIndex + 1} / {filteredArtworks.length}
                </p>
              </div>
            </motion.div>

            <button
              className="lightbox-arrow lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              disabled={
                selectedIndex === filteredArtworks.length - 1
              }
              aria-label="Next artwork"
            >
              <ChevronRight size={30} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ArtworkGallery;
