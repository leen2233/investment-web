import { api, authService } from "@/lib/axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasValidReferral, setHasValidReferral] = useState(false);
  const [referrerId, setReferrerId] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Replaces useRouter
  const { pathname } = useLocation(); // Replaces usePathname
  const [searchParams] = useSearchParams(); // Replaces useSearchParams

  // Check for token and user in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token) {
      checkAuth();
    }

    setIsLoading(false);
  }, []);

  // Check for referral code in URL
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setHasValidReferral(true);
      setReferrerId(ref);
      localStorage.setItem("referrerId", ref);
    } else {
      const storedReferrerId = localStorage.getItem("referrerId");
      if (storedReferrerId) {
        setHasValidReferral(true);
        setReferrerId(storedReferrerId);
      }
    }
  }, [searchParams]);

  // Handle routing based on authentication state
  useEffect(() => {
    if (isLoading) return;

    const publicRoutes = ["/register", "/login", "/error", "/"];
    const isPublicRoute = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!user && !isPublicRoute) {
      navigate("/login"); // Replaces router.push
    } else if (user && (pathname === "/register" || pathname === "/login")) {
      navigate("/"); // Replaces router.push
    }
  }, [user, isLoading, pathname, navigate]);

  const register = async (username, password, referralCode) => {
    try {
      const response = await api.post("/users/sign-up/", {
        username,
        password,
        referral: referralCode,
      });
      if (!response.data.error) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate("/"); // Replaces router.push
      }
      return response.data;
    } catch (error) {
      return {
        error: error.response?.data || {
          non_field_errors: ["An unexpected error occurred"],
        },
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // Replaces router.push
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const userData = await authService.getCurrentUser();
      console.log(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        logout,
        isAuthenticated: !!user,
        hasValidReferral,
        referrerId,
        error,
        register,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
