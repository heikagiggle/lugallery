"use client";
import dynamic from "next/dynamic";

const ForgotPassword = () => {
   const ForgotPasswordWrapper = dynamic(() => import("./ForgotPasswordWrapper"), {
    ssr: false,
  });
  return (
    <div>
      <ForgotPasswordWrapper/>
    </div>
  )
}

export default ForgotPassword
