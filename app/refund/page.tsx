"use client";

import React from "react";


const RefundPolicyPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 dark:bg-[--navBlack]">
        <h1 className="text-4xl font-bold mb-6 text-center">Return &amp; Refund Policy</h1>
        <p className="text-sm text-gray-600 mb-4 text-center dark:text-gray-500">
          Last updated: July 8, 2025
        </p>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">At CodeProjekt Ventures, customer satisfaction is important to us. Please read our return and refund policy carefully before placing an order.</h2>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Returns</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
              <li>We accept returns only for items that are damaged, defective, or incorrect.</li>
              <li>To be eligible for a return, you must contact us within 48 hours of receiving the item.</li>
              <li>Items must be unused, in their original packaging, and accompanied by clear photo or video evidence of the issue.</li>
              <li>Return shipping costs are the responsibility of the customer unless the error was on our side.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">How to Request a Return</h2>
            <p className="text-gray-700 dark:text-gray-400">Email us at <a href="mailto:codeprojekt2025@gmail.com" className="text-red-600 hover:underline">codeprojekt2025@gmail.com</a> with:</p>
            <ul className="list-disc list-inside ml-6 text-gray-700 dark:text-gray-400">
              <li>Your order number</li>
              <li>Description of the issue</li>
              <li>Photo/video proof of damage or defect</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-400 mt-2">Our support team will review your request within 1–2 business days and guide you through the return process.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Refunds</h2>
            <p className="text-gray-700 dark:text-gray-400">Refunds are only issued for:</p>
            <ul className="list-disc list-inside ml-6 text-gray-700 dark:text-gray-400">
              <li>Damaged or defective items (verified by our team)</li>
              <li>Orders that are canceled before shipment</li>
              <li>Out-of-stock items (if we’re unable to fulfill your order)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-400 mt-2">Once approved, refunds will be processed to your original payment method within 5–7 business days.</p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">No refunds will be issued for:</p>
            <ul className="list-disc list-inside ml-6 text-gray-700 dark:text-gray-400">
              <li>Buyer’s remorse or change of mind</li>
              <li>Orders with incorrect shipping details provided by the customer</li>
              <li>Successfully delivered items with no verified damage or defect</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Exchanges</h2>
            <p className="text-gray-700 dark:text-gray-400">We do not offer exchanges at this time. If you received the wrong item or a defective product, please follow the return process above and place a new order once your return is approved.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-400">If you have any questions regarding this policy, feel free to contact us at <a href="mailto:codeprojekt2025@gmail.com" className="text-red-600 hover:underline">codeprojekt2025@gmail.com</a>. We&apos;re here to help!</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
