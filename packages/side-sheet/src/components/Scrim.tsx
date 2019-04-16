import React from 'react';
import { animated, AnimatedValue } from 'react-spring';
import useSideSheetContext from '../hooks/useSideSheetContext';
import useTabTrap, { TrapElement } from '../hooks/useTabTrap';

export type ScrimProps = {
  children: React.ReactNode;
  style?: AnimatedValue<any>;
  sideSheetRef?: TrapElement;
  className?: string;
};

export default function Scrim({
  children,
  style,
  sideSheetRef,
  className,
}: ScrimProps) {
  const { close } = useSideSheetContext();

  useTabTrap(sideSheetRef, close);

  return (
    <animated.div className={className} style={style} onClick={close}>
      {children}
    </animated.div>
  );
}
