import React from "react";
import SignInForm from "../components/auth/SignInForm";

export default function SignIn() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <SignInForm />
    </div>
  );
}