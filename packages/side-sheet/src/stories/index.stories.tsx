import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css, ClassNames } from '@emotion/core';
import useSideSheet from '../hooks/useSideSheet';
import SideSheet from '../components/SideSheet';

const containerCss = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const scrimCss = css`
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

const sheetCss = css`
  position: absolute;
  max-width: 100vw;
  height: 100vh;
  right: 0;
`;

storiesOf('side-sheet', module)
  .add('Default', () => {
    return (
      <React.Fragment>
        <TestComponent>
          <TestSheet1 />
        </TestComponent>
        <br />
        <a href="https://bing.com" target="_blank">
          Bing
        </a>
      </React.Fragment>
    );
  })
  .add('Sheet customisation', () => {
    return (
      <React.Fragment>
        <TestComponent>
          <TestSheet2 />
        </TestComponent>
        <br />
      </React.Fragment>
    );
  })
  .add('Confirm close', () => {
    function SideSheetWithConfirm({ children }: { children: React.ReactNode }) {
      const { open, close, sideSheetProps } = useSideSheet();

      const onClose = React.useCallback(() => {
        action('confirm close')();
        if (confirm('Are you sure?')) {
          action('confirmed')();
          close();
        }
      }, [close]);

      return (
        <React.Fragment>
          <button onClick={open}>Open side sheet</button>
          <SideSheet {...sideSheetProps} onClose={onClose}>
            {children}
          </SideSheet>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <SideSheetWithConfirm>
          <TestSheet2 />
        </SideSheetWithConfirm>
        <br />
      </React.Fragment>
    );
  });

function TestSheet1() {
  return (
    <div>
      Lorem ipsum
      <br />
      <a href="https://yandex.com" target="_blank">
        Yandex
      </a>
      <br />
      <a href="https://google.com" target="_blank">
        Google
      </a>
    </div>
  );
}

const styledSheetClass = css`
  background-color: #f5f5f5;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function TestSheet2() {
  return (
    <div css={styledSheetClass}>
      <p>Styled sheet</p>
      <p css={css({ flexGrow: 1 })}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita id
        illum ipsa ipsum iste itaque iusto molestiae molestias nihil quasi quis
        repellat saepe sequi similique tempore temporibus, unde velit
        voluptates.
      </p>
      <p>
        <button>do nothing</button>
      </p>
    </div>
  );
}

function TestComponent({ children }: { children: React.ReactNode }) {
  const { open, sideSheetProps } = useSideSheet();

  return (
    <React.Fragment>
      <button onClick={open}>Open side sheet</button>
      <ClassNames>
        {({ css: cxCss }) => {
          return (
            <SideSheet
              {...sideSheetProps}
              containerClassName={cxCss(containerCss)}
              scrimClassName={cxCss(scrimCss)}
              sheetClassName={cxCss(sheetCss)}
            >
              {children}
            </SideSheet>
          );
        }}
      </ClassNames>
    </React.Fragment>
  );
}
