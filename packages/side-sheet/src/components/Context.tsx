import React from 'react';

export type SideSheetContextValue = {
  close: () => void;
};

const SideSheetContext = React.createContext<SideSheetContextValue>({
  close: () => {},
});

export default SideSheetContext;
