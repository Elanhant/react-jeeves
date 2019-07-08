# `react-scrollable-box`

`ScrollableBox` is a component that allows to visually indicate whether it is possible to see more content by scrolling.

## Installation
```
yarn add react-scrollable-box
```
or
```
npm install --save react-scrollable-box
```

## Usage

Think of a `ScrollableBox` as a group of 3 elements: the scrollable content itself and two "lips" or edges. Those lips can be used to mark scrollable content's beginning and end, and/or let users know if there's more content to be scrolled.

By default, `ScrollableBox` does not apply any CSS to neither content nor lips. You are free to use whatever CSS solution you want.

### Props

| prop                  | type                                            | required?          | description                                                                                                                                                                                                                 |
| --------------------- | ----------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children              | `React.ReactNode`                               | :heavy_check_mark: | Content you expect to be scrollable                                                                                                                                                                                         |
| topLipClassName       | `(hasOverflow: boolean) => string or undefined` | :heavy_check_mark: | Function that returns a string to be passed as `className` prop to the top lip. `hasOverflow` is `true` when it is possible to scroll up to see more content (i.e. content is not scrolled all the way to the top).         |
| bottomLipClassName    | `(hasOverflow: boolean) => string or undefined` | :heavy_check_mark: | Function that returns a string to be passed as `className` prop to the bottom lip. `hasOverflow` is `true` when it is possible to scroll down to see more content (i.e. content is not scrolled all the way to the bottom). |
| initialScrollPosition | `'top' or 'bottom'`                             |                    | Set to `'bottom'` to make content scroll to bottom on initial render. Defaults to `'top'`.                                                                                                                                  |
| className             | `string`                                        |                    | Value to be used as `className` prop for the content's container element. You can use it to set `max-height` and `overflow` styles at the very least.                                                                       |
| style                 | `React.CSSProperties`                           |                    | Value to be used as `style` prop for the content's container element. You can use it to set `max-height` and `overflow` styles as an alternative to using `className` prop.                                                 |

### Ref

`ScrollableBox` exposes some imperative methods via its `ref` attribute:

- `scrollToBottom` — scrolls the content to bottom.
- `scrollToTop` — scrolls the content to top.
  One of use cases for this could be displaying a list of messages inside `ScrollableBox` — you'd probably want to scroll to bottom once the user sends a new message.

## Examples

### Example with default css

```typescript jsx
import React from 'react';
import ScrollableBox, { useDefaultLipClassNames } from 'react-scrollable-box';
import 'react-scrollable-box/lib/default.css';

function Example() {
  const lipClassNames = useDefaultLipClassNames();

  // You can also pass "className" prop to ScrollableBox
  return (
    <ScrollableBox
      {...lipClassNames}
      style={{ maxHeight: '240px', overflow: 'auto' }}
    >
      {/* Some long text */}
    </ScrollableBox>
  );
}
```

### Example with emotion (v9)

```typescript jsx
import React from 'react';
import { css, cx } from 'emotion';
import ScrollableBox from 'react-scrollable-box';

const overflowLipCss = css`
  height: 1px;
  border: none;
  position: relative;
  overflow: visible;
  flex-shrink: 0;

  &::after {
    content: ' ';
    position: absolute;
    height: 4px;
    left: 0;
    right: 0;
    opacity: 0;
    transition: opacity 0.2s ease-in;
  }
`;

const overflowLipTopCss = css`
  ${overflowLipCss};
  &::after {
    border-bottom: 1px solid #e6e6e6;
    box-shadow: 0 4px 4px 0 rgba(33, 34, 38, 0.05);
    bottom: 0;
  }
`;

const overflowLipBottomCss = css`
  ${overflowLipCss};
  &::after {
    border-top: 1px solid #e6e6e6;
    box-shadow: 0 -4px 4px 0 rgba(33, 34, 38, 0.05);
    top: 0;
  }
`;

const overflowShadowVisibleCss = css`
  &::after {
    opacity: 1;
  }
`;

function Example() {
  return (
    <ScrollableBox
      className={css({ maxHeight: '240px', overflow: 'auto' })}
      topLipClassName={(hasOverflow) =>
        cx(overflowLipTopCss, hasOverflow && overflowShadowVisibleCss)
      }
      bottomLipClassName={(hasOverflow) =>
        cx(overflowLipBottomCss, hasOverflow && overflowShadowVisibleCss)
      }
    >
      {/* Some long text */}
    </ScrollableBox>
  );
}
```
