
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/sonner";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileButtonProps {
  userId: string;
}

const ProfileButton = ({ userId }: ProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast("Sign out failed", {
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast("Signed out", {
      description: "You have been signed out successfully.",
    });
    
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-primary/10 transition-all"
          aria-label="Profile" 
        >
          {isLoading || !profile ? (
            <User className="h-5 w-5" />
          ) : (
            <Avatar className="h-8 w-8 border border-border">
              <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-lg">{profile?.name || "User"}</h4>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Username</p>
                <p className="font-medium">{profile?.username || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium truncate">{profile?.email || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{profile?.phone_number || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-muted-foreground">Sign-up Method</p>
                <p className="font-medium capitalize">{profile?.signup_method || "manual"}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="destructive" 
              onClick={handleSignOut} 
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileButton;
