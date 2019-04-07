import React from 'react';

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

const TAB_KEY = 9;
const ESC_KEY = 27;

export type TrapElement = (() => HTMLElement) | HTMLElement | undefined | null;

export default function useTabTrap(
  getTrapElement: TrapElement,
  onPressEsc: () => void,
) {
  React.useEffect(() => {
    const lastFocusedElement = document.activeElement;
    const trapElement =
      typeof getTrapElement === 'function' ? getTrapElement() : getTrapElement;

    if (!trapElement) {
      return;
    }

    const focusableElements = Array.prototype.slice.call(
      trapElement.querySelectorAll(focusableElementsString),
    );

    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];

    if (firstTabStop) {
      firstTabStop.focus();
    }

    const listener = (e: KeyboardEvent) => {
      if (e.keyCode === ESC_KEY) {
        onPressEsc();
        return;
      }

      if (e.keyCode === TAB_KEY) {
        if (e.shiftKey) {
          // Tab backwards
          // Find the last tab stop if the current focus is on the first tab stop
          if (document.activeElement === firstTabStop) {
            e.preventDefault();

            if (lastTabStop) {
              lastTabStop.focus();
            }
          }
        } else if (document.activeElement === lastTabStop) {
          // Tab forwards
          // Jump to the first tab stop if the current focus is on the last tab stop
          e.preventDefault();

          if (firstTabStop) {
            firstTabStop.focus();
          }
        }
      }
    };

    trapElement.addEventListener('keydown', listener);

    // eslint-disable-next-line consistent-return
    return () => {
      (lastFocusedElement as HTMLElement).focus();
      trapElement.removeEventListener('keydown', listener);
    };
  }, [getTrapElement, onPressEsc]);
}
