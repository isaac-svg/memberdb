"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../auth-provider";

const WithAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };
};
WithAuth.displayName = `withauth wraper`;

export default WithAuth;
