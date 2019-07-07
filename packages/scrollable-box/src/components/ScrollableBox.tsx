import React from 'react';
import useScrollableBoxState from '../hooks/useScrollableBoxState';

export type ScrollableBoxProps = {
  children: React.ReactNode;
  topLipClassName: (visible: boolean) => string | undefined;
  bottomLipClassName: (visible: boolean) => string | undefined;
  initialScroll?: 'bottom' | 'top';
  className?: string;
  style?: React.CSSProperties;
};

export type ScrollableBoxImperativeHandles = {
  scrollToBottom: () => void;
};

const ScrollableBox = React.forwardRef<
  ScrollableBoxImperativeHandles,
  ScrollableBoxProps
>(
  (
    {
      children,
      topLipClassName,
      bottomLipClassName,
      initialScroll = 'top',
      className,
      style,
    }: ScrollableBoxProps,
    ref,
  ) => {
    const {
      boxRef,
      hasOverflow,
      scrolledToTop,
      scrolledToBottom,
      updateScrolledState,
    } = useScrollableBoxState([children]);

    const listWrapperRef = React.useRef<HTMLDivElement | null>(null);

    const setListWrapperRef = React.useCallback(
      (element: HTMLDivElement | null) => {
        listWrapperRef.current = element;
        boxRef(listWrapperRef.current);

        if (listWrapperRef.current && initialScroll === 'bottom') {
          scrollToBottom(listWrapperRef.current);
          updateScrolledState();
        }
      },
      [],
    );

    React.useImperativeHandle(ref, () => ({
      scrollToBottom: () => {
        scrollToBottom(listWrapperRef.current);
      },
      scrollTop: () => {
        scrollToTop(listWrapperRef.current);
      },
    }));

    return (
      <React.Fragment>
        <div className={topLipClassName(hasOverflow && !scrolledToTop)} />
        <div className={className} ref={setListWrapperRef} style={style}>
          {children}
        </div>
        <div className={bottomLipClassName(hasOverflow && !scrolledToBottom)} />
      </React.Fragment>
    );
  },
);

export default ScrollableBox;

export function scrollToBottom(element: HTMLDivElement | null) {
  if (element && element.scrollHeight > element.clientHeight) {
    element.scrollTop = element.scrollHeight; // eslint-disable-line no-param-reassign
  }
}

export function scrollToTop(element: HTMLDivElement | null) {
  if (element && element.scrollHeight > element.clientHeight) {
    element.scrollTop = 0; // eslint-disable-line no-param-reassign
  }
}
