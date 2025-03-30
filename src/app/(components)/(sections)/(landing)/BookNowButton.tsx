import { Dialog, DialogContent, DialogTrigger } from '../../(elements)/Dialog';
import StepFormV2 from '../../(elements)/StepFormV2';

const BookNowButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="action-button">BOOK NOW!</button>
      </DialogTrigger>
      <DialogContent>
        <StepFormV2 />
      </DialogContent>
    </Dialog>
  );
};

export default BookNowButton;
