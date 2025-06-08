"use client";

import React from "react";

const RefundPolicyPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Refund Policy</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Last updated: June 8, 2025
        </p>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="text-gray-700">
              At <span className="font-semibold">codeprojekt</span>{" "}
              <a
                href="codeprojekt.shop"
                className="text-red-600 hover:underline"
              >
                codeprojekt.shop
              </a>
              , we strive to provide excellent service and ensure a seamless
              experience for all our customers. This refund policy outlines the
              conditions under which refunds are issued and the steps we take to
              prevent misuse or disputes.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Refund Eligibility
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Non-Delivery of Service: If the in-game top-up cannot be
                completed due to technical issues on our end.
              </li>
              <li>
                Incorrect Payment: If the customer mistakenly overpays, and the
                overpaid amount is verified.
              </li>
              <li>
                Failed Delivery: If the top-up fails due to system errors and
                cannot be reprocessed.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Non-Refundable Situations
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Incorrect account details (e.g., user ID, server, or region)
                provided by the customer.
              </li>
              <li>
                Successful delivery of the top-up as per order specifications.
              </li>
              <li>
                Orders cancelled by the customer after processing has started.
              </li>
              <li>
                Situations caused by in-game restrictions or bans unrelated to
                our service.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Chargeback Prevention Measures
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <span className="font-semibold">Order Confirmation:</span>{" "}
                Customers must verify all account details before placing an
                order.
              </li>
              <li>
                <span className="font-semibold">Payment Proof:</span> All
                transactions are logged with time-stamped payment proofs for
                verification.
              </li>
              <li>
                <span className="font-semibold">Delivery Proof:</span>{" "}
                Screenshots or logs of successful top-up delivery are retained
                for dispute resolution.
              </li>
              <li>
                <span className="font-semibold">Customer Communication:</span>{" "}
                In case of issues, customers are required to contact us at{" "}
                <a
                  href="mailto:codeprojekt.dev@gmail.com"
                  className="text-red-600 hover:underline"
                >
                  codeprojekt.dev@gmail.com
                </a>{" "}
                to resolve disputes before initiating a chargeback.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Refund Process</h2>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>
                Refund requests must be submitted within 48 hours of the
                transaction.
              </li>
              <li>
                Customers must provide the following details for a refund
                request:
                <ul className="list-disc list-inside ml-6">
                  <li>Order ID</li>
                  <li>Payment receipt</li>
                  <li>Description of the issue</li>
                </ul>
              </li>
              <li>
                Refunds are processed within 1-7 business days after
                verification.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Dispute Resolution
            </h2>
            <p className="text-gray-700">
              We are committed to resolving any disputes amicably. In case of a
              disagreement:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>
                Customers are encouraged to contact us directly via email at{" "}
                <a
                  href="mailto:codeprojekt.dev@gmail.com"
                  className="text-red-600 hover:underline"
                >
                  codeprojekt.dev@gmail.com
                </a>
                .
              </li>
              <li>
                We will review the issue and provide a detailed explanation,
                including transaction proof, to ensure transparency.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Abuse of Refund Policy
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Immediate termination of services.</li>
              <li>
                Blacklisting of the customer account from future purchases.
              </li>
              <li>
                Reporting the case to payment processors with evidence to
                dispute the chargeback.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions or need assistance with a refund, please
              contact us at{" "}
              <a
                href="mailto:codeprojekt.dev@gmail.com"
                className="text-red-600 hover:underline"
              >
                codeprojekt.dev@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
