import React from 'react';
import { useTransition, UseTransitionResult, animated } from 'react-spring';
import SideSheetProvider from './Provider';
import Scrim from './Scrim';

const defaultTransitionConfig = {
  from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
  enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  leave: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
};

export type SideSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerClassName?: string;
  scrimClassName?: string;
  sheetClassName?: string;
  transitionConfig?: Record<string, any>;
};

export default function SideSheet({
  isOpen,
  onClose,
  children,
  containerClassName,
  scrimClassName,
  sheetClassName,
  transitionConfig = defaultTransitionConfig,
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
          <div className={containerClassName} key={key}>
            <Scrim
              style={props}
              sideSheetRef={tabTrapRef.current}
              className={scrimClassName}
            >
              <animated.div
                className={sheetClassName}
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
    [children, tabTrapRef, containerClassName, scrimClassName, sheetClassName],
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
