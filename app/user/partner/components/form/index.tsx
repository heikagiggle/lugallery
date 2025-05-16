import React from "react";
import WhyJoin from "./WhyJoin";
import PartnerForm from "./PartnerForm";

const FormComponent = () => {
  return (
    <div className="w-full py-16 px-12 mt-5">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1" id="signup">
          <PartnerForm />
        </div>

        <div className="flex-1">
          {" "}
          <WhyJoin />
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
