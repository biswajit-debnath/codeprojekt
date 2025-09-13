"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface TransactionCardProps {
  transaction: {
    transactionId?: string;
    spuId?: string;
    playerDetails?: {
      userid?: string;
      zoneid?: string;
    };
    orderDetails?: {
      price?: string | number;
      message?: string;
    };
  };
  index: number;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, index }) => {
  const router = useRouter();

  const handleTransactionClick = () => {
    console.log("Transaction clicked:", transaction);
    
    // Navigate to transaction status page with transactionId parameter
    if (transaction.transactionId) {
      router.push(`/transaction-status?transactionId=${transaction.transactionId}`);
    } else {
      console.warn("No transactionId found for this transaction:", transaction);
      // Optionally show a toast or alert to the user
      alert("Transaction ID not available for this transaction");
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-2 cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200"
      whileHover={{ 
        scale: 1.02,
        backgroundColor: "rgba(55, 65, 81, 0.8)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleTransactionClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div>
        <p className="font-semibold">
          SPUID:{" "}
          <span className="text-white">
            {transaction.spuId || "-"}
          </span>
        </p>
        <p className="text-gray-400 text-sm">
          UserID:{" "}
          <span className="text-white">
            {transaction.playerDetails?.userid || "-"}
          </span>
          {" | "}
          ZoneID:{" "}
          <span className="text-white">
            {transaction.playerDetails?.zoneid || "-"}
          </span>
        </p>
        {transaction.transactionId && (
          <p className="text-gray-400 text-xs mt-1">
            Transaction ID:{" "}
            <span className="text-white font-mono">
              {transaction.transactionId}
            </span>
          </p>
        )}
      </div>
      <div className="text-right mt-2 md:mt-0">
        <p className="text-lg text-white">
          Price:{" "}
          <span className="font-semibold">
            {transaction.orderDetails?.price || "-"}
          </span>
        </p>
        <p className="text-gray-400 text-sm">
          Status:{" "}
          <span className="text-white">
            {transaction.orderDetails?.message || "-"}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default TransactionCard;