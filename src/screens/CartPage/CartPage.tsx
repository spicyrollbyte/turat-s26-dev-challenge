import { useState, useEffect } from "react";
import { getCart, removeFromCart, updateCartQuantity, getUser, isLoggedIn } from "../../utils/localStorage";
import { getProductById } from "../../utils/products";
import { LoginModal } from "../../components/LoginModal";
import { login as loginUser } from "../../utils/localStorage";

export const CartPage = (): JSX.Element => {
  const [user, setUser] = useState(getUser());
  const [cartItems, setCartItems] = useState(getCart());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    setUser(getUser());
    setCartItems(getCart());
  }, []);

  const handleLogin = (name: string, email: string) => {
    const newUser = loginUser(name, email);
    setUser(newUser);
    setCartItems(getCart());
  };

  if (!isLoggedIn()) {
    return (
      <>
        <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to view your cart</p>
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

  const handleRemoveFromCart = (cartItemId: string) => {
    removeFromCart(cartItemId);
    setCartItems(getCart());
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    updateCartQuantity(cartItemId, newQuantity);
    setQuantities(prev => ({ ...prev, [cartItemId]: newQuantity }));
    setCartItems(getCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      if (!product) return total;
      
      const price = product.salePrice || product.price;
      const quantity = quantities[item.id] || item.quantity;
      return total + (price * quantity);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-[#4a4c6c] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                
                const currentQuantity = quantities[item.id] || item.quantity;
                const itemPrice = product.salePrice || product.price;
                const itemTotal = itemPrice * currentQuantity;

                return (
                  <div key={item.id} className="bg-white rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 bg-[#e9e9eb] rounded flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        
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
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, currentQuantity - 1)}
                              disabled={currentQuantity <= 1}
                              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x">{currentQuantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, currentQuantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">${itemTotal.toFixed(2)}</span>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Checkout functionality coming soon!')}
                  className="w-full bg-[#4a4c6c] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity mb-3"
                >
                  Proceed to Checkout
                </button>

                <a
                  href="/"
                  className="block w-full text-center border-2 border-[#4a4c6c] text-[#4a4c6c] py-3 rounded-lg font-bold hover:bg-[#4a4c6c] hover:text-white transition-all"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
