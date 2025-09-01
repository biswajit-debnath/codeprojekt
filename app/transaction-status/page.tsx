"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { subscribeToTransaction, unsubscribeFromTransaction } from "../_lib/utils/socketClient";
import { BackendApiClient } from "../_lib/services/backendApiClient";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../_styles/animations";

const TransactionStatusPage = () => {
  const [currentStage, setCurrentStage] = useState(1); // Start at stage 1
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  
  // Get transaction ID from URL parameters
  const transactionId = searchParams.get('transactionId') || searchParams.get('id') || "";

  // API integration: fetch transaction status and update stage
  useEffect(() => {
    // Only proceed if we have a transaction ID
    if (!transactionId) {
      setError("No transaction ID found in URL");
      setIsLoading(false);
      return;
    }

    // API polling using backendApiClient
    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        const data = await BackendApiClient.getInstance().getTransactionStatus(transactionId);
        if (typeof data.stage === "number" && data.stage >= 1 && data.stage <= 4) {
          setCurrentStage(data.stage);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch transaction status:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch transaction status");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatus();

    // Socket integration - subscribe to transaction room
    const handleTransactionUpdate = (payload: { transactionId: string; stage: number }) => {
      if (payload.transactionId === transactionId && typeof payload.stage === "number") {
        setCurrentStage(payload.stage);
      }
    };

    subscribeToTransaction(transactionId, handleTransactionUpdate);

    return () => {
      unsubscribeFromTransaction(transactionId);
    };
  }, [transactionId]);

  const stages = [
    {
      id: 1,
      title: "Transaction Processing",
      description: "Initializing your transaction",
    },
    {
      id: 2,
      title: "Payment Processing",
      description: "Processing your payment",
    },
    {
      id: 3,
      title: "Vendor Processing",
      description: "Fulfilling your order",
    },
    {
      id: 4,
      title: "Success",
      description: "Transaction completed successfully",
    },
  ];

  const getStageStatus = (stageId: number) => {
    if (stageId < currentStage) return "completed";
    if (stageId === currentStage) return "current";
    return "pending";
  };

  const StageIcon = ({ status }: { status: string }) => {
    if (status === "completed") {
      return (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    }

    if (status === "current") {
      return (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      );
    }

    return (
      <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
      </div>
    );
  };

  const ProgressLine = ({ isCompleted }: { isCompleted: boolean }) => (
    <div className="flex-1 h-1 mx-4">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          isCompleted ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      <motion.main
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        {/* Error State */}
        {error && (
          <motion.div
            variants={fadeIn("up", 0.1)}
            className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <motion.div
            variants={fadeIn("up", 0.1)}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div>
                <h3 className="text-blue-800 font-medium">Loading</h3>
                <p className="text-blue-600 text-sm">Fetching transaction status...</p>
              </div>
            </div>
          </motion.div>
        )}
        {/* Transaction Header */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Bought Bonus Pack of 78 + 8 Diamonds
              </h1>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Transaction Id</span>
              <div className="flex space-x-2">
                <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="font-mono text-sm bg-white p-3 rounded border break-all">
              {transactionId || "No transaction ID provided"}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-md text-gray-900">
              <div className="flex items-center">
                ₹ Amount = 96.88
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-8">Transaction Progress</h2>
          
          {/* Progress Bar */}
          <div className="flex items-center mb-8">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center">
                  <StageIcon status={getStageStatus(stage.id)} />
                  <div className="mt-3 text-center">
                    <div className={`text-sm font-medium ${
                      getStageStatus(stage.id) === "completed" 
                        ? "text-green-600" 
                        : getStageStatus(stage.id) === "current"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}>
                      {stage.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 max-w-24">
                      {stage.description}
                    </div>
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <ProgressLine isCompleted={stage.id < currentStage} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Current Stage Details */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-medium text-blue-900">
                  {stages[currentStage - 1]?.title}
                </h3>
                <p className="text-blue-700 text-sm">
                  {stages[currentStage - 1]?.description}...
                </p>
              </div>
            </div>
          </div>

          {/* Demo Controls */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Demo Controls (for development):</p>
            <div className="flex space-x-2">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setCurrentStage(stage.id)}
                  className={`px-3 py-1 text-xs rounded ${
                    currentStage === stage.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Stage {stage.id}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default TransactionStatusPage;
