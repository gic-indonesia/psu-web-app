import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@src/components/ui/dialog';

const Modal = (props: {
  children: ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
}) => {
  const { children, open, title, onClose } = props;
  return (
    <Dialog
      open={open}
    >
      <DialogContent
        className=''
        onClose={onClose}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className='text-left'>
            {children}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
