import React from "react";
import WhyJoin from "./WhyJoin";
import CareerForm from "./CareerForm";

const FormComponent = () => {
  return (
    <div className="w-full py-16 px-12 mt-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          {" "}
          <WhyJoin />
        </div>

        <div className="flex-1" id="learn">
          <CareerForm />
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
