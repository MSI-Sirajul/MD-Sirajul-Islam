
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LogIn, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthPopup from "./AuthPopup";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileButtonProps {
  userId?: string;
}

interface ProfileData {
  id: string;
  name: string;
  username: string | null;
  email?: string;
  phone_number: string | null;
  signup_method: string;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
}

const ProfileButton = ({ userId }: ProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const { user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) {
        // If we have a user but no userId (which might happen during login transitions)
        // Return a default admin profile for the hardcoded admin
        if (user?.email === "admin@sirajul.com") {
          return {
            id: user.id,
            name: "MD Sirajul Islam",
            username: "admin",
            email: "admin@sirajul.com",
            phone_number: "+880 1629-744516",
            signup_method: "manual",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            avatar_url: "https://sirajul26.imgix.net/msi.jpg"
          } as ProfileData;
        }
        return null;
      }
      
      // Get user data from auth
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error(userError.message);
      }
      
      // If it's the admin user, return a predefined profile
      if (userData.user?.email === "admin@sirajul.com") {
        return {
          id: userData.user.id,
          name: "MD Sirajul Islam",
          username: "admin",
          email: "admin@sirajul.com",
          phone_number: "+880 1629-744516",
          signup_method: "manual",
          created_at: userData.user.created_at || new Date().toISOString(),
          updated_at: userData.user.updated_at || new Date().toISOString(),
          avatar_url: "https://sirajul26.imgix.net/msi.jpg"
        } as ProfileData;
      }
      
      // Get profile data
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          console.log("Error fetching profile, creating default:", profileError.message);
          // If profile doesn't exist yet, create a default one for this admin
          if (userData.user?.email === "admin@sirajul.com") {
            return {
              id: userData.user.id,
              name: "MD Sirajul Islam",
              username: "admin",
              email: "admin@sirajul.com",
              phone_number: "+880 1629-744516",
              signup_method: "manual",
              created_at: userData.user.created_at || new Date().toISOString(),
              updated_at: userData.user.updated_at || new Date().toISOString(),
              avatar_url: "https://sirajul26.imgix.net/msi.jpg"
            } as ProfileData;
          }
        }
      
        // Combine user data with profile data
        return { 
          ...profileData, 
          email: userData.user?.email,
          avatar_url: userData.user?.user_metadata?.avatar_url || "https://sirajul26.imgix.net/msi.jpg"
        } as ProfileData;
      } catch (error) {
        console.error("Error in profile fetch:", error);
        // Return default profile for admin
        if (userData.user?.email === "admin@sirajul.com") {
          return {
            id: userData.user.id,
            name: "MD Sirajul Islam",
            username: "admin",
            email: "admin@sirajul.com",
            phone_number: "+880 1629-744516",
            signup_method: "manual",
            created_at: userData.user.created_at || new Date().toISOString(),
            updated_at: userData.user.updated_at || new Date().toISOString(),
            avatar_url: "https://sirajul26.imgix.net/msi.jpg"
          } as ProfileData;
        }
        throw error;
      }
    },
    enabled: !!userId || (!!user && user.email === "admin@sirajul.com"),
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast("Sign out failed", {
        description: error.message,
      });
      return;
    }
    
    toast("Signed out", {
      description: "You have been signed out successfully.",
    });
    
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    if (!user) {
      // Show auth popup if user is not logged in
      setShowAuthPopup(true);
    } else {
      // Open profile popover if user is logged in
      setIsOpen(!isOpen);
    }
  };

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";
  };

  // For admin user, show their avatar even while loading
  const adminAvatar = user?.email === "admin@sirajul.com" ? (
    <Avatar className="h-8 w-8 border border-border">
      <AvatarImage src="https://sirajul26.imgix.net/msi.jpg" />
      <AvatarFallback>MSI</AvatarFallback>
    </Avatar>
  ) : null;

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full hover:bg-primary/10 transition-all"
        aria-label="Profile" 
        onClick={handleProfileClick}
      >
        {user ? (
          isLoading || !profile ? (
            adminAvatar || <User className="h-5 w-5" />
          ) : (
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>{getInitials(profile.name || "")}</AvatarFallback>
            </Avatar>
          )
        ) : (
          <LogIn className="h-5 w-5" />
        )}
      </Button>

      {user && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <span className="hidden">Profile</span>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-lg">{profile?.name || "MD Sirajul Islam"}</h4>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Username</p>
                    <p className="font-medium">{profile?.username || "admin"}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{profile?.email || "admin@sirajul.com"}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile?.phone_number || "+880 1629-744516"}</p>
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
      )}

      {/* Auth popup when clicking profile button while not logged in */}
      <AuthPopup 
        isOpen={showAuthPopup}
        onOpenChange={setShowAuthPopup}
      />
    </>
  );
};

export default ProfileButton;
