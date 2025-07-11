"use client";

import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 dark:bg-[--navBlack]">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-600 mb-4 text-center dark:text-gray-500">
          Last updated: July 8, 2025
        </p>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">
             Terms of Service
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
              <li>
                By using <a href="https://codeprojekt.shop" className="text-red-600 hover:underline">https://codeprojekt.shop</a>, you agree to the following:
              </li>
              <li>
                You must be 18 years or older, or have parental consent to make purchases.
              </li>
              <li>
                We sell physical merchandise such as t-shirts and figurines.
              </li>
              <li>
                All products are for personal use only. Reselling without written permission is not allowed.
              </li>
              <li>
                Once an order is processed and confirmed, it cannot be reversed or refunded except as required by law or as described in our refund policy.
              </li>
              <li>
                We reserve the right to cancel or deny orders in case of fraud, abuse, or system misuse.
              </li>
              <li>
                You are responsible for providing accurate shipping information. We are not liable for losses due to incorrect details provided by you.
              </li>
              <li>
                Use of this website signifies your acceptance of these terms and all related policies.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Shipping Policy</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
              <li>We ship physical merchandise such as t-shirts and figurines to the shipping address provided at checkout.</li>
              <li>Orders are typically processed within 1-3 business days after payment confirmation.</li>
              <li>Shipping times vary by location, but most orders are delivered within 5 to 10 working days after dispatch.</li>
              <li>You will receive a tracking number via email once your order has shipped.</li>
              <li>Please ensure your shipping address is correct before placing an order. We are not responsible for delays or losses due to incorrect address information.</li>
              <li>If your order is lost or damaged in transit, please contact our support team at <a href="mailto:codeprojekt2025@gmail.com" className="text-red-600 hover:underline">codeprojekt2025@gmail.com</a> within 7 days of the expected delivery date.</li>
              <li>We do not ship to P.O. boxes or restricted locations.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
