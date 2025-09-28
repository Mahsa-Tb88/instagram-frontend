/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/store";

export function useMustLoggedIn() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login", { replace: true });
    }
  }, [isLoggedIn]);

  return isLoggedIn;
}

export function useMustLoggedOut() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  return isLoggedIn;
}
