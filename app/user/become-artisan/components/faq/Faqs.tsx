import React from "react";
import Accordion from "./Accordion";
import { apprenticeFaqs } from "./data";

const Faqs = () => {
  return (
    <div className="py-16 mt-5 px-12">
      <div className="space-y-2.5 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Most asked questions
        </h1>
      </div>

      <div className="mt-12 mx-auto w-full max-w-3xl px-4">
        {apprenticeFaqs.map((faq, index) => (
          <Accordion key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default Faqs;
