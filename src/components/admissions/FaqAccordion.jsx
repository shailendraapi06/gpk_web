import { useState } from "react";

function FaqItem({ item, isOpen, onToggle }) {
  const panelId = `${item.id}-panel`;

  return (
    <div className="admissions-faq__item surface">
      <button
        type="button"
        className="admissions-faq__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{item.question}</span>
        <span className="admissions-faq__indicator" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div id={panelId} className={`admissions-faq__panel${isOpen ? " is-open" : ""}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export function FaqAccordion({ items }) {
  const [openItem, setOpenItem] = useState(items[0]?.id ?? null);

  return (
    <div className="admissions-faq">
      {items.map((item) => (
        <FaqItem
          key={item.id}
          item={item}
          isOpen={openItem === item.id}
          onToggle={() => setOpenItem((current) => (current === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}
