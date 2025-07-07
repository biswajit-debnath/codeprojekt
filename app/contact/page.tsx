"use client";

import React from "react";

const ContactPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 dark:bg-[--navBlack]">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <div className="space-y-6">
          <section>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-4">
              <li>
                <strong>Contact Email:</strong> codeprojekt2025@gmail.com
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://codeprojekt.shop"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.codeprojekt.shop
                </a>
              </li>
              <li>
                <strong>Country of Operation:</strong> India
              </li>
            </ul>
          </section>
          <section>
            <p className="mb-2 text-gray-700 dark:text-gray-400">
              You can reach us for support or business inquiries at:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-2">
              <li>
                <strong>Email:</strong> codeprojekt2025@gmail.com
              </li>
              <li>
                <strong>Location:</strong> India
              </li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-500">
              Please allow up to 24 hours for a response on working days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
