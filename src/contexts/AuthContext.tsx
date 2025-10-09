import React, { createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from  "@react-native-async-storage/async-storage";
import { signIn as signInService, signUp as signUpService, signOut as signOutService } from "~/store/AuthStore";

interface User {
    name: string;
    email: string;
    password: string;
}

interface AuthContextProps {
    setUser: React.Dispatch<React.SetStateAction<User | null | string>>;
    user: User | null | string;
    isAuthenticated: boolean;
    signIn: (email:string, password: string) => Promise<void>;
    signUp: (name:string, email:string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children } : { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null | string>(null);

    useEffect(() => {
        (async () => {
            const stored = await AsyncStorage.getItem("@app:Logged");
            if(stored) setUser(stored);
        })();
    }, []);

    async function signIn(email:string, password:string) {
        const loggedUser = await signInService(email, password);
        setUser(loggedUser);
    }

    async function signUp(name:string, email:string, password:string) {
        const loggedUser = await signUpService(name, email, password);
        setUser(loggedUser);
    }

    async function signOut() {
        await signOutService();
        setUser(null);
    }

    return(
       <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                signIn,
                signUp,
                signOut,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  return useContext(AuthContext);
}