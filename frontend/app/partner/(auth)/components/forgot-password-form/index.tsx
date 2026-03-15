"use client";
import { useRouter } from "next/navigation";
import EnterNewPassword from "./EnterNewPassword";
import Verification from "./Verification";
import EnterEmail from "./EnterEmail";

const ForgotPasswordFlow = ({
  step,
}: {
  step?: string | boolean | string[];
}) => {
  const { push } = useRouter();
  const currentStep = parseInt((step as string) ?? "0");

  const handleNextStep = () => {
    push(`?step=${currentStep + 1}`);
  };

  const handlePrevStep = () => {
    push(`?step=${currentStep - 1}`);
  };

  return (
    <div>
      {step === "1" && (
        <EnterEmail onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      )}
      {step === "2" && (
        <Verification onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      )}
      {step === "3" && <EnterNewPassword />}
    </div>
  );
};

export default ForgotPasswordFlow;
