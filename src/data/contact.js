export const contactPageContent = {
  eyebrow: "Contact Us",
  title: "Get in Touch with Government Polytechnic Kanpur",
  introduction:
    "Use the form below to share your enquiry with the institute. The structure is kept ready for future backend integration while maintaining a clean and professional experience."
};

export const contactFormFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    autoComplete: "name",
    required: true
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email address",
    autoComplete: "email",
    required: true
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
    autoComplete: "tel",
    required: true
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Enter the subject",
    autoComplete: "off",
    required: true
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Write your message here",
    autoComplete: "off",
    required: true
  }
];

export const contactFormContent = {
  submitLabel: "Send Message"
};
