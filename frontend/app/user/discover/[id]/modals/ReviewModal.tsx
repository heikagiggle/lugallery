import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  artisanName: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  artisanName,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log({ rating, review });
    // POST /api/reviews { artisanId, rating, review }
    onClose();
    toast.success("Thank you for your feedback!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate your experience with {artisanName}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 my-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={28}
              className={`cursor-pointer ${
                i <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(i)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Tell us about your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="min-h-[100px] outline-none"
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!rating || !review}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
