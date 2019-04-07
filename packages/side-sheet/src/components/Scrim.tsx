import React from 'react';
import { css } from '@emotion/core';
import { animated, AnimatedValue } from 'react-spring';
import useSideSheetContext from '../hooks/useSideSheetContext';
import useTabTrap, { TrapElement } from '../hooks/useTabTrap';

const baseCss = css`
  transform: none !important; // react-spring may try to set transform style which we don't need

  &:before {
    content: ' ';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.42);
  }
`;

export type ScrimProps = {
  children: React.ReactNode;
  style?: AnimatedValue<any>;
  sideSheetRef?: TrapElement;
};

export default function Scrim({ children, style, sideSheetRef }: ScrimProps) {
  const { close } = useSideSheetContext();

  useTabTrap(sideSheetRef, close);

  return (
    <animated.div css={baseCss} style={style} onClick={close}>
      {children}
    </animated.div>
  );
}
