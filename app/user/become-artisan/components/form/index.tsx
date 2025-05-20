import React from "react";
import WhyJoin from "./WhyJoin";
import CareerForm from "./CareerForm";

const FormComponent = () => {
  return (
    <div className="w-full py-16 px-6 sm:px-8 md:px-12 mt-5">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-10">
        <div className="w-full lg:w-1/2">
          <WhyJoin />
        </div>

        <div className="w-full lg:w-1/2 border shadow px-5 py-6 rounded-md">
          <CareerForm />
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
