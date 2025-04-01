
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { toast } from "sonner";

export type AuthMode = "login" | "signup";

interface AuthPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthPopup = ({ isOpen, onOpenChange }: AuthPopupProps) => {
  const [mode, setMode] = useState<AuthMode>("login");
  
  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2 pb-4">
          {mode === "login" ? (
            <LoginForm onSuccess={() => {
              onOpenChange(false);
              toast("Login successful", {
                description: "Welcome back!",
              });
            }} />
          ) : (
            <SignupForm onSuccess={() => {
              setMode("login");
              toast("Account created", {
                description: "Please login with your new account",
              });
            }} />
          )}
          
          <div className="text-center">
            <Button variant="link" onClick={toggleMode}>
              {mode === "login" 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Log in"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPopup;
