import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState('')

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}