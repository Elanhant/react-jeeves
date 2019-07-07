import React from 'react';
import { debounce } from 'debounce';
import useElementScrollState from './useElementScrollState';

export type ScrollableBoxState<T extends HTMLElement> = {
  hasOverflow: boolean;
  boxRef: (element: T | null) => void;
  scrolledToTop: boolean;
  scrolledToBottom: boolean;
  updateScrolledState: () => void;
};

export default function useScrollableBoxState<T extends HTMLElement>(
  scrollUpdateDependencies: React.ReactNode[],
): ScrollableBoxState<T> {
  const {
    scrollRef,
    onScroll,
    scrolledToTop,
    scrolledToBottom,
    updateScrolledState,
  } = useElementScrollState<T>();

  const boxRef = React.useRef<T | null>(null);
  const debounceRef = React.useRef(debounce(onScroll, 50));

  const setBoxRef = React.useCallback((element: T | null) => {
    boxRef.current = element;
    scrollRef(element);
  }, []);

  React.useEffect(() => {
    if (boxRef.current) {
      boxRef.current.addEventListener('scroll', debounceRef.current);
    }

    return () => {
      if (boxRef.current) {
        boxRef.current.removeEventListener('scroll', debounceRef.current);
        debounceRef.current.clear();
      }
    };
  }, [debounceRef.current]);

  const [hasOverflow, setHasOverflow] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!boxRef.current) {
      return;
    }

    setHasOverflow(boxRef.current.clientHeight < boxRef.current.scrollHeight);
  }, [...scrollUpdateDependencies]);

  return {
    hasOverflow,
    boxRef: setBoxRef,
    scrolledToTop,
    scrolledToBottom,
    updateScrolledState,
  };
}
