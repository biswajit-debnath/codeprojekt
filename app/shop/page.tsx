"use client";

import React, { useState } from "react";
import styles from "../_styles/Home.module.css";
import Image from "next/image";

const tshirts = [
  { id: 1, name: "Classic Logo Tee", price: 25, image: "/tshirt.png" },
  { id: 2, name: "Retro Style Tee", price: 30, image: "/tshirt.png" },
  { id: 3, name: "Retro Style Tee", price: 30, image: "/tshirt.png" },
  { id: 4, name: "Retro Style Tee", price: 30, image: "/tshirt.png" },
];

const figurines = [
  { id: 1, name: "Hero Figurine", price: 40, image: "/figurine.webp" },
  { id: 2, name: "Villain Figurine", price: 45, image: "/figurine.webp" },
  { id: 3, name: "Villain Figurine", price: 45, image: "/figurine.webp" },
  { id: 4, name: "Villain Figurine", price: 45, image: "/figurine.webp" },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  qty: number;
  fromCartButton?: boolean;
};

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart (increase quantity if already exists)
  const addToCart = (
    item: { id: number; name: string; price: number; image: string },
    type: string
  ) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.type === type
      );
      if (idx !== -1) {
        // Item exists, increment quantity
        const updated = [...prevCart];
        updated[idx].qty += 1;
        return updated;
      } else {
        // New item
        return [...prevCart, { ...item, type, qty: 1 }];
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
  const total = cart.reduce((sum, item) => sum + item.price * 83 * item.qty, 0);

  return (
    <main
      className="flex flex-col items-center min-h-screen py-16 px-4"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
      }}
    >
      <h1
        className="text-5xl font-extrabold mb-12 text-center tracking-tight drop-shadow-lg"
        style={{
          color: "var(--primaryColor)",
          fontFamily: "'The-Last-Shuriken', cursive",
        }}
      >
        Shop
      </h1>
      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl">
        <section className="flex-1 flex flex-col gap-16">
          {/* T-Shirts */}
          <div>
            <h2
              className="text-3xl font-bold mb-8 tracking-tight"
              style={{
                color: "var(--primaryColor)",
                fontFamily: "'The-Last-Shuriken', cursive",
              }}
            >
              T-Shirts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {tshirts.map((shirt, i) => (
                <div
                  key={shirt.id}
                  className="relative border border-gray-200 rounded-2xl shadow-lg flex flex-col items-center py-10 px-8 hover:shadow-2xl transition-all group"
                  style={{
                    background: "#fff",
                    fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
                  }}
                >
                  <span className="absolute left-6 top-4 text-xs text-gray-400 font-semibold tracking-wide uppercase">
                    MLBB
                  </span>
                  {i === 0 && (
                    <span className="absolute right-6 top-4 bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded shadow">
                      BEST SELLER
                    </span>
                  )}
                  {i === 1 && (
                    <span className="absolute right-6 top-4 bg-blue-400 text-white text-xs font-bold px-3 py-1 rounded shadow">
                      NEW
                    </span>
                  )}
                  <Image
                    src={shirt.image}
                    alt={shirt.name}
                    width={144}
                    height={144}
                    className="w-36 h-36 object-contain mb-5 drop-shadow-md"
                  />
                  <div
                    className="font-semibold text-lg text-center mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    {shirt.name}
                  </div>
                  <div
                    className="font-bold text-xl mb-4"
                    style={{ color: "var(--primaryColor)" }}
                  >
                    ₹{shirt.price * 83}.00
                  </div>
                  <button
                    className={`border-2 border-[var(--primaryColor)] rounded-lg p-2 transition flex items-center justify-center w-10 h-10 hover:bg-[var(--primaryColor)] group/cart ${styles["custom-button"]}`}
                    onClick={() => addToCart(shirt, "tshirt")}
                    title="Add to Cart"
                  >
                    <Image
                      src="/cart.png"
                      alt="Add to Cart"
                      width={20}
                      height={20}
                      className="w-5 h-5 group-hover/cart:filter group-hover/cart:invert"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Figurines */}
          <div>
            <h2
              className="text-3xl font-bold mb-8 tracking-tight"
              style={{
                color: "var(--primaryColor)",
                fontFamily: "'The-Last-Shuriken', cursive",
              }}
            >
              Figurines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {figurines.map((fig, i) => (
                <div
                  key={fig.id}
                  className="relative border border-gray-200 rounded-2xl shadow-lg flex flex-col items-center py-10 px-8 hover:shadow-2xl transition-all group"
                  style={{
                    background: "#fff",
                    fontFamily: "'Rentukka-Regular', Helvetica, sans-serif",
                  }}
                >
                  <span className="absolute left-6 top-4 text-xs text-gray-400 font-semibold tracking-wide uppercase">
                    {i === 0 ? "ANIME" : "BGMI"}
                  </span>
                  {i === 0 && (
                    <span className="absolute right-6 top-4 bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded shadow">
                      LIMITED EDITION
                    </span>
                  )}
                  {i === 1 && (
                    <span className="absolute right-6 top-4 bg-blue-400 text-white text-xs font-bold px-3 py-1 rounded shadow">
                      NEW
                    </span>
                  )}
                  <Image
                    src={fig.image}
                    alt={fig.name}
                    width={144}
                    height={144}
                    className="w-36 h-36 object-contain mb-5 drop-shadow-md"
                  />
                  <div
                    className="font-semibold text-lg text-center mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    {fig.name}
                  </div>
                  <div
                    className="font-bold text-xl mb-4"
                    style={{ color: "var(--primaryColor)" }}
                  >
                    ₹{fig.price * 83}.00
                  </div>
                  <button
                    className={`border-2 border-[var(--primaryColor)] rounded-lg p-2 transition flex items-center justify-center w-10 h-10 hover:bg-[var(--primaryColor)] group/cart ${styles["custom-button"]}`}
                    onClick={() => addToCart(fig, "figurine")}
                    title="Add to Cart"
                  >
                    <Image
                      src="/cart.png"
                      alt="Add to Cart"
                      width={20}
                      height={20}
                      className="w-5 h-5 group-hover/cart:filter group-hover/cart:invert"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Cart */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div
            className="sticky top-24 border border-gray-200 rounded-2xl shadow-lg p-8"
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
                      <div className="flex flex-col">
                        <span>
                          {item.name}{" "}
                          <span className="text-xs text-gray-400">
                            ({item.type})
                          </span>
                        </span>
                        <span className="text-xs text-gray-400">
                          Qty: {item.qty}
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
                              item.type
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
                        <span className="ml-4">
                          ₹{item.price * 83 * item.qty}.00
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div
                  className="flex justify-between items-center text-lg font-bold border-t pt-4"
                  style={{ color: "var(--primaryColor)" }}
                >
                  <span>Total:</span>
                  <span>₹{total}.00</span>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
