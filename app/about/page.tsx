"use client";

import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 dark:bg-[--navBlack]">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <div className="space-y-6">
          <section>
            <p className="mb-2 text-gray-700 dark:text-gray-400">
              <span className="text-red-600 hover:underline">
                CodeProjekt Ventures
              </span>{" "}
              is a legally registered sole proprietorship based in India. We specialize in selling game merchandise and collectibles, including T-shirts, action figures, stickers, and posters inspired by popular gaming franchises. All products are delivered either physically via shipping or digitally via email (where applicable). We are committed to fast service, fair pricing, and transparent policies to ensure a smooth and enjoyable shopping experience.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-4">
              <li>
                <strong>Contact Email:</strong> <span>codeprojekt2025@gmail.com</span>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://codeprojekt.shop"
                  className="text-blue-600 underline text-red-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://codeprojekt.shop
                </a>
              </li>
              <li>
                <strong>Country of Operation:</strong> India
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-400">
              You can reach us for support or business inquiries at:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-2">
              <li>
                <strong>Email:</strong>{" "}
                <span className="text-red-600 hover:underline">codeprojekt2025@gmail.com</span>
              </li>
              <li>
                <strong>Location:</strong> India
              </li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-500">
              Please allow up to 24 hours for a response on working days.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-400">
              <span className="text-red-600 hover:underline">CodeProjekt Ventures</span> provides merchandise on an &quot;as-is&quot; basis. We are not affiliated with or endorsed by any game publishers, developers, or studios. All third-party trademarks, logos, and intellectual property rights remain the property of their respective owners.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-500">
              We are not responsible for any customer dissatisfaction arising from misuse, unauthorized customization, or misrepresentation of products post-delivery.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions (FAQs)</h2>
            <div className="mb-2">
              <p className="font-semibold">Q. How do I receive my purchase?</p>
              <p className="mb-2 text-gray-700 dark:text-gray-400">
                A. Physical merchandise is shipped to your provided delivery address. Digital items (such as posters or stickers in digital form) may be sent via email.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Q. What if I gave the wrong shipping or email address?</p>
              <p className="mb-2 text-gray-700 dark:text-gray-400">
                A. Orders delivered to an incorrect address are non-refundable. Please double-check your details before placing an order.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Q. What payment methods are available?</p>
              <p className="mb-2 text-gray-700 dark:text-gray-400">
                A. We accept UPI, debit/credit cards, and net banking through our secure payment gateway.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Q. Can I get a refund after the item is shipped or delivered?</p>
              <p className="mb-2 text-gray-700 dark:text-gray-400">
                A. No. Refunds are not issued for successfully shipped or delivered merchandise unless the item is damaged or incorrect as per our return policy.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
