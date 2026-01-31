// Static data for categories, social links, and features
export type Category = {
  id: string;
  name: string;
};

export type SocialLink = {
  id: string;
  name: string;
  icon: string;
  url: string;
  ariaLabel: string;
};

export type Feature = {
  id: string;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
};

export const categories: Category[] = [
  { id: "1", name: "Women" },
  { id: "2", name: "Men" },
  { id: "3", name: "Kids" },
  { id: "4", name: "Classics" },
  { id: "5", name: "Sport" },
  { id: "6", name: "Sale" },
];

export const socialLinks: SocialLink[] = [
  {
    id: "1",
    name: "Facebook",
    icon: "https://c.animaapp.com/oF24BMsY/img/facebook-icon.svg",
    url: "https://facebook.com",
    ariaLabel: "Visit our Facebook page"
  },
  {
    id: "2",
    name: "Instagram",
    icon: "https://c.animaapp.com/oF24BMsY/img/instagram-icon.svg",
    url: "https://instagram.com",
    ariaLabel: "Visit our Instagram page"
  },
  {
    id: "3",
    name: "X",
    icon: "https://c.animaapp.com/oF24BMsY/img/x-icon.svg",
    url: "https://x.com",
    ariaLabel: "Visit our X page"
  },
  {
    id: "4",
    name: "LinkedIn",
    icon: "https://c.animaapp.com/oF24BMsY/img/linkedin-icon.svg",
    url: "https://linkedin.com",
    ariaLabel: "Visit our LinkedIn page"
  },
  {
    id: "5",
    name: "YouTube",
    icon: "https://c.animaapp.com/oF24BMsY/img/youtube-icon.svg",
    url: "https://youtube.com",
    ariaLabel: "Visit our YouTube channel"
  },
];

export const features: Feature[] = [
  {
    id: "1",
    icon: "https://c.animaapp.com/oF24BMsY/img/icon-delivery.svg",
    iconAlt: "Delivery icon",
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140"
  },
  {
    id: "2",
    icon: "https://c.animaapp.com/oF24BMsY/img/icon-customer-service.svg",
    iconAlt: "Customer service icon",
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support"
  },
  {
    id: "3",
    icon: "https://c.animaapp.com/oF24BMsY/img/icon-secure.svg",
    iconAlt: "Money back guarantee icon",
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days"
  },
];
