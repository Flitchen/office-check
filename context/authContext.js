import { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        checkUserRole(user?.uid);
        updateUserData(user?.uid);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "employees", userId);
    const docSnaphot = await getDoc(docRef);

    if (docSnaphot.exists()) {
      let data = docSnaphot.data();
      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phone: data.phone,
        role: data.role,
        uid: data.uid,
        email: data.email,
      });
    }
  };

  const checkUserRole = async (userId) => {
    const docRef = doc(db, "employees", userId);
    const docSnaphot = await getDoc(docRef);

    if (docSnaphot.exists()) {
      let data = docSnaphot.data();
      let role = data.role;
      if (role == "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      return role;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log("response: ", response);
      const role = await checkUserRole(response.user.uid);
      // console.log("role: ", role);

      return { success: true, role };
    } catch (error) {
      // console.log(error);
      let msg = error.message;

      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email or password";
      }

      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Invalid email or password";
      }
      if (msg.includes("(auth/network-request-failed)")) {
        msg = "Network error";
      }
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      // console.log(error);
      return { success: false, msg: error.message };
    }
  };

  const signup = async (email, phone, firstName, lastName, gender, role) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, phone);
      // console.log("user response: ", response?.user);

      await setDoc(doc(db, "employees", response?.user?.uid), {
        firstName,
        lastName,
        gender,
        phone,
        role,
        uid: response?.user?.uid,
        email: response?.user?.email,
      });
      return { success: true, data: response?.user };
    } catch (error) {
      // console.log(error.message);
      let msg = error.message;
      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "Email is already in use";
      }
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email";
      }
      if (msg.includes("(auth/weak-password)")) {
        msg = "Password is too weak";
      }
      if (msg.includes("(auth/network-request-failed)")) {
        msg = "Network error";
      }
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        signup,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped in AuthContextProvider");
  }
  return value;
};
