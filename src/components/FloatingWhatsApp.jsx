
import { MessageCircle } from "lucide-react";

function FloatingWhatsApp() {
  const phoneNumbers = [
    {
      number: "919361406259",
      label: "WhatsApp 1",
    },
    {
      number: "919944513464",
      label: "WhatsApp 2",
    },
  ];

  const message =
    "Hello Nila Arts! I visited your website and would like to enquire about your artwork and services.";

  return (
    <div className="floating-whatsapp-wrapper">
      <div className="whatsapp-options">
        {phoneNumbers.map((contact) => (
          <a
            key={contact.number}
            href={`https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            {contact.label}
          </a>
        ))}
      </div>

      <button
        className="floating-whatsapp"
        aria-label="Choose a WhatsApp number"
        onClick={(event) => {
          event.currentTarget.parentElement.classList.toggle("active");
        }}
      >
        <MessageCircle size={25} />
        <span>Let's Talk</span>
      </button>
    </div>
  );
}

export default FloatingWhatsApp;
