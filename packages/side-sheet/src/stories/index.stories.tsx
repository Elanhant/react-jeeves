import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/core';
import useSideSheet from '../hooks/useSideSheet';
import SideSheet from '../components/SideSheet';

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
      <SideSheet {...sideSheetProps}>{children}</SideSheet>
    </React.Fragment>
  );
}
