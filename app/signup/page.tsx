"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { isUserSignedUp } from "@/models/db";
import { useToast } from "@/components/hooks/use-toast";

const SignUpForm = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    (async () => {
      const hasSignedUp = await isUserSignedUp();
      console.log(hasSignedUp, "hasSignedUp");
      if (hasSignedUp) {
        router.push("/login");
        toast({
          title: "Authentication",
          description: "You already have an account. Please login",
          variant: "destructive",
        });
      } else {
        setAuthState(true);
      }
    })();
    console.log("I am here in effect");
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const a = await signup(username, password);
      console.log(a);
      router.push("/"); // Redirect after successful signup
    } catch (err) {
      setError((err as Error).message);
      toast({
        title: "Authentication Error",
        description: error,
        variant: "destructive",
      });
    }
  };
  if (!authState) return;
  return (
    <div className="w-full h-screen grid place-content-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                className=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Signup
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
