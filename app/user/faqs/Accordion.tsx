'use client';
import { useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqsProps {
  question: string;
  answer: string;
}

const Accordion = ({ question, answer }: FaqsProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2 text-left">
        <button
          onClick={() => setAccordionOpen(!accordionOpen)}
          className={`flex justify-between w-full py-2 cursor-pointer ${
            accordionOpen ? 'border-b-0' : 'border-b border-[#1211271F]'
          }`}
        >
          <span className="text-[#121127] font-gothamB text-left">{question}</span>
          {accordionOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
            accordionOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden border-b text-base border-[#1211271F] px-2 pt-2 pb-4 text-[#121127]/50">
            {answer}
          </div>
        </div>
      </div>
  );
};

export default Accordion;
