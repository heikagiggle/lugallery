'use client';
import Link from 'next/link';
import { Button } from '../../../../components/widgets/button';
import { PromoCheckIcon } from '../../../../components/widgets/icons/promocheck';

interface ModalProps {
  isOpen: boolean;
}

const SuccessModal = ({ isOpen }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-6 max-w-sm w-full text-center flex flex-col justify-center items-center gap-y-2">
        <PromoCheckIcon />

        <h3 className="font-bold py-3 text-2xl">Password Reset Successfully</h3>

        <div className="mt-6 w-full">
          <Link href="/admin/login">
            <Button className="w-full">Proceed to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

