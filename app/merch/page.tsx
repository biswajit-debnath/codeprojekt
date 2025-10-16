"use client";

import React, { useState, useEffect } from "react";
import styles from "../_styles/Home.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../_styles/animations";

const tshirts = [
  {
    id: 1,
    name: "Classic Gaming Legend Tee",
    price: 350,
    image: "/merch/tshirt1.png",
    description: [
      "Celebrate your love for gaming with this timeless classic tee.",
      "Soft, comfortable, and perfect for everyday wear.",
    ],
  },
  {
    id: 2,
    name: "Mobile Legends Battle Arena Jersey",
    price: 300,
    image: "/merch/tshirt2.png",
    description: [
      "Inspired by the iconic Mobile Legends Battle Arena.",
      "Lightweight and breathable for intense gaming sessions.",
    ],
  },
  {
    id: 3,
    name: "Esports Championship Pro Shirt",
    price: 250,
    image: "/merch/tshirt3.png",
    description: [
      "Show off your esports pride with this pro-level shirt.",
      "Designed for fans and players alike.",
    ],
  },
  {
    id: 4,
    name: "Ultimate Gaming Collection Tee I",
    price: 200,
    image: "/merch/tshirt4.png",
    description: [
      "Part of the exclusive Ultimate Gaming Collection series.",
      "A must-have for every gaming enthusiast.",
    ],
  },
  {
    id: 5,
    name: "Ultimate Gaming Collection Tee II",
    price: 200,
    image: "/merch/tshirt5.png",
    description: [
      "Complete your collection with this stylish tee.",
      "Premium quality and unique design.",
    ],
  },
];

