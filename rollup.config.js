import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import license from 'rollup-plugin-license'
import pkg from './package.json'

const licenseBanner = license({
  banner: {
    content: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */',
    commentStyle: 'none'
  }
})

export default [
  {
    input: './index.js',
    output: [
      {
        file: pkg.module,
        format: 'esm'
      },
      {
        file: pkg.browser,
        format: 'umd',
        name: 'Cookies',
        noConflict: true,
        banner: ';'
      }
    ],
    plugins: [licenseBanner]
  },
  {
    input: './index.js',
    output: [
      {
        file: pkg.module.replace('.mjs', '.min.mjs'),
        format: 'esm'
      },
      {
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'umd',
        name: 'Cookies',
        noConflict: true
      }
    ],
    plugins: [
      terser(),
      licenseBanner, // must be applied after terser, otherwise it's being stripped away...
      filesize()
    ]
  }
]
