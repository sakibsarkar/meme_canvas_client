"use client";

import { useGetAuthorQuery } from "@/redux/features/auth/auth.api";
import { setLoading, setUser } from "@/redux/features/auth/auth.slice";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get("accessToken");

  const { data, isSuccess, isError, isLoading } = useGetAuthorQuery(
    token || ""
  );
  const dispatch = useDispatch();

  if (isSuccess) {
    dispatch(setUser({ user: data.data }));
  }

  if (isError) {
    dispatch(setLoading(false));
  }

  return <>{children}</>;
};

export default AuthProvider;
