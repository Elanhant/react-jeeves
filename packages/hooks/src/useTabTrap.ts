import React from 'react';
import { KeyCode } from './constants';

const focusableElementsString = `
 a[href],
 area[href],
 input:not([disabled]),
 select:not([disabled]),
 textarea:not([disabled]),
 button:not([disabled]),
 iframe,
 object,
 embed,
 [tabindex="0"],
 [contenteditable]
`;

export type GetFocusableElementsFn<T extends HTMLElement> = (
  trapElement: T | null,
) => HTMLElement[];

function defaultGetFocusableElements<T extends HTMLElement>(
  trapElement: T | null,
): HTMLElement[] {
  if (!trapElement) {
    return [];
  }

  return Array.prototype.slice.call(
    trapElement.querySelectorAll(focusableElementsString),
  );
}

export default function useTabTrap<T extends HTMLElement>(
  getFocusableElements: GetFocusableElementsFn<T> = defaultGetFocusableElements,
) {
  const trapRef = React.useRef<T>(null);
  const lastFocusedElement = React.useRef<Element | null>();

  const listener = React.useCallback(
    (e: KeyboardEvent) => {
      const focusableElements = getFocusableElements(trapRef.current);

      const firstTabStop = focusableElements[0];
      const lastTabStop = focusableElements[focusableElements.length - 1];

      if (e.keyCode === KeyCode.Tab) {
        if (e.shiftKey) {
          if (document.activeElement === firstTabStop) {
            e.preventDefault();

            if (lastTabStop) {
              lastTabStop.focus();
            }
          }
        } else if (document.activeElement === lastTabStop) {
          e.preventDefault();

          if (firstTabStop) {
            firstTabStop.focus();
          }
        }
      }
    },
    [trapRef.current, getFocusableElements],
  );

  const enableTabTrap = React.useCallback(() => {
    if (!trapRef.current) {
      return;
    }

    lastFocusedElement.current = document.activeElement;
    trapRef.current.addEventListener('keydown', listener);

    const focusableElements = getFocusableElements(trapRef.current);
    const firstTabStop = focusableElements[0];
    if (firstTabStop) {
      firstTabStop.focus();
    }
  }, [listener, trapRef.current, lastFocusedElement.current]);

  const disableTabTrap = React.useCallback(() => {
    if (lastFocusedElement.current) {
      (lastFocusedElement.current as HTMLElement).focus();
    }

    if (trapRef.current) {
      trapRef.current.removeEventListener('keydown', listener);
    }
  }, [listener, trapRef.current, lastFocusedElement.current]);

  React.useEffect(() => {
    // eslint-disable-next-line consistent-return
    return () => {
      disableTabTrap();
    };
  }, []);

  return {
    trapRef,
    enableTabTrap,
    disableTabTrap,
  };
}
