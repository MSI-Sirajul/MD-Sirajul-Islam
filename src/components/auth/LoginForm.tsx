
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setLoginError("");
    
    try {
      console.log("Attempting to sign in with:", values.email);
      
      // Check for the hardcoded admin credentials
      if (values.email === "admin@sirajul.com" && values.password === "29744516") {
        // Try to sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          console.error("Login error with admin credentials:", error.message);
          
          // If the user doesn't exist yet in Supabase, try to create it
          const { error: signUpError } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
          });

          if (signUpError) {
            console.error("Failed to create admin account:", signUpError.message);
            setLoginError("Failed to authenticate. Please contact the site administrator.");
            return;
          }
          
          // Try signing in again after creating the account
          const { data: newData, error: newError } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });
          
          if (newError) {
            console.error("Still cannot sign in after account creation:", newError.message);
            setLoginError("Authentication failed. Please try again later.");
            return;
          }
          
          console.log("Admin account created and signed in:", newData.user?.email);
          onSuccess();
          return;
        }
        
        if (data.user) {
          console.log("Admin login successful:", data.user.email);
          onSuccess();
          return;
        }
      } else {
        console.error("Invalid admin credentials provided");
        setLoginError("Invalid administrator credentials. Only authorized administrators can access this site.");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {loginError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your admin email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
