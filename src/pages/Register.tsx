import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
      navigate("/chat"); // Redirect after successful login
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Register to MyChatApp</h1>
        <Button variant="outline" onClick={handleGoogleRegister} className="w-full">
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default Register;
