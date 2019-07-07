import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import clear from 'rollup-plugin-clear';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    clear({
      targets: ['./lib'],
    }),
    typescript({
      typescript: require('typescript'), // eslint-disable-line global-require
      exclude: ['./src/__tests__/*', './src/stories/*'],
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          module: 'es6',
          target: 'es5',
        },
        include: ['./src/index.ts'],
      },
      objectHashIgnoreUnknownHack: true,
    }),
    copy({
      targets: [{ src: 'src/stylesheets/default.css', dest: 'lib/' }],
      verbose: true,
    }),
  ],
};
