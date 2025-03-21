import {
  useState,
  useEffect,
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";
import { useStorageState } from "./useStorageState";
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext<{
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  signOut: () => Promise<{ success?: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string,
    username: string,
    profileUrl: string | null
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  session?: string | null;
  isLoading: boolean;
  user: DocumentData | null;
  setUser: (user: DocumentData | null) => void;
  isAuthenticated: boolean | undefined;
}>({
  signIn: () => Promise.resolve({ success: false, data: null, error: "Error" }),
  signOut: () => Promise.resolve({ success: false, error: "Error" }),
  signUp: () => Promise.resolve({ success: false, data: null, error: "Error" }),
  session: null,
  isLoading: false,
  user: null,
  setUser: () => {},
  isAuthenticated: undefined,
});

// Hook to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState<DocumentData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        updateUserData(newUser.uid);
        setUser(newUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);

  const updateUserData = async (userId: string) => {
    try {
      const refDoc = doc(db, "users", userId);
      const docSnapshot = await getDoc(refDoc);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setUser({
          username: data.username,
          profileUrl: data.profileUrl,
          userId: data.userId,
        });
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          try {
            const response = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );

            if (session !== response.user.uid) {
              setSession(response.user.uid);
            }
            return { success: true, data: response.user };
          } catch (error: unknown) {
            let errorMsg: string;
            if (error instanceof Error) {
              errorMsg = error.message;
            } else {
              errorMsg = String(error);
            }
            if (errorMsg.includes("auth/invalid-email")) {
              return { success: false, error: "Invalid email" };
            }
            if (errorMsg.includes("auth/invalid-credential")) {
              return { success: false, error: "Wrong email or password" };
            }
            if (errorMsg.includes("auth/too-many-requests")) {
              return {
                success: false,
                error:
                  "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
              };
            }
            if (errorMsg.includes("auth/email-already-in-use")) {
              return { success: false, error: "This mail is already in use" };
            }
            return { success: false, error: errorMsg };
          }
        },
        signOut: async () => {
          try {
            await signOut(auth);
            if (session !== null) {
              setSession(null);
            }
            return { success: true };
          } catch (error: unknown) {
            let errorMsg: string;
            if (error instanceof Error) {
              errorMsg = error.message;
            } else {
              errorMsg = String(error);
            }
            return { success: false, error: errorMsg };
          }
        },
        signUp: async (email, password, username, profileUrl) => {
          try {
            const response = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

            await setDoc(doc(db, "users", response?.user?.uid), {
              username: username,
              profileUrl: profileUrl,
              userId: response?.user?.uid,
            });

            if (session !== response.user.uid) {
              setSession(response.user.uid);
            }
            return { success: true, data: response.user };
          } catch (error: unknown) {
            let errorMsg: string;
            if (error instanceof Error) {
              errorMsg = error.message;
            } else {
              errorMsg = String(error);
            }
            if (errorMsg.includes("auth/invalid-email")) {
              return { success: false, error: "Invalid email" };
            }
            if (errorMsg.includes("auth/invalid-credential")) {
              return { success: false, error: "Wrong email or password" };
            }
            if (errorMsg.includes("auth/too-many-requests")) {
              return {
                success: false,
                error:
                  "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
              };
            }
            if (errorMsg.includes("auth/email-already-in-use")) {
              return { success: false, error: "This email is already in use" };
            }
            return { success: false, error: errorMsg };
          }
        },
        user,
        setUser,
        isAuthenticated,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
