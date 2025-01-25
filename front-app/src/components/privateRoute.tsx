import React from "react";
import { useNavigate } from "react-router";

import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

interface IPrivateRoute {
  children: React.ReactNode;
}
export function PrivateRoute({ children }: IPrivateRoute) {
  const navigate = useNavigate();
  const getCurrentUser = useGetCurrentUser();

  if (getCurrentUser.isFetched && !getCurrentUser.data) {
    navigate("/");
  }

  return <>{children}</>;
}
