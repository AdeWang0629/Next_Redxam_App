import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateEmail,
  reauthenticateWithCredential,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [reauthModalOpen, setReauthModalOpen] = useState(false);

  // function signup(email, password) {
  //   return auth.createUserWithEmailAndPassword(email, password);
  // }
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // function login(email, password) {
  //   return auth.signInWithEmailAndPassword(email, password);
  // }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  function logout() {
    return auth.signOut();
  }

  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email);
  // }
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const verifyEmail = (currentUser) => {
    return sendEmailVerification(auth.currentUser);
  };

  const reauth = (credential) => {
    return reauthenticateWithCredential(auth.currentUser, credential);
  };

  function updatesEmail(email) {
    return updateEmail(currentUser, email)
      .then(() => {
        console.log("Email updated!");
      })
      .catch((error) => {
        console.log(error);
        console.log(email);
        if (error.message.includes("requires-recent-login")) {
          setReauthModalOpen(true);
          console.log("modal");
        }
      });
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatesEmail,
    updatePassword,
    verifyEmail,
    reauth,
    reauthModalOpen,
    setReauthModalOpen,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
