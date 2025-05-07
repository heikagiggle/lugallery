"use client";

const FeaturedModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#006400]/30 z-50 px-6">
      <div className="relative bg-white rounded-xl shadow-lg w-[90%] sm:max-w-lg max-h-[80vh overflow-hidden flex flex-col p-5">
        <div className="flex justify-between">
          <h1></h1>
          <h1 className="cursor-pointer font-bold text-lg" onClick={closeModal}>X</h1>
        </div>
      </div>
    </div>
  );
};

export default FeaturedModal;
