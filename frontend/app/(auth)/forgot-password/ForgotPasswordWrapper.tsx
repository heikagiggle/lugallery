"use client"
import { useSearchParams } from 'next/navigation'; 
import ForgotPasswordFlow from '../components/forgot-password-form';


const ForgotPasswordWrapper = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step') ?? '1'; 

  return <ForgotPasswordFlow step={step} />;
};

export default ForgotPasswordWrapper;