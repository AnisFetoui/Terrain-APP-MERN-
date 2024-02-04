import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();
  
    if (!response.ok) {
      throw new Error(responseBody.message);
    } 
  };
  export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      if (typeof body.message === "object" && body.message.length > 0) {
        const firstErrorMessage = body.message[0].msg;
        throw new Error(`Login failed: ${firstErrorMessage}`);
      } else {
        const errorMessage = typeof body.message === "object" ? JSON.stringify(body.message) : body.message;
        throw new Error(`Login failed: ${errorMessage}`);
      }
    }
    return body;
  };
  
  export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Token expired or invalid");
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }
  
    return response.json();
  };
  
  export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };