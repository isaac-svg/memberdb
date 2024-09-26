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
import { useAuth } from "@/components/auth-provider";
import { FormEvent, useState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { signup, login, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    console.log(username, password);
    try {
      if (isLogin) {
        console.log(username, password);
        await login(username, password);
        console.log("login is called");
        router.push("/");
      } else {
        await signup(username, password);
        console.log("signup is called");
      }
    } catch (err: any) {
      setError(err.message);
      console.log(err);
      toast({
        title: "Authentication Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="w-full h-screen grid place-content-center   ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your User Name below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="username"
                placeholder="isaac-svg"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password"> Password</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="*********"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
