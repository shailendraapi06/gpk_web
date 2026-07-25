import { useState } from "react";
import { ContactForm } from "../../components/contact";
import { Container } from "../../components/layout/Container";
import {
  contactFormContent,
  contactFormFields,
  contactPageContent
} from "../../data/contact";
import { Section } from "../../layouts/Section";
import { apiRequest } from "../../services/api/client";

const initialValues = contactFormFields.reduce((accumulator, field) => {
  accumulator[field.name] = "";
  return accumulator;
}, {});

function validateField(name, value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "This field is required.";
  }

  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return "Enter a valid email address.";
  }

  if (name === "phone" && !/^[0-9+\-\s()]{10,}$/.test(trimmedValue)) {
    return "Enter a valid phone number.";
  }

  return "";
}

export function ContactPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, text: "", type: "success" });

  function handleChange(name, value) {
    setValues((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value)
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = contactFormFields.reduce((accumulator, field) => {
      accumulator[field.name] = validateField(field.name, values[field.name]);
      return accumulator;
    }, {});

    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);

    if (hasError) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(values)
      });

      setFeedback({
        show: true,
        text: res.message || "Thank you! Your message has been sent successfully.",
        type: "success"
      });
      setValues(initialValues);
      setErrors({});
    } catch (err) {
      setFeedback({
        show: true,
        text: err.message || "Something went wrong. Please try again later.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section className="contact-page" aria-labelledby="contact-page-title">
      <Container>
        <div className="contact-page__header">
          <p className="contact-page__eyebrow">{contactPageContent.eyebrow}</p>
          <h1 id="contact-page-title" className="contact-page__title">
            {contactPageContent.title}
          </h1>
          <p className="contact-page__intro">{contactPageContent.introduction}</p>
        </div>

        {feedback.show && (
          <div 
            style={{
              padding: "1rem 1.25rem",
              marginBottom: "1.5rem",
              borderRadius: "0.5rem",
              backgroundColor: feedback.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              border: `1px solid ${feedback.type === "success" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
              color: feedback.type === "success" ? "#065f46" : "#991b1b",
              textAlign: "center",
              fontWeight: 500
            }}
          >
            {feedback.text}
          </div>
        )}

        <ContactForm
          fields={contactFormFields}
          values={values}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={isSubmitting ? "Sending..." : contactFormContent.submitLabel}
        />
      </Container>
    </Section>
  );
}

