"use client";

import { AuthContext } from "@/context/auth-provider";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!AuthContext) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
};

export default useAuth;
