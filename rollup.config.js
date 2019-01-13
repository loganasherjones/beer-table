import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
      ],
      babelrc: false,
    }),
    uglify({
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
  ],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
};
