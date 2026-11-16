
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import artworks from "../data/artworks";

const phoneNumbers = [
  { number: "919361406259", label: "WhatsApp 1" },
  { number: "919944513464", label: "WhatsApp 2" },
];

const services = [
  {
    number: "01",
    title: "Custom Drawings",
    category: "Drawing",
    description:
      "Turn your favourite photos and ideas into beautiful handmade drawings.",
  },
  {
    number: "02",
    title: "Plate Decoration",
    category: "Plate Decoration",
    description:
      "Decorative plates and unique handmade designs for special occasions.",
  },
  {
    number: "03",
    title: "Children's Art Classes",
    category: "Art Class",
    description:
      "Fun and creative drawing classes where children can discover their artistic skills.",
  },
  {
    number: "04",
    title: "Mehndi & Cone Sales",
    category: "Mehndi & Cone Sales",
    description:
      "Beautiful Mehndi designs and Mehndi cones for your celebrations.",
  },
  {
    number: "05",
    title: "Projects & Craft Work",
    category: "Project & Craft Work",
    description:
      "Creative handmade crafts, school projects and customised project work.",
  },
];

function Services() {
  return (
    <section className="services-section" id="services">
      <div className="services-heading">
        <span className="gallery-label">WHAT WE CREATE</span>
        <h2>
          Art for every <span>imagination.</span>
        </h2>
        <p>
          From personalised drawings to creative classes,
          explore everything Nila Arts has to offer.
        </p>
      </div>

      <div className="services-grid-new">
        {services.map((service, index) => {
          const artwork = artworks.find(
            (item) => item.category === service.category
          );

          return (
            <motion.article
              key={service.number}
              className="service-card-new"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="service-card-image">
                {artwork?.image ? (
                  <img
                    src={artwork.image}
                    alt={service.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="service-image-placeholder">
                    <span>NILA ARTS</span>
                  </div>
                )}

                <span className="service-number">
                  {service.number}
                </span>
              </div>

              <div className="service-card-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <div className="service-enquiry">
                  {phoneNumbers.map((contact) => {
                    const message = `Hello Nila Arts! I am interested in ${service.title}. Please share the details.`;

                    return (
                      <a
                        key={contact.number}
                        href={`https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Enquire about ${service.title} using ${contact.label}`}
                      >
                        <MessageCircle size={15} />
                        {contact.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <ArrowUpRight
                className="service-card-arrow"
                size={22}
              />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
