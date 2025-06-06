import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { PropsWithChildren } from 'react';

interface ExtraActionButtonProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
}

const ExtraActionButton = ({ children, className, onClick, asChild }: ExtraActionButtonProps) => {
  const Comp = asChild ? Slot : Button;
  return (
    <Comp
      variant={'outline'}
      size={'icon'}
      className={cn(
        'flex items-center justify-center bg-white border border-light-100 w-9 h-9 rounded-full hover:brightness-90',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Comp>
  );
};

export default ExtraActionButton;
