"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { subscribeToTransaction, unsubscribeFromTransaction } from "../_lib/utils/socketClient";
import { BackendApiClient } from "../_lib/services/backendApiClient";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../_styles/animations";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// WhatsApp Support Configuration
const WHATSAPP_SUPPORT_NUMBER = "919863073368"; //jerome
//const WHATSAPP_SUPPORT_NUMBER = "917002181285"; //pallab
const WHATSAPP_MESSAGE_TEMPLATE = "Hi, I need support with my transaction. Transaction ID: {transactionId}";

const TransactionStatusContent = () => {
  const [currentStage, setCurrentStage] = useState(1); // Start at stage 1
  const [isFailed, setIsFailed] = useState(false); // Track if current stage failed
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<any>(null); // Track authenticated user
  const [authLoading, setAuthLoading] = useState(true); // Track auth loading state
  const [category, setCategory] = useState<string | null>(null);
  const [spu, setspu] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  // Get transaction ID from URL parameters
  const transactionId = searchParams.get('transactionId') || searchParams.get('id') || "";

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser);
      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // API integration: fetch transaction status and update stage
  useEffect(() => {
    // Wait for auth to be determined and ensure we have a transaction ID
    if (authLoading) return;
    
    if (!transactionId) {
      setError("No transaction ID found in URL");
      setIsLoading(false);
      return;
    }

    const fetchStatus = async () => {
      try {
        setIsLoading(true);

        // Get the Firebase ID token if user is authenticated
        let idToken = undefined;
        if (user) {
          try {
            idToken = await user.getIdToken();
            console.log("Successfully got Firebase ID token");
          } catch (tokenError) {
            console.error("Failed to get Firebase ID token:", tokenError);
            setError("Failed to get authentication token. Please sign in again.");
            setIsLoading(false);
            return;
          }
        } else {
          console.log("No authenticated user, proceeding without auth token");
        }
        
        const data = await BackendApiClient.getInstance().getTransactionStatus(transactionId, idToken);
        if (typeof data.stage === "number" && data.stage >= 1 && data.stage <= 4) {
          setCurrentStage(data.stage);
          setIsFailed(data.isFailed || false);
          setAmount(data.price_inr|| null);
          setCategory(data.spuDetails?.category || null);
          setspu(data.spuDetails?.spu || null);
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
    const handleTransactionUpdate = (payload: { transactionId: string; stage: number; isFailed?: boolean }) => {
      if (payload.transactionId === transactionId && typeof payload.stage === "number") {
        setCurrentStage(payload.stage);
        setIsFailed(payload.isFailed || false);
      }
    };

    subscribeToTransaction(transactionId, handleTransactionUpdate);

    return () => {
      unsubscribeFromTransaction(transactionId);
    };
  }, [transactionId, user, authLoading]); // Add dependencies

  // Copy to clipboard function
  const copyToClipboard = async () => {
    if (!transactionId) return;
    
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopied(true);
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = transactionId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    if (stageId === currentStage && isFailed) return "failed";
    if (stageId === currentStage) return "current";
    return "pending";
  };

  const StageIcon = ({ status }: { status: string }) => {
    if (status === "completed") {
      return (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-3 h-3 sm:w-5 sm:h-5 text-white"
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

    if (status === "failed") {
      return (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-3 h-3 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      );
    }

    if (status === "current") {
      return (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      );
    }

    return (
      <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
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

  // WhatsApp support function
  const handleWhatsAppSupport = () => {
    if (!transactionId) return;
    
    // Replace placeholder with actual transaction ID
    const message = WHATSAPP_MESSAGE_TEMPLATE.replace('{transactionId}', transactionId);
    
    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Use wa.me for mobile, web.whatsapp.com for desktop
    const whatsappUrl = isMobile 
      ? `https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${WHATSAPP_SUPPORT_NUMBER}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      
      <motion.main
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl"
      >
        {/* Continue Shopping Button */}
        <motion.div
          className="mb-6"
          variants={fadeIn("down", 0.1)}
        >
          <Link
            href="/packs"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Continue Shopping
          </Link>
        </motion.div>

        {/* Authentication Loading State */}
        {authLoading && (
          <motion.div
            variants={fadeIn("up", 0.1)}
            className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-8"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div>
                <h3 className="text-yellow-800 font-medium text-sm sm:text-base">Authenticating</h3>
                <p className="text-yellow-600 text-xs sm:text-sm">Checking authentication status...</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            variants={fadeIn("up", 0.1)}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-8"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-red-800 dark:text-red-400 font-medium text-sm sm:text-base">Error</h3>
                <p className="text-red-600 dark:text-red-300 text-xs sm:text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && !error && !authLoading && (
          <motion.div
            variants={fadeIn("up", 0.1)}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-8"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div>
                <h3 className="text-blue-800 dark:text-blue-400 font-medium text-sm sm:text-base">Loading</h3>
                <p className="text-blue-600 dark:text-blue-300 text-xs sm:text-sm">Fetching transaction status...</p>
              </div>
            </div>
          </motion.div>
        )}
        {/* Transaction Header */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8 border dark:border-gray-700"
        >
          <div className="flex items-start sm:items-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
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
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white leading-tight">
                Bought {category} of {spu}
              </h1>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 border dark:border-gray-700">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Transaction Id</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={copyToClipboard}
                  className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors relative group"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                    </svg>
                  )}
                </button>
                {copied && (
                  <span className="text-xs text-green-600 font-medium">Copied!</span>
                )}
              </div>
            </div>
            <div className="font-mono text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded border dark:border-gray-600 break-all overflow-hidden">
              {transactionId || "No transaction ID provided"}
            </div>
            
            <div className="flex items-center justify-between mt-3 sm:mt-4 text-sm sm:text-base text-gray-900 dark:text-white">
              <div className="flex items-center">
                ₹ Amount = {amount !== null ? amount : "N/A"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border dark:border-gray-700"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-6 sm:mb-8">Transaction Progress</h2>
          
          {/* Progress Bar */}
          <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div className="flex flex-row sm:flex-col items-center sm:items-center w-full sm:w-auto">
                  {/* Mobile: horizontal layout */}
                  <div className="flex items-center sm:flex-col sm:items-center w-full sm:w-auto">
                    <StageIcon status={getStageStatus(stage.id)} />
                    <div className="ml-3 sm:ml-0 sm:mt-3 text-left sm:text-center flex-1 sm:flex-none">
                      <div className={`text-sm font-medium ${
                        getStageStatus(stage.id) === "completed" 
                          ? "text-green-600 dark:text-green-400" 
                          : getStageStatus(stage.id) === "failed"
                          ? "text-red-600 dark:text-red-400"
                          : getStageStatus(stage.id) === "current"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {getStageStatus(stage.id) === "failed" ? "Failed" : stage.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:max-w-24">
                        {stage.description}
                      </div>
                    </div>
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <div className="hidden sm:block">
                    <ProgressLine isCompleted={stage.id < currentStage} />
                  </div>
                )}
                {index < stages.length - 1 && (
                  <div className="block sm:hidden w-full">
                    <div className="h-4 flex items-center">
                      <div className={`w-full h-1 rounded-full transition-all duration-500 ${
                        stage.id < currentStage ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                      }`}></div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Current Stage Details */}
          <div className={`rounded-lg p-4 sm:p-6 ${isFailed ? 'bg-red-50 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
            <div className="flex items-center">
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                isFailed ? 'bg-red-500' : 'bg-blue-500'
              }`}>
                {isFailed ? (
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-medium text-sm sm:text-base ${
                  isFailed ? 'text-red-900 dark:text-red-200' : 'text-blue-900 dark:text-blue-200'
                }`}>
                  {isFailed ? "Failed" : stages[currentStage - 1]?.title}
                </h3>
                <p className={`text-xs sm:text-sm ${
                  isFailed ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'
                }`}>
                  {isFailed 
                    ? `Transaction failed at ${stages[currentStage - 1]?.title}` 
                    : `${stages[currentStage - 1]?.description}...`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Demo Controls */}
          {/* <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Demo Controls (for development):</p>
            <div className="flex flex-wrap gap-2">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setCurrentStage(stage.id)}
                  className={`px-2 sm:px-3 py-1 text-xs rounded transition-colors ${
                    currentStage === stage.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Stage {stage.id}
                </button>
              ))}
            </div>
          </div> */}
        </motion.div>
        {/* WhatsApp Support Button */}
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
          <button
              onClick={handleWhatsAppSupport}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <svg 
                className="w-4 h-4" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Support
          </button>
        </div>
      </motion.main>
    </div>
  );
};

// Outer wrapper with Suspense
export default function TransactionStatusPage() {
  return (
    <Suspense fallback={<div className="text-gray-600 dark:text-gray-400">Loading transaction page...</div>}>
      <TransactionStatusContent />
    </Suspense>
  );
}