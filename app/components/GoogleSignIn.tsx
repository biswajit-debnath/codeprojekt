import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const GoogleSignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: unknown) {
      let errorMessage = 'Failed to sign in with Google';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message: unknown }).message === 'string') {
         errorMessage = (error as { message: string }).message;
      }
      setError(errorMessage);
      console.error('Google sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex items-center gap-2 text-md text-gray-600 hover:text-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image src="/google-icon.png" alt="Google" width={20} height={20} className="w-5 h-5" />
        {loading ? 'Signing in...' : 'quick log in - google'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default GoogleSignIn; 