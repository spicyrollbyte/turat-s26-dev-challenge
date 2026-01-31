# E-Commerce Shoe Store

**Made by:** Turat Zheksheev  
**For:** Spring 2026 LavaLab Challenge

A modern, full-stack e-commerce web application built with React, TypeScript, and Tailwind CSS. Features include user authentication, shopping cart, wishlist functionality, and a responsive design that works seamlessly across all devices.

## 🚀 Features

- **User Authentication** - Simple login/logout with local storage persistence
- **Product Catalog** - Browse 8 featured products with images, ratings, and reviews
- **Shopping Cart** - Add products to cart, update quantities, and view order summary
- **Wishlist** - Save favorite products for later across sessions
- **Responsive Design** - Mobile-first design that adapts to all screen sizes
- **Local Storage** - All data persists in browser (no backend required)
- **100% Portable** - Works immediately after cloning, no setup needed

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** Local Storage (browser-based)
- **Build Tool:** Vite
- **Package Manager:** npm

## 📋 Prerequisites

Before running this project, make sure you have the following installed on your system:

- **Node.js** (version 16.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

## 🚀 Getting Started

Follow these steps to run the project on your local machine:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-folder-name>
```

Or download the ZIP file and extract it to your desired location.

### 2. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- React and React DOM
- React Router
- Tailwind CSS
- Anima Playground React SDK
- Vite and build tools

### 3. Run the Development Server

Start the local development server:

```bash
npm run dev
```

After a few seconds, the project will be accessible at:

**[http://localhost:5173/](http://localhost:5173/)**

The development server includes:
- Hot Module Replacement (HMR) - Changes reflect instantly
- Automatic browser refresh on file changes
- Error overlay for debugging

### 4. Build for Production (Optional)

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder with optimized static files ready for deployment.

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable components
│   │   └── ProductSeeder.tsx
│   ├── screens/             # Page components
│   │   ├── HomePage/
│   │   │   ├── sections/    # Homepage sections
│   │   │   └── HomePage.tsx
│   │   ├── CartPage/
│   │   │   └── CartPage.tsx
│   │   └── WishlistPage/
│   │       └── WishlistPage.tsx
│   ├── utils/               # Utility functions
│   │   └── seedProducts.ts
│   ├── App.tsx              # Main app component with routing
│   └── index.tsx            # App entry point
├── static/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🎯 Key Features Explained

### Authentication
- Click the profile icon to log in
- User data persists across sessions
- Logout option available in dropdown menu

### Shopping Cart
- Add products from homepage or wishlist
- Update quantities with +/- buttons
- Remove items individually
- View order summary with total calculation
- Proceed to checkout (coming soon)

### Wishlist
- Click heart icon on any product to save
- View all saved products on wishlist page
- Add wishlist items directly to cart
- Remove items with X button

### Product Catalog
- 8 featured products automatically seeded to database
- Product ratings and reviews
- Sale prices and discount badges
- Responsive grid layout (1-4 columns based on screen size)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm install` - Install dependencies

## 🌐 Browser Support

This application works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.)

### Dependencies Not Installing
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Make sure you're using Node.js version 16 or higher:

```bash
node --version
```

### Data Not Persisting
This app uses browser Local Storage. Data persists as long as you don't clear your browser data. Each browser/device has its own separate data.

## 💾 Data Storage

All data (cart, wishlist, user info) is stored in your browser's Local Storage:
- **No backend server required**
- **No database setup needed**
- **Works offline** (after initial load)
- **Data persists** across page refreshes
- **Private to your browser** - each user has their own data

## 📄 License

This project was created for the Spring 2026 LavaLab Challenge.

## 👤 Author

**Turat Zheksheev**

---

**Note:** This project is 100% self-contained and uses browser Local Storage for data persistence. No external services or databases are required. Anyone can clone and run it immediately!
