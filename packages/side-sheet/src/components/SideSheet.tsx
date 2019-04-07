import React from 'react';
import { css } from '@emotion/core';
import { useTransition, UseTransitionResult, animated } from 'react-spring';
import SideSheetProvider from './Provider';
import Scrim from './Scrim';

const containerCss = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const baseCss = css`
  position: absolute;
  max-width: 100vw;
  height: 100vh;
  right: 0;
`;

const transitionConfig = {
  from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
  enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  leave: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
};

export type SideSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function SideSheet({
  isOpen,
  onClose,
  children,
}: SideSheetProps) {
  const tabTrapRef = React.useRef<HTMLDivElement>(null);

  const renderSheet = React.useCallback(
    ({
      item: shouldDisplaySheet,
      key,
      props,
    }: UseTransitionResult<boolean, any>) => {
      return (
        shouldDisplaySheet && (
          <div css={containerCss} key={key}>
            <Scrim style={props} sideSheetRef={tabTrapRef.current}>
              <animated.div
                css={baseCss}
                style={props}
                onClick={stopPropagation}
                ref={tabTrapRef}
              >
                {children}
              </animated.div>
            </Scrim>
          </div>
        )
      );
    },
    [children, tabTrapRef],
  );

  const transitions = useTransition(isOpen, null, transitionConfig);

  return (
    <SideSheetProvider isOpen={isOpen} onClose={onClose}>
      {transitions.map(renderSheet)}
    </SideSheetProvider>
  );
}

/* HELPERS */

function stopPropagation(e: React.MouseEvent<HTMLElement>) {
  e.stopPropagation();
}
