"use client";

import Main from "@/app/(beforeLogin)/_component/Main";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  router.push("/i/flow/login");

  return <Main />;
}