const figurines = [
  {
    id: 1,
    name: "Epic Gaming Hero Figurine",
    price: 450,
    image: "/merch/figurine1.webp",
    description: [
      "Bring home the epic hero from your favorite game.",
      "Highly detailed and perfect for display.",
    ],
  },
  {
    id: 2,
    name: "Legendary Battle Commander Statue",
    price: 400,
    image: "/merch/figurine2.webp",
    description: [
      "Command your collection with this legendary statue.",
      "A centerpiece for any gaming shelf.",
    ],
  },
  {
    id: 3,
    name: "Fantasy Warrior Collection Figure",
    price: 350,
    image: "/merch/figurine3.png",
    description: [
      "Step into fantasy worlds with this warrior figure.",
      "A collector’s dream for RPG fans.",
    ],
  },
  {
    id: 4,
    name: "Anime Gaming Character Model I",
    price: 300,
    image: "/merch/figurine4.png",
    description: [
      "Anime-inspired model for true gaming fans.",
      "Vibrant colors and dynamic pose.",
    ],
  },
  {
    id: 5,
    name: "Anime Gaming Character Model II",
    price: 300,
    image: "/merch/figurine5.png",
    description: [
      "Complete your anime gaming set with this figure.",
      "Perfect for display or gifting.",
    ],
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  qty: number;
  size?: string; // For tshirts
  fromCartButton?: boolean;
};

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Track selected size for each tshirt by id
  const [selectedSizes, setSelectedSizes] = useState<{ [id: number]: string }>(
    {}
  );

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Add item to cart (increase quantity if already exists)
  const addToCart = (
    item: { id: number; name: string; price: number; image: string },
    type: string,
    size?: string
  ) => {
    setCart((prevCart) => {
      // For tshirts, size is required and part of uniqueness
      if(type === "tshirt" && !size) {
        alert("Please select a size first");
        return prevCart;
      }
      const idx = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.type === type &&
          (type === "tshirt" ? cartItem.size === size : true)
      );
      if (idx !== -1) {
        // Item exists, increment quantity by 1 only
        return prevCart.map((cartItem, i) =>
          i === idx ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      } else {
        // New item
        return [
          ...prevCart,
          {
            ...item,
            type,
            qty: 1,
            ...(type === "tshirt" && size ? { size } : {}),
          },
        ];
      }
    });
  };

  // Remove one quantity of item from cart
  const removeFromCart = (
    item: { id: number; name: string; price: number; image: string },
    type: string
  ) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.type === type
      );
      if (idx !== -1) {
        const updated = [...prevCart];
        if (updated[idx].qty > 1) {
          updated[idx].qty -= 1;
          return updated;
        } else {
          // Remove item
          updated.splice(idx, 1);
          return updated;
        }
      }
      return prevCart;
    });
  };

  // Remove all quantities of an item
  const removeAllFromCart = (
    item: { id: number; name: string; price: number; image: string },
    type: string
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) => !(cartItem.id === item.id && cartItem.type === type)
      )
    );
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  // Show out-of-stock notice when proceeding to payment
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [recipient, setRecipient] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [formError, setFormError] = useState("");

  const handleProceed = () => {
    // Show out-of-stock notice before payment
    setShowOutOfStock(true);
  };

  const handleCloseOutOfStock = () => {
    setShowOutOfStock(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRecipient({
      name: "",
      phone: "",
      email: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
    });
    setFormError("");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !recipient.name.trim() ||
      !recipient.phone.trim() ||
      !recipient.address.trim() ||
      !recipient.pincode.trim() ||
      !recipient.city.trim() ||
      !recipient.state.trim()
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }
    // Optionally, add more validation (e.g., phone/email format)
    alert(
      `Order placed for Cash on Delivery!\n\nName: ${recipient.name}\nPhone: ${recipient.phone}\nEmail: ${recipient.email}\nAddress: ${recipient.address}\nPincode: ${recipient.pincode}\nCity: ${recipient.city}\nState: ${recipient.state}`
    );
    handleCloseModal();
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative md:px-10 lg:px-20 md:pt-5 font-['The-Last-Shuriken']">
        <motion.div
          className="relative h-[160px] md:h-[300px] lg:h-[400px] max-w-[1550px] mx-auto"
          initial="hidden"
          animate="show"
          variants={fadeIn("up", 0.3)}
        >
          <div className="relative w-full h-full overflow-hidden">
            <div
              className={`transition-opacity duration-300 ${
                isLoaded ? "opacity-0" : "opacity-100"
              } absolute top-0 left-0 right-0 bottom-0 bg-gray-500 animate-pulse`}
            ></div>
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <Image
                src="/hero-imageMain.jpg"
                alt="Merch Hero"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-8 lg:bottom-20 inset-x-0 flex flex-col items-center z-20"
            variants={slideIn("up", 0.5)}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              className="text-2xl md:text-5xl lg:text-6xl font-bold text-white md:mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              MERCHANDISE SHOP
            </motion.h1>
            <motion.p
              className="text-white text-sm md:text-lg lg:text-xl text-center max-w-2xl px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Discover exclusive gaming merchandise and collectibles
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      <main
        className="flex flex-col items-center min-h-screen py-16 px-4 md:px-10 lg:px-20"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-[1550px]">
          <section className="flex-1 flex flex-col gap-16">
            {/* T-Shirts */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <h2
                  className="text-2xl md:text-4xl font-bold tracking-tight"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "'The-Last-Shuriken', cursive",
                  }}
                >
                  T-SHIRTS
                </h2>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 lg:gap-4">
                {tshirts.map((shirt, i) => {
                  // Find cart item for this shirt and selected size
                  const selectedSize = selectedSizes[shirt.id] || "";
                  const cartItem = cart.find(
                    (item) =>
                      item.id === shirt.id &&
                      item.type === "tshirt" &&
                      item.size === selectedSize
                  );
                  return (
                    <div
                      key={shirt.id}
                      className="relative bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group w-full"
                      style={{
                        fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
                      }}
                    >
                      {/* Tags */}
                      <div className="absolute top-2 left-2 lg:top-6 lg:left-6 z-10">
                        <span className="text-xs lg:text-sm text-gray-500 font-medium tracking-wide uppercase">
                          MLBB
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 lg:top-6 lg:right-6 z-10">
                        {i === 0 && (
                          <span className="bg-lime-400 text-black text-xs lg:text-sm font-bold px-2 py-1 lg:px-4 lg:py-2 rounded">
                            BEST SELLER
                          </span>
                        )}
                        {i === 1 && (
                          <span className="bg-blue-500 text-white text-xs lg:text-sm font-bold px-2 py-1 lg:px-4 lg:py-2 rounded">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Image */}
                      <div className="px-4 py-6 lg:px-12 lg:py-16 lg:pb-1 flex items-center justify-center bg-gray-50">
                        <Image
                          src={shirt.image}
                          alt={shirt.name}
                          width={220}
                          height={220}
                          className="w-24 h-24 lg:w-56 lg:h-56 object-contain drop-shadow-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-2 lg:p-6 lg:pt-2">
                        <h3 className="font-bold text-sm lg:text-xl mb-2 lg:mb-4 text-gray-800 truncate">
                          {shirt.name.toUpperCase()}
                        </h3>
                        {/* Description */}
                        <div className="mb-2 lg:mb-4">
                          {shirt.description &&
                            shirt.description.map((line, idx) => (
                              <p
                                key={idx}
                                className="text-xs lg:text-base text-gray-500 leading-tight"
                              >
                                {line}
                              </p>
                            ))}
                        </div>
                        {/* Size Selector */}
                        <div className="mb-2">
                          <label className="block text-xs lg:text-sm font-semibold mb-1 text-gray-700">
                            Size:
                          </label>
                          <div className="flex gap-2">
                            {["S", "M", "L", "XL"].map((size) => (
                              <button
                                key={size}
                                type="button"
                                className={`px-2 py-1 border rounded text-xs lg:text-sm font-bold transition-colors ${
                                  selectedSize === size
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                                onClick={() =>
                                  setSelectedSizes((prev) => ({
                                    ...prev,
                                    [shirt.id]: size,
                                  }))
                                }
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* Price and Cart Button Row */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm lg:text-2xl font-bold text-gray-900">
                            ₹{shirt.price.toLocaleString()}.00
                          </div>
                          <div className="relative">
                            <button
                              className={`border-2 rounded-lg p-1.5 lg:p-3 transition-all duration-200 flex items-center justify-center hover:shadow-md group/cart ${
                                cartItem
                                  ? "bg-red-50 border-red-500 hover:border-red-600"
                                  : "bg-white border-gray-300 hover:border-gray-400"
                              }`}
                              onClick={() =>
                                // selectedSize &&
                                addToCart(shirt, "tshirt", selectedSize)
                              }
                              // disabled={!selectedSize}
                              title={
                                !selectedSize
                                  ? "Select a size first"
                                  : "Add to Cart"
                              }
                            >
                              <Image
                                src="/cart.png"
                                alt="Add to Cart"
                                width={28}
                                height={28}
                                className="w-4 h-4 lg:w-7 lg:h-7"
                              />
                            </button>
                            {cartItem && (
                              <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {cartItem.qty}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Figurines */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <h2
                  className="text-2xl md:text-4xl font-bold tracking-tight"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "'The-Last-Shuriken', cursive",
                  }}
                >
                  FIGURINES
                </h2>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 lg:gap-4">
                {figurines.map((fig, i) => {
                  const cartItem = cart.find(
                    (item) => item.id === fig.id && item.type === "figurine"
                  );
                  return (
                    <div
                      key={fig.id}
                      className="relative bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group w-full"
                      style={{
                        fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
                      }}
                    >
                      {/* Tags */}
                      <div className="absolute top-2 left-2 lg:top-6 lg:left-6 z-10">
                        <span className="text-xs lg:text-sm text-gray-500 font-medium tracking-wide uppercase">
                          {i === 0 ? "ANIME" : "BGMI"}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 lg:top-6 lg:right-6 z-10">
                        {i === 0 && (
                          <span className="bg-lime-400 text-black text-xs lg:text-sm font-bold px-2 py-1 lg:px-4 lg:py-2 rounded">
                            LIMITED EDITION
                          </span>
                        )}
                        {i === 1 && (
                          <span className="bg-blue-500 text-white text-xs lg:text-sm font-bold px-2 py-1 lg:px-4 lg:py-2 rounded">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Image */}
                      <div className="px-4 py-6 lg:px-12 lg:py-16 lg:pb-1 flex items-center justify-center bg-gray-50">
                        <Image
                          src={fig.image}
                          alt={fig.name}
                          width={220}
                          height={220}
                          className="w-24 h-24 lg:w-56 lg:h-56 object-contain drop-shadow-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-2 lg:p-6 lg:pt-2">
                        <h3 className="font-bold text-sm lg:text-xl mb-2 lg:mb-4 text-gray-800 truncate">
                          {fig.name.toUpperCase()}
                        </h3>
                        {/* Description */}
                        <div className="mb-2 lg:mb-4">
                          {fig.description &&
                            fig.description.map((line, idx) => (
                              <p
                                key={idx}
                                className="text-xs lg:text-base text-gray-500 leading-tight"
                              >
                                {line}
                              </p>
                            ))}
                        </div>
                        {/* Price and Cart Button Row */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm lg:text-2xl font-bold text-gray-900">
                            ₹{fig.price.toLocaleString()}.00
                          </div>
                          <div className="relative">
                            <button
                              className={`border-2 rounded-lg p-1.5 lg:p-3 transition-all duration-200 flex items-center justify-center hover:shadow-md group/cart ${
                                cartItem
                                  ? "bg-red-50 border-red-500 hover:border-red-600"
                                  : "bg-white border-gray-300 hover:border-gray-400"
                              }`}
                              onClick={() => addToCart(fig, "figurine")}
                            >
                              <Image
                                src="/cart.png"
                                alt="Add to Cart"
                                width={28}
                                height={28}
                                className="w-4 h-4 lg:w-7 lg:h-7"
                              />
                            </button>
                            {cartItem && (
                              <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {cartItem.qty}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* Cart */}
          <aside className="w-full lg:w-[400px] flex-shrink-0">
            <div
              className="sticky top-24 border border-gray-200 rounded-sm shadow-lg p-8"
              style={{
                background: "#fff",
                fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
              }}
            >
              <h2
                className="text-2xl font-bold mb-6 tracking-tight"
                style={{
                  color: "var(--primaryColor)",
                  fontFamily: "'The-Last-Shuriken', cursive",
                }}
              >
                Cart
              </h2>
              {cart.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  Your cart is empty.
                </div>
              ) : (
                <>
                  <ul className="space-y-3 mb-6">
                    {cart.map((item: any, idx: number) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center border-b border-gray-100 pb-3 text-base font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        <div className="flex flex-col dark:text-gray-600">
                          <span>
                            {item.name}{" "}
                            <span className="text-xs text-gray-400">
                              ({item.type}
                              {item.type === "tshirt" && item.size
                                ? `, ${item.size}`
                                : ""}
                              )
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold"
                            onClick={() =>
                              removeFromCart(
                                {
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  image: item.image,
                                },
                                item.type
                              )
                            }
                            title="Remove one"
                          >
                            -
                          </button>
                          <span className="font-semibold">{item.qty}</span>
                          <button
                            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold"
                            onClick={() =>
                              addToCart(
                                {
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  image: item.image,
                                },
                                item.type,
                                item.size // pass size for tshirt
                              )
                            }
                            title="Add one"
                          >
                            +
                          </button>
                          <button
                            className="ml-2 px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold"
                            onClick={() =>
                              removeAllFromCart(
                                {
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  image: item.image,
                                },
                                item.type
                              )
                            }
                            title="Remove all"
                          >
                            Remove
                          </button>
                          <span className="ml-4 dark:text-gray-600">
                            ₹{item.price * item.qty}.00
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="flex flex-col gap-4 border-t pt-4"
                    style={{ color: "var(--primaryColor)" }}
                  >
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>₹{total}.00</span>
                    </div>
                    <button
                      className={`mt-2 px-6 py-2 rounded-lg text-white font-bold text-lg transition-colors ${styles["custom-button"]}`}
                      style={{ background: "var(--primaryColor)" }}
                      onClick={handleProceed}
                      disabled={cart.length === 0}
                    >
                      Proceed for Payment
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
        {/* Out of Stock Modal */}
        {showOutOfStock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
              style={{
                fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
              }}
            >
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={handleCloseOutOfStock}
                aria-label="Close"
                type="button"
              >
                ×
              </button>
              <h3
                className="text-2xl font-bold mb-4 text-center"
                style={{
                  color: "var(--primaryColor)",
                  fontFamily: "'The-Last-Shuriken', cursive",
                }}
              >
                Out of Stock
              </h3>
              <p className="text-center text-gray-700 mb-4">
                Items are currently out of stock. For pre-orders, please contact
                <span className="font-bold"> +91 98630 73368</span>.
              </p>
              <div className="flex justify-center">
                <button
                  className={`mt-2 px-6 py-2 rounded-lg text-white font-bold text-lg transition-colors ${styles["custom-button"]}`}
                  style={{ background: "var(--primaryColor)" }}
                  onClick={handleCloseOutOfStock}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
              style={{
                fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
              }}
            >
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={handleCloseModal}
                aria-label="Close"
                type="button"
              >
                ×
              </button>
              <h3
                className="text-2xl font-bold mb-4 text-center"
                style={{
                  color: "var(--primaryColor)",
                  fontFamily: "'The-Last-Shuriken', cursive",
                }}
              >
                Delivery Details
              </h3>
              <form onSubmit={handlePay} className="flex flex-col gap-3">
                <input
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
                  placeholder="Full Name*"
                  value={recipient.name}
                  onChange={(e) => {
                    setRecipient((r) => ({ ...r, name: e.target.value }));
                    setFormError("");
                  }}
                  required
                />
                <input
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
                  placeholder="Phone Number*"
                  value={recipient.phone}
                  onChange={(e) => {
                    setRecipient((r) => ({ ...r, phone: e.target.value }));
                    setFormError("");
                  }}
                  required
                  type="tel"
                  pattern="[0-9]{10,}"
                />
                <input
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
                  placeholder="Email (optional)"
                  value={recipient.email}
                  onChange={(e) =>
                    setRecipient((r) => ({ ...r, email: e.target.value }))
                  }
                  type="email"
                />
                <textarea
                  className="border border-gray-300 rounded-lg p-3 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
                  placeholder="Full Address*"
                  value={recipient.address}
                  onChange={(e) => {
                    setRecipient((r) => ({ ...r, address: e.target.value }));
                    setFormError("");
                  }}
                  required
                />
                <div className="flex gap-2">
                  <input
                    className="border border-gray-300 rounded-lg p-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
                    placeholder="Pincode*"
                    value={recipient.pincode}
                    onChange={(e) => {
                      setRecipient((r) => ({ ...r, pincode: e.target.value }));
                      setFormError("");
                    }}
                    required
                    type="text"
                    pattern="[0-9]{5,}"
                  />
                  <input
                    className="border border-gray-300 rounded-lg p-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
                    placeholder="City*"
                    value={recipient.city}
                    onChange={(e) => {
                      setRecipient((r) => ({ ...r, city: e.target.value }));
                      setFormError("");
                    }}
                    required
                  />
                </div>
                <input
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]"
                  placeholder="State*"
                  value={recipient.state}
                  onChange={(e) => {
                    setRecipient((r) => ({ ...r, state: e.target.value }));
                    setFormError("");
                  }}
                  required
                />
                {formError && (
                  <span className="text-red-500 text-sm">{formError}</span>
                )}
                <button
                  type="submit"
                  className={`mt-2 px-6 py-2 rounded-lg text-white font-bold text-lg transition-colors ${styles["custom-button"]}`}
                  style={{ background: "var(--primaryColor)" }}
                >
                  Pay Cash on Delivery
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
