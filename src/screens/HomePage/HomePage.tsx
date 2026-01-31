import { useState, useEffect } from "react";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { ProductGridSection } from "./sections/ProductGridSection";
import { ServiceHighlightsSection } from "./sections/ServiceHighlightsSection";
import { LoginModal } from "../../components/LoginModal";
import { categories } from "../../utils/staticData";
import { getUser, login as loginUser, logout as logoutUser } from "../../utils/localStorage";

export const HomePage = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogin = (name: string, email: string) => {
    const newUser = loginUser(name, email);
    setUser(newUser);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <div
      className="flex flex-col items-center gap-28 relative bg-[#f4f4f4]"
      data-model-id="1:96"
    >
      <div className="flex items-center justify-center gap-2.5 px-4 sm:px-8 py-2 sm:py-3 relative self-stretch w-full flex-[0_0_auto] bg-[#4a4c6c]">
        <p className="relative w-fit mt-[-1.00px] [font-family:'Cabinet_Grotesk-Bold',Helvetica] font-bold text-white text-xs sm:text-sm tracking-[0] leading-[normal] text-center whitespace-nowrap">
          New here? Save 20% with code: YR24
        </p>
      </div>

      <nav className="flex items-center justify-between w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-6 relative flex-[0_0_auto]">
        <div className="flex items-center gap-4 sm:gap-8 lg:gap-12">
          <button 
            className="hover:opacity-70 transition-opacity cursor-pointer flex-shrink-0"
            onClick={() => window.location.href = '/'}
            aria-label="Home"
          >
            <img
              className="relative w-[40px] h-[50px] object-contain"
              alt="Logo"
              src="https://c.animaapp.com/oF24BMsY/img/uploaded-asset-1769832251907-0.png"
            />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-12">
            {categories.map((category) => (
              <a
                key={category.id}
                href="#"
                className="[font-family:'Cabinet_Grotesk-Bold',Helvetica] font-bold text-[#181818] text-sm lg:text-base tracking-[0] leading-[normal] hover:underline transition-all cursor-pointer whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Navigate to ${category.name}`);
                }}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-6 h-6 flex flex-col justify-center items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-5 h-0.5 bg-[#181818] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-[#181818] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-[#181818] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
          <button 
            className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-70 transition-opacity cursor-pointer flex-shrink-0"
            aria-label="Wishlist"
            onClick={() => window.location.href = '/wishlist'}
          >
            <svg 
              className="w-full h-full transition-all" 
              viewBox="0 0 24 24" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg" 
              stroke="#181818"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="w-6 h-6 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Cart"
            onClick={() => window.location.href = '/cart'}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M4 5
                   h2
                   c0.6 0 0.9 0.4 1.1 1.1
                   l1.4 5.8
                   c0.2 0.7 0.6 1 1.2 1
                   h11.8
                   c0.6 0 1-0.3 1.2-1
                   l1.1-4.8
                   H8.5"
                fill="none"
                stroke="#181818"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.7 12.5
                   L9 18.8
                   L18 18.8"
                fill="none"
                stroke="#181818"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="11" cy="20" r="1.2" fill="#181818" />
              <circle cx="17" cy="20" r="1.2" fill="#181818" />
            </svg>
          </button>
          <div className="relative group">
            <button 
              className="w-6 h-6 hover:opacity-70 transition-opacity cursor-pointer relative" 
              aria-label={!user ? "Login" : "Profile"}
              onClick={() => {
                if (!user) {
                  setIsLoginModalOpen(true);
                }
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#181818">
                <circle cx="12" cy="8" r="4" strokeWidth="1.5"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {user && (
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            
            {/* User Menu Dropdown */}
            {user && (
              <div className="hidden group-hover:block absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg p-4 min-w-[200px] z-50 before:content-[''] before:absolute before:bottom-full before:right-0 before:w-full before:h-2">
                <div className="mb-3 pb-3 border-b">
                  <p className="font-bold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[120px] left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
          <div className="flex flex-col py-4">
            {categories.map((category) => (
              <a
                key={category.id}
                href="#"
                className="[font-family:'Cabinet_Grotesk-Bold',Helvetica] font-bold text-[#181818] text-base tracking-[0] leading-[normal] hover:bg-gray-100 transition-all cursor-pointer px-6 py-3"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  alert(`Navigate to ${category.name}`);
                }}
              >
                {category.name}
              </a>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="border-t mt-2 pt-2">
              {!user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full text-left px-6 py-3 [font-family:'Cabinet_Grotesk-Bold',Helvetica] font-bold text-[#4a4c6c] hover:bg-gray-100 transition-all"
                >
                  Login
                </button>
              ) : (
                <div className="px-6 py-3">
                  <p className="font-bold text-sm mb-1">{user.name}</p>
                  <p className="text-xs text-gray-600 mb-3">{user.email}</p>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-12">
        <HeroSection />
      </div>
      <ServiceHighlightsSection />
      <ProductGridSection />
      <FooterSection />
    </div>
  );
};
