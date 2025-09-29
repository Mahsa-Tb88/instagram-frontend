/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useInitialize } from "../../http/queries";
import { useAppStore, useUserStore } from "../../store/store";
import { LinearProgress, Stack } from "@mui/material";
import LoadingError from "../../components/LoadingError";
import logo from "../../assets/images/logo.png";

export default function Initializer() {
  const { isPending, data, error, refetch } = useInitialize();
  const setInitialized = useAppStore((state) => state.setInitialized);
  const setUser = useUserStore((state) => state.setUser);
  const setSuggested = useUserStore((state) => state.setSuggestedUsers);

  useEffect(() => {
    if (data) {
      setInitialized(true);
      const { body } = data.data;
      if (body.user?.username) {
        setUser(body.user);
        setSuggested(body.suggested);
      }
    }
  }, [data]);

  return (
    <Stack sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
      {isPending ? (
        <Stack sx={{ width: 300, alignItems: "center" }}>
          <img src={logo} width={100} style={{ marginBottom: 30 }} />
          <LinearProgress color="warning" sx={{ width: 1 }} />
        </Stack>
      ) : (
        error && <LoadingError message={error.message} handleAction={refetch} />
      )}
    </Stack>
  );
}
