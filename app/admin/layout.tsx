"use client";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/auth-provider";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AdminLayout
