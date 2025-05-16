import React from "react";
import Accordion from "./Accordion";
import { partnerFaqs } from "./data";

const Faq = () => {
  return (
    <div className="py-16 mt-5 px-12">
      <div className="space-y-2.5 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Most asked questions
        </h1>
      </div>

      <div className="mt-12 mx-auto w-full max-w-3xl px-4">
        {partnerFaqs.map((faq, index) => (
          <Accordion key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
