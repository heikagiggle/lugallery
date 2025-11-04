"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<number | null>(null);
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState("");

  // Auto-advance to next step after an answer is selected
  useEffect(() => {
    if (step === 1 && rating !== null) {
      setTimeout(() => setStep(2), 200); // small delay for UX
    }
    if (step === 2 && recommend !== null) {
      setTimeout(() => setStep(3), 200);
    }
  }, [rating, recommend, step]);

  // Auto-advance after entering suggestions (onBlur or pressing Enter)
  const handleSuggestionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSuggestions(e.target.value);
  };

  const handleSuggestionsSubmit = () => {
    setStep(4);
  };

  // Final submit
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        console.log({ rating, recommend, suggestions });
        // TODO: send feedback to backend
        onClose();
        setStep(1);
        setRating(null);
        setRecommend(null);
        setSuggestions("");
      }, 10000); // show thank-you step for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>We value your feedback!</DialogTitle>
        </DialogHeader>

        <div className="mt-3">
          {step === 1 && (
            <div className="flex flex-col items-center space-y-4">
              <p>How satisfied are you with Lugallery?</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                      rating === num ? "bg-[#006400] text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setRating(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="flex justify-between w-full px-6 text-xs text-gray-500">
                <span>Not satisfied</span>
                <span>Very satisfied</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center space-y-4">
              <p>Would you recommend this service to anyone?</p>
              <div className="flex gap-6">
                <button
                  onClick={() => setRecommend(true)}
                  className={`px-4 py-2 rounded ${
                    recommend === true
                      ? "bg-[#006400] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Yes 😃
                </button>
                <button
                  onClick={() => setRecommend(false)}
                  className={`px-4 py-2 rounded ${
                    recommend === false
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  No 😞
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col space-y-4">
              <p>Any suggestions to improve the app/services?</p>
              <textarea
                className="border rounded p-2 w-full"
                rows={4}
                value={suggestions}
                onChange={handleSuggestionsChange}
                placeholder="Your suggestions..."
              />
              <small className="text-gray-400">
                Leave blank if no suggestions
              </small>
              <button
                onClick={handleSuggestionsSubmit}
                className="mt-2 px-4 py-2 bg-[#006400] text-white rounded hover:bg-[#004d00]"
              >
                Next
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg font-medium text-[#006400]">
                Thank you for your feedback! 🎉
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
