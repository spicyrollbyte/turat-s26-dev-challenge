import { useState, useEffect } from "react";
import { 
  getWishlist, 
  removeFromWishlist, 
  getUser, 
  isLoggedIn,
  addToCart,
  getCart
} from "../../utils/localStorage";
import { getProductById } from "../../utils/products";
import { LoginModal } from "../../components/LoginModal";
import { login as loginUser } from "../../utils/localStorage";

export const WishlistPage = (): JSX.Element => {
  const [user, setUser] = useState(getUser());
  const [wishlistItems, setWishlistItems] = useState(getWishlist());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
    setWishlistItems(getWishlist());
  }, []);

  const handleLogin = (name: string, email: string) => {
    const newUser = loginUser(name, email);
    setUser(newUser);
    setWishlistItems(getWishlist());
  };

  if (!isLoggedIn()) {
    return (
      <>
        <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to view your wishlist</p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-[#4a4c6c] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Log In
            </button>
          </div>
        </div>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  const handleRemoveFromWishlist = (wishlistItemId: string) => {
    removeFromWishlist(wishlistItemId);
    setWishlistItems(getWishlist());
  };

  const handleAddToCart = (productId: string) => {
    try {
      const cart = getCart();
      const existingCartItem = cart.find(item => item.productId === productId);
      
      if (existingCartItem) {
        alert("Product is already in your cart!");
        return;
      }

      addToCart(productId);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const isInCart = (productId: string): boolean => {
    const cart = getCart();
    return cart.some(item => item.productId === productId);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className="w-4 h-4"
        fill={index < rating ? "#FFA500" : "none"}
        stroke={index < rating ? "#FFA500" : "#D1D5DB"}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">My Wishlist</h1>
          <a
            href="/"
            className="px-6 py-2 border-2 border-[#4a4c6c] text-[#4a4c6c] rounded-lg font-bold hover:bg-[#4a4c6c] hover:text-white transition-all"
          >
            Continue Shopping
          </a>
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite products here!</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-[#4a4c6c] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="relative bg-[#e9e9eb] aspect-square">
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-[#DB4444] text-white px-2 py-1 rounded text-sm font-bold z-10">
                        {product.discount}
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors z-10"
                      aria-label="Remove from wishlist"
                    >
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain p-8"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-2 truncate">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-[#DB4444] font-bold text-lg">${product.salePrice}</span>
                          <span className="text-gray-500 line-through text-sm">${product.price}</span>
                        </>
                      ) : (
                        <span className="font-bold text-lg">${product.price}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={isInCart(product.id)}
                      className="w-full bg-[#4a4c6c] text-white py-2 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
