import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    username: string;
}

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    register: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Persist session
    useEffect(() => {
        const savedSession = sessionStorage.getItem('active_session');
        if (savedSession) {
            try {
                setCurrentUser(JSON.parse(savedSession));
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                await res.json(); // Consume body
                const sessionUser = { id: 'admin-id', username }; // Mock ID for now
                setCurrentUser(sessionUser);
                sessionStorage.setItem('active_session', JSON.stringify(sessionUser));
                return true;
            }
        } catch (e) {
            console.error("Login failed", e);
        }
        return false;
    };

    const register = async (username: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                await res.json();
                // Auto login after register
                return login(username, password);
            }
        } catch (e) {
            console.error("Registration failed", e);
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('active_session');
    };

    return (
        <AuthContext.Provider value={{
            currentUser,
            isAuthenticated: !!currentUser,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
