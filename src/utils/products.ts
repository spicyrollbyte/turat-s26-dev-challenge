// Static product data
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    name: "HAVIT HV-G92 Gamepad",
    description: "",
    price: 160,
    image: "https://c.animaapp.com/oF24BMsY/img/uploaded-asset-1769836027978-0.png",
    rating: 3,
    reviews: 88,
    inStock: true,
  },
  {
    id: "2",
    name: "HAVIT HV-G92 Gamepad",
    description: "",
    price: 160,
    image: "https://c.animaapp.com/oF24BMsY/img/uploaded-asset-1769836146609-0.png",
    rating: 0,
    reviews: 88,
    inStock: true,
  },
  {
    id: "3",
    name: "HAVIT HV-G92 Gamepad",
    description: "",
    price: 160,
    image: "https://c.animaapp.com/oF24BMsY/img/uploaded-asset-1769836229930-0.png",
    rating: 0,
    reviews: 88,
    inStock: true,
  },
  {
    id: "4",
    name: "HAVIT HV-G92 Gamepad",
    description: "",
    price: 1160,
    salePrice: 960,
    discount: "-35%",
    image: "https://c.animaapp.com/oF24BMsY/img/cosmic-unity-1@2x.png",
    rating: 4,
    reviews: 75,
    inStock: true,
  },
  {
    id: "5",
    name: "HAVIT HV-G92 Gamepad",
    description: "",
    price: 160,
    image: "https://c.animaapp.com/oF24BMsY/img/uploaded-asset-1769836229930-0.png",
    rating: 3,
    reviews: 88,
    inStock: true,
  },
  {
    id: "6",
    name: "HAVIT HV-G92 Gamepady",
    description: "",
    price: 1160,
    salePrice: 960,
    discount: "-35%",
    image: "https://c.animaapp.com/oF24BMsY/img/cosmic-unity-1@2x.png",
    rating: 4,
    reviews: 75,
    inStock: true,
  },
  {
    id: "7",
    name: "HAVIT HV-G92 Gamepad",
    description: "",
    price: 160,
    image: "https://c.animaapp.com/oF24BMsY/img/uploaded-asset-1769836146609-0.png",
    rating: 0,
    reviews: 88,
    inStock: true,
  },
  {
    id: "8",
    name: "HAVIT HV-G92 Gamepad",
    description: "",
    price: 1160,
    salePrice: 960,
    discount: "-35%",
    image: "https://c.animaapp.com/oF24BMsY/img/air-zoom-pegasus-37@2x.png",
    rating: 4,
    reviews: 75,
    inStock: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getAllProducts = (): Product[] => {
  return products;
};
