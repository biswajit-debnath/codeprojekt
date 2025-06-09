import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../../_styles/animations";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BackendApiClient } from "../../_lib/services/backendApiClient";

const GoogleSignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      const googleUserInfo = await signInWithPopup(auth, provider);

      // Call backend signinUser API
      const res = await BackendApiClient.getInstance().signinUser(
        googleUserInfo
      );
      // TODO save the user profile in the state
      console.log("Google sign-in successful:", res);

      router.push("/");
    } catch (error: unknown) {
      let errorMessage = "Failed to sign in with Google";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        errorMessage = (error as { message: string }).message;
      }
      setError(errorMessage);
      console.error("Google sign-in error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div
        className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)] px-4 sm:px-5 md:px-16 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.main
          className="flex flex-1 max-w-[1550px] mx-auto w-full"
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate="show"
        >
          {/* Left side with Image - Visible only on md+ screens */}
          <motion.div
            className="hidden md:block w-[450px] relative overflow-hidden"
            variants={slideIn("right", 0.3)}
          >
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-full w-full"
            >
              <Image
                src="/hero-image.png"
                alt="Game Character"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-4/6 pt-0 px-4 sm:px-8 md:px-12 flex items-start justify-between relative"
            variants={fadeIn("left", 0.4)}
          >
            <div className="w-full max-w-3xl md:pr-14">
              <motion.div
                className="block md:hidden w-full mb-8"
                variants={fadeIn("up", 0.2)}
              >
                <div className="relative w-full h-48">
                  <Image
                    src="/hero-image.png"
                    alt="Game Character"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    priority
                  />
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col mb-4 md:mb-6"
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                animate="show"
              ></motion.div>
              <motion.div>
                <motion.h2
                  className="text-3xl sm:text-4xl font-bold tracking-wider uppercase leading-none mb-0 font-['The-Last-Shuriken']"
                  variants={fadeIn("down", 0.1)}
                >
                  QUICK LOG IN
                </motion.h2>
                <motion.p
                  className="text-gray-600 text-sm sm:text-md -mt-1 leading-tight"
                  variants={fadeIn("down", 0.2)}
                >
                  Use your Google account to sign in instantly
                </motion.p>
              </motion.div>
              <motion.div
                className="flex justify-center items-center py-12"
                variants={fadeIn("up", 0.6)}
              >
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Image
                    src="/google-icon.svg"
                    alt="Google"
                    width={28}
                    height={28}
                    className="bg-white rounded-full"
                  />
                  Sign in with Google
                </button>
              </motion.div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <motion.div
              className="hidden sm:block pt-10 z-10 pointer-events-none absolute right-4 sm:right-10 top-0"
              variants={fadeIn("left", 0.7)}
              initial="hidden"
              animate="show"
            >
              <div className="relative">
                <motion.div
                  className="transform origin-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/logo-imageV4.png"
                    alt="CODE PROJEKT"
                    width={150}
                    height={70}
                    className="p-3 rounded rotate-90"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.main>
      </motion.div>
    </div>
  );
};

export default GoogleSignIn;
