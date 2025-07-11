"use client";

import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 dark:bg-[--navBlack]">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-4 text-center dark:text-gray-500">
          Last updated: June 4, 2025
        </p>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
              <li>Name</li>
              <li>Email address</li>
              <li>Payment information</li>
              <li>Device and browser information</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
              <li>To fulfill your orders</li>
              <li>To improve website performance</li>
              <li>To communicate with you regarding support or promotions</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Payment Information</h2>
            <p className="text-gray-700 dark:text-gray-400">
              We do not store any card or UPI information. All payments are processed securely via third-party providers.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-400">
              We take reasonable steps to protect your data but cannot guarantee 100% security.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Third-party Services</h2>
            <p className="text-gray-700 dark:text-gray-400">
              Our site may link to third-party sites. We are not responsible for their privacy practices.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Changes</h2>
            <p className="text-gray-700 dark:text-gray-400">
              We may update this policy from time to time. Changes will be posted on this page.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-400">
              If you have questions, email us at <a href="mailto:codeprojekt2025@gmail.com" className="text-red-600 hover:underline">codeprojekt2025@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;