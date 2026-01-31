import { useState } from "react";
import { getAllProducts } from "../../../../utils/products";
import { 
  addToCart as addToCartLS, 
  addToWishlist as addToWishlistLS,
  removeFromWishlist as removeFromWishlistLS,
  isInWishlist as isInWishlistLS,
  getCart,
  isLoggedIn
} from "../../../../utils/localStorage";

export const ServiceHighlightsSection = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<string>("New Arrivals");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlistState, setWishlistState] = useState<Record<string, boolean>>({});
  const [, setRefresh] = useState(0);

  const products = getAllProducts();

  const handleAddToCart = (productId: string) => {
    if (!isLoggedIn()) {
      alert("Please log in to add items to your cart");
      return;
    }

    try {
      const cart = getCart();
      const existingItem = cart.find(item => item.productId === productId);
      
      if (existingItem) {
        alert("Product is already in your cart!");
        return;
      }

      addToCartLS(productId);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleToggleWishlist = (productId: string) => {
    if (!isLoggedIn()) {
      alert("Please log in to add items to your wishlist");
      return;
    }

    try {
      const isInWishlist = isInWishlistLS(productId);
      
      if (isInWishlist) {
        const wishlist = require("../../../../utils/localStorage").getWishlist();
        const item = wishlist.find((i: any) => i.productId === productId);
        if (item) {
          removeFromWishlistLS(item.id);
          setWishlistState(prev => ({ ...prev, [productId]: false }));
          alert("Product removed from wishlist!");
        }
      } else {
        addToWishlistLS(productId);
        setWishlistState(prev => ({ ...prev, [productId]: true }));
        alert("Product added to wishlist!");
      }
      setRefresh(prev => prev + 1);
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
      alert("Failed to update wishlist. Please try again.");
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistState[productId] ?? isInWishlistLS(productId);
  };

  const categories = [
    {
      label: "New Arrivals",
      borderColor: "#4a4c6c",
      shadowColor: "#4a4c6c66",
      textColor: "#4a4c6c",
    },
    {
      label: "What's Trending",
      borderColor: "#77794e",
      shadowColor: "#77794e66",
      textColor: "#77794e",
    },
  ];

  const displayProducts = products.map((product, index) => ({
    ...product,
    displayId: index + 1,
    hasAddToCart: product.salePrice !== null && product.salePrice !== undefined,
    starIcon: product.rating > 0 ? "https://c.animaapp.com/oF24BMsY/img/vector-22.svg" : "https://c.animaapp.com/oF24BMsY/img/vector-34.svg",
    emptyStarIcon: "https://c.animaapp.com/oF24BMsY/img/vector-34.svg",
    isRotated: index === 7,
  }));

  const renderStars = (
    rating: number,
    starIcon: string,
    emptyStarIcon: string,
  ) => {
    return Array.from({ length: 5 }, (_, index) => (
      <img
        key={index}
        className="relative w-[14.5px] h-[14.3px]"
        alt="Star"
        src={index < rating ? starIcon : emptyStarIcon}
      />
    ));
  };

  return (
    <section className="flex flex-col items-center gap-24 lg:gap-[166px] relative w-full px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col items-start gap-12 lg:gap-[85px] relative w-full max-w-7xl">
        <nav
          className="flex flex-wrap items-start justify-start gap-4 sm:gap-6 lg:gap-9 relative w-full"
          role="navigation"
          aria-label="Product categories"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className="all-[unset] box-border inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 relative flex-shrink-0 rounded-[100px] border-2 sm:border-4 border-solid cursor-pointer transition-all"
              style={{
                borderColor: category.borderColor,
                boxShadow: `0px 5px 8px ${category.shadowColor}`,
                opacity: activeCategory === category.label ? 1 : 0.7,
                backgroundColor: category.borderColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.querySelector('span')!.style.color = category.textColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = category.borderColor;
                e.currentTarget.querySelector('span')!.style.color = '#f4f4f4';
              }}
              aria-label={category.label}
              onClick={() => setActiveCategory(category.label)}
            >
              <span 
                className="relative w-fit mt-[-4.00px] [font-family:'Cabinet_Grotesk-Bold',Helvetica] font-bold text-lg sm:text-xl lg:text-2xl tracking-[1.00px] leading-[normal] transition-colors whitespace-nowrap"
                style={{ color: '#f4f4f4' }}
              >
                {category.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-8 sm:gap-12 lg:gap-[50px] relative w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-[66px] relative w-full">
            {displayProducts.slice(0, 4).map((product) => (
              <article
                key={product.id}
                className="flex flex-col items-start gap-4 relative w-full cursor-pointer transition-transform hover:scale-105"
                onClick={() => alert(`Viewing ${product.name}`)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative w-full aspect-[270/250] bg-[#e9e9eb] rounded overflow-hidden">
                  {product.discount && (
                    <div className="inline-flex items-center justify-center gap-2.5 px-2 sm:px-3 py-1 absolute top-2 sm:top-3 left-2 sm:left-3 bg-secondary-2 rounded z-10">
                      <span className="w-fit mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] text-text text-[10px] sm:text-xs leading-[18px] whitespace-nowrap relative font-normal tracking-[0]">
                        {product.discount}
                      </span>
                    </div>
                  )}
                  
                  {hoveredProduct === product.id && (
                    <button
                      className="absolute w-full left-0 bottom-0 h-[36px] sm:h-[41px] bg-button rounded-[0px_0px_4px_4px] z-10 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                      aria-label={`Add ${product.name} to cart`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                    >
                      <span className="[font-family:'Space_Grotesk',Helvetica] font-medium text-white text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
                        Add To Cart
                      </span>
                    </button>
                  )}
                  <button
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-[34px] sm:h-[34px] bg-[#e9e9eb] rounded cursor-pointer transition-all z-20 flex items-center justify-center group border-2 border-transparent hover:border-[#DB4444]"
                    aria-label="Add to wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(product.id);
                    }}
                  >
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-all"
                      viewBox="0 0 24 24" 
                      fill={isInWishlist(product.id) ? "#DB4444" : "none"} 
                      xmlns="http://www.w3.org/2000/svg" 
                      stroke={isInWishlist(product.id) ? "#DB4444" : "#181818"}
                      strokeWidth="1.5"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <img
                    className="absolute top-[8%] left-[17%] w-[72%] h-[78%] object-cover"
                    alt={product.name}
                    src={product.image}
                  />
                </div>

                <div className="flex flex-col items-start gap-2 relative w-full">
                  <h3 className="relative w-full mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] font-medium text-black text-sm sm:text-base tracking-[0] leading-6 truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-start gap-2 sm:gap-3 relative flex-wrap">
                    {product.salePrice ? (
                      <>
                        <span className="text-secondary-2 relative w-fit mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] font-medium text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
                          ${product.salePrice}
                        </span>
                        <span className="opacity-50 text-button line-through relative w-fit mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] font-medium text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="relative w-fit mt-[-1.00px] opacity-50 [font-family:'Poppins',Helvetica] font-medium text-button text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-1 sm:gap-2 relative flex-wrap">
                    <div
                      className="flex items-start relative"
                      role="img"
                      aria-label={`Rating: ${product.rating} out of 5 stars`}
                    >
                      {renderStars(
                        product.rating,
                        product.starIcon,
                        product.emptyStarIcon,
                      )}
                    </div>
                    <span className="relative w-fit h-5 mt-[-1.00px] opacity-50 [font-family:'Space_Grotesk',Helvetica] font-bold text-text-2 text-xs sm:text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-[66px] relative w-full">
            {displayProducts.slice(4, 8).map((product) => (
              <article
                key={product.id}
                className="flex flex-col items-start gap-4 relative w-full cursor-pointer transition-transform hover:scale-105"
                onClick={() => alert(`Viewing ${product.name}`)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative w-full aspect-[270/250] bg-[#e9e9eb] rounded overflow-hidden">
                  {product.discount && (
                    <div className="inline-flex items-center justify-center gap-2.5 px-2 sm:px-3 py-1 absolute top-2 sm:top-3 left-2 sm:left-3 bg-secondary-2 rounded z-10">
                      <span className="w-fit mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] text-text text-[10px] sm:text-xs leading-[18px] whitespace-nowrap relative font-normal tracking-[0]">
                        {product.discount}
                      </span>
                    </div>
                  )}
                  
                  {hoveredProduct === product.id && (
                    <button
                      className="absolute w-full left-0 bottom-0 h-[36px] sm:h-[41px] bg-button rounded-[0px_0px_4px_4px] z-10 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                      aria-label={`Add ${product.name} to cart`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                    >
                      <span className="[font-family:'Space_Grotesk',Helvetica] font-medium text-white text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
                        Add To Cart
                      </span>
                    </button>
                  )}
                  
                  <button
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-[34px] sm:h-[34px] bg-[#e9e9eb] rounded cursor-pointer transition-all z-20 flex items-center justify-center group border-2 border-transparent hover:border-[#DB4444]"
                    aria-label="Add to wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(product.id);
                    }}
                  >
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-all"
                      viewBox="0 0 24 24" 
                      fill={isInWishlist(product.id) ? "#DB4444" : "none"} 
                      xmlns="http://www.w3.org/2000/svg" 
                      stroke={isInWishlist(product.id) ? "#DB4444" : "#181818"}
                      strokeWidth="1.5"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {product.isRotated ? (
                    <img
                      className="absolute top-[8%] left-[14%] w-[72%] h-[78%] object-contain"
                      alt={product.name}
                      src={product.image}
                    />
                  ) : (
                    <img
                      className="absolute top-[8%] left-[17%] w-[72%] h-[78%] object-cover"
                      alt={product.name}
                      src={product.image}
                    />
                  )}
                </div>

                <div className="flex flex-col items-start gap-2 relative w-full">
                  <h3 className="relative w-full mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] font-medium text-black text-sm sm:text-base tracking-[0] leading-6 truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-start gap-2 sm:gap-3 relative flex-wrap">
                    {product.salePrice ? (
                      <>
                        <span className="text-secondary-2 relative w-fit mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] font-medium text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
                          ${product.salePrice}
                        </span>
                        <span className="opacity-50 text-button line-through relative w-fit mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] font-medium text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="relative w-fit mt-[-1.00px] opacity-50 [font-family:'Poppins',Helvetica] font-medium text-button text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-1 sm:gap-2 relative flex-wrap">
                    <div
                      className="flex items-start relative"
                      role="img"
                      aria-label={`Rating: ${product.rating} out of 5 stars`}
                    >
                      {renderStars(
                        product.rating,
                        product.starIcon,
                        product.emptyStarIcon,
                      )}
                    </div>
                    <span className="relative w-fit h-5 mt-[-1.00px] opacity-50 [font-family:'Space_Grotesk',Helvetica] font-bold text-text-2 text-xs sm:text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <img
        className="relative w-full max-w-7xl h-px object-cover"
        alt=""
        src="https://c.animaapp.com/oF24BMsY/img/line-1.svg"
        role="presentation"
      />
    </section>
  );
};
