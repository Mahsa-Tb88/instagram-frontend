import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMustLoggedOut } from "../../utils/customhooks";
import type { RegisterErrorObject } from "../../types/types";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [errors, setErrors] = useState<RegisterErrorObject>({});
  const [finished, setFinished] = useState("");

  const { isPending, data, error } = useRegister();
  const navigate = useNavigate();
  useMustLoggedOut();

  return <div>RegisterPage</div>;
}
