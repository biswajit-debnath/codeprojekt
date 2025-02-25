// 'use client'; // This directive is necessary for using hooks like useState and useEffect

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../firebaseConfig'; // Import your Firebase configuration
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged,
// } from 'firebase/auth';

// // Define the shape of the Auth context
// interface AuthContextType {
//     user: any; // Replace with a proper user type if available
//     signup: (email: string, password: string) => Promise<void>;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => Promise<void>;
// }

// // Create the Auth context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Create the AuthProvider component
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<any>(null); // Replace with a proper user type if available

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setUser(user);
//         });
//         return () => unsubscribe();
//     }, []);

//     const signup = async (email: string, password: string) => {
//         await createUserWithEmailAndPassword(auth, email, password);
//     };

//     const login = async (email: string, password: string) => {
//         await signInWithEmailAndPassword(auth, email, password);
//     };

//     const logout = async () => {
//         await signOut(auth);
//     };

//     return (
//         <AuthContext.Provider value={{ user, signup, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the Auth context
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };
