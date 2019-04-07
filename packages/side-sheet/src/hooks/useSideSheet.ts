import React from 'react';
import { SideSheetProps } from '../components/SideSheet';

export type SideSheetControls = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  sideSheetProps: Pick<
    SideSheetProps,
    Exclude<keyof SideSheetProps, 'children'>
  >;
};

export default function useSideSheet(): SideSheetControls {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    open,
    close,
    sideSheetProps: {
      isOpen,
      onClose: close,
    },
  };
}
