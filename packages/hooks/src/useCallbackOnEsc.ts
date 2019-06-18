import React from 'react';
import { KeyCode } from './constants';

export default function useCallbackOnEsc<T extends HTMLElement>(
  callback: () => void,
) {
  return React.useCallback<React.KeyboardEventHandler<T>>(
    (e) => {
      if (e.keyCode === KeyCode.Esc) {
        callback();
      }
    },
    [callback],
  );
}
