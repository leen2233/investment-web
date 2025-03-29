import { AuthProvider } from "@/contexts/auth-context";
import { BrowserRouter } from "react-router-dom";

export function Providers({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}
