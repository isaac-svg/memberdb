"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../auth-provider";

export const description = "auth wrapper.";

function MithAuth(WrappedComponent: React.ComponentType) {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (props: any) => {
    return user ? <WrappedComponent {...props} /> : null;
  };
}

const WithAuth = MithAuth;
export default WithAuth;
