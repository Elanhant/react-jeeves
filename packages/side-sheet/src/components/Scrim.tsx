import React from 'react';
import { animated, AnimatedValue } from 'react-spring';
import { useCallbackOnEsc } from 'react-jeeves-hooks';
import useSideSheetContext from '../hooks/useSideSheetContext';

export type ScrimProps = {
  children: React.ReactNode;
  style?: AnimatedValue<any>;
  className?: string;
};

export default function Scrim({ children, style, className }: ScrimProps) {
  const { close } = useSideSheetContext();

  const onKeyDown = useCallbackOnEsc(close);

  return (
    <animated.div
      className={className}
      style={style}
      onClick={close}
      onKeyDown={onKeyDown}
    >
      {children}
    </animated.div>
  );
}
