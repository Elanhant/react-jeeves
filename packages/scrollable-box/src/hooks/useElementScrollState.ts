import React from 'react';

type ScrollState = {
  scrolledToTop: boolean;
  scrolledToBottom: boolean;
};

enum ScrollStateActionType {
  UPDATE = 'UPDATE',
}

type ScrollStateAction = {
  type: ScrollStateActionType;
  payload: ScrollState;
};

function scrollStateReducer(
  state: ScrollState,
  action: ScrollStateAction,
): ScrollState {
  switch (action.type) {
    case ScrollStateActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
}

const initialState: ScrollState = {
  scrolledToTop: false,
  scrolledToBottom: false,
};

export type ElementScrollState<T extends HTMLElement> = {
  scrollRef: (element: T | null) => void;
  scrolledToTop: boolean;
  scrolledToBottom: boolean;
  onScroll: (e: Event) => void;
  updateScrolledState: () => void;
};

export default function useElementScrollState<
  T extends HTMLElement
>(): ElementScrollState<T> {
  const scrollRef = React.useRef<T | null>(null);
  const [state, dispatch] = React.useReducer(scrollStateReducer, initialState);

  const updateScrolledState = React.useCallback(() => {
    if (!scrollRef.current) {
      return;
    }

    const target = scrollRef.current;
    const overflowHeight = target.scrollHeight - target.clientHeight;

    dispatch({
      type: ScrollStateActionType.UPDATE,
      payload: {
        scrolledToTop: Math.floor(target.scrollTop) === 0,
        scrolledToBottom: Math.ceil(target.scrollTop) >= overflowHeight,
      },
    });
  }, [scrollRef.current, dispatch]);

  const setScrollRef = React.useCallback((element: T | null) => {
    scrollRef.current = element;
    updateScrolledState();
  }, []);

  React.useEffect(() => {
    updateScrolledState();
  }, []);

  const onScroll = React.useCallback(() => {
    updateScrolledState();
  }, [updateScrolledState]);

  return {
    ...state,
    scrollRef: setScrollRef,
    onScroll,
    updateScrolledState,
  };
}
