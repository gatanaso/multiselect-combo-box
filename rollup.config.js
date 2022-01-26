import resolve from '@rollup/plugin-node-resolve';
import html from '@web/rollup-plugin-html';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: './demo/index.html',
  output: {
    dir: './build'
  },
  plugins: [html(), resolve(), terser()]
};

export default config;
