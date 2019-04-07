import React from 'react';
import SideSheetContext from '../components/Context';

export default function useSideSheetContext() {
  return React.useContext(SideSheetContext);
}
