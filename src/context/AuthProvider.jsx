import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./auth-context";

const TOKEN_KEY = "accessToken";

export default function AuthProvider({ children }) {

  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY)
  );

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const initialized = useRef(false);

  function login(nextToken, nextUser) {

    localStorage.setItem(TOKEN_KEY, nextToken);

    setToken(nextToken);
    setUser(nextUser);

    setLoading(false);
  }

  function logout() {

    localStorage.removeItem(TOKEN_KEY);

    setToken(null);
    setUser(null);

    window.location.href = "/";
  }

  useEffect(() => {

    if (initialized.current) return;
    initialized.current = true;

    async function initAuth() {

      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {

        const res = await fetch(
          "http://localhost:8080/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          }
        );

        const data = await res.json();

        if (data.success) {
          setUser(data.data);
        } else {
          logout();
        }

      } catch {

        logout();

      } finally {

        setLoading(false);

      }
    }

    initAuth();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}