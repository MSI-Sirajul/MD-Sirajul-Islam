
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import { toast } from "sonner";

interface AuthPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthPopup = ({ isOpen, onOpenChange }: AuthPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Admin Login
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-2 pb-4">
          <LoginForm onSuccess={() => {
            onOpenChange(false);
            toast("Login successful", {
              description: "Welcome back, admin!",
            });
          }} />
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            Only authorized administrators can access this site.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPopup;
