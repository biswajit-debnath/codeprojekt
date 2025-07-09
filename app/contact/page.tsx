"use client";

import React from "react";

const ContactPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-10 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-[--navBlack] dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-4xl w-full mx-auto bg-white/90 dark:bg-[--navBlack]/90 shadow-2xl rounded-3xl p-6 md:p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full opacity-30 blur-2xl z-0" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full opacity-30 blur-2xl z-0" />
        
        <div className="relative z-10 space-y-8">
          <section>
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300 text-center font-medium">
              You can reach us for support or business inquiries at the contact details below.
            </p>
            <div className="mx-auto max-w-xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow p-6 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
              <table className="w-full table-fixed">
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 pr-4 font-semibold w-1/3 align-top">Email</td>
                    <td className="py-3 pl-4">
                      <a
                        href="mailto:codeprojekt2025@gmail.com"
                        className="underline hover:text-blue-600"
                      >
                        codeprojekt2025@gmail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 pr-4 font-semibold w-1/3 align-top">Contact No</td>
                    <td className="py-3 pl-4">
                      <a
                        href="tel:7002181825"
                        className="underline hover:text-green-600"
                      >
                        7002181285
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 pr-4 font-semibold w-1/3 align-top">Location</td>
                    <td className="py-3 pl-4">India</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 pr-4 font-semibold w-1/3 align-top">Address</td>
                    <td className="py-3 pl-4">Hengerabari, Sivanagar via Lichubagan, Guwahati, 781036, Assam</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold w-1/3 align-top">Owned and operated by</td>
                    <td className="py-3 pl-4">Pallab Basumatary</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 italic">
              Please allow up to 24 hours for a response on working days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
