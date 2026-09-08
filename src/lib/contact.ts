export const CONTACT_CONFIG = {
  // Demo AI sales bot on WhatsApp Cloud API
  demoWhatsapp: {
    number: "919530840375",
    displayNumber: "+91 95308 40375",
    defaultMessage: "Hi, show me your summer dress collection.",
    get link() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.defaultMessage)}`;
    },
  },

  // Founder & sales business line
  founderWhatsapp: {
    number: "918847568693",
    displayNumber: "+91 88475 68693",
    defaultMessage: "Hi Vaibhav, I'd like to apply for the 30-Day Free Trial for my boutique.",
    inquiryMessage: "Hi Vaibhav, I'd like to know more about VoluChat.",
    get link() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.defaultMessage)}`;
    },
    get inquiryLink() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.inquiryMessage)}`;
    },
  },

  email: "support@voluchat.com",
};
