import React from 'react';
import SideSheetContext, { SideSheetContextValue } from './Context';

export type SideSheetProviderProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};

export default function SideSheetProvider({
  children,
  isOpen,
  onClose,
}: SideSheetProviderProps) {
  const close = React.useCallback(() => {
    if (!isOpen) {
      return;
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  }, [isOpen, onClose]);

  const contextValue = React.useMemo<SideSheetContextValue>(() => {
    return {
      close,
    };
  }, [close]);

  return (
    <SideSheetContext.Provider value={contextValue}>
      {children}
    </SideSheetContext.Provider>
  );
}
