import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withTests } from '@storybook/addon-jest';
import { cache } from 'emotion';
// import testResults from '../.jest-test-results';

// addDecorator(
//   withTests({
//     results: testResults,
//     filesExt: '.test.tsx',
//   }),
// );

addDecorator(withA11y);

// automatically import all files ending in *.stories.tsx
const req = require.context('../packages', true, /.stories.tsx/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
