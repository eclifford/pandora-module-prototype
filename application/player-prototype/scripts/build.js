const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const VERBOSE = false;
const PROJECT_ROOT = path.join(__dirname, '..');
const SRC_ROOT = path.join(PROJECT_ROOT, 'src');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'dist', 'js');
const MODULES_PATH = path.join(PROJECT_ROOT, 'node_modules');

const bundler = webpack({
  // entry defines the starting point for the build.
  // For multiple entry points, this can be an object.
  // See: http://webpack.github.io/docs/configuration.html#entry
  entry: [
    'webpack-hot-middleware/client',
    path.join(SRC_ROOT, 'index.js')
  ],

  // Options affecting the output.
  // See: http://webpack.github.io/docs/configuration.html#output
  output: {
    // This is the absolute path of the output directory
    // See: http://webpack.github.io/docs/configuration.html#output-path
    path: OUTPUT_PATH,
    filename: 'bundle.js',
    publicPath: '/js/'
  },

  // This causes source maps to be emitted.
  // See:
  //   https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-module-eval-source-map',

  // module contains configuration for handling modules.
  // See:
  //   http://webpack.github.io/docs/configuration.html#module
  module: {
    preLoaders: [
      // This causes .js and .jsx files to be linted with eslint, using settings
      // defined in the eslint property below.
      // See:
      //   https://github.com/MoOx/eslint-loader
      // { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      // This causes .js and .jsx files to be compiled with babel.
      // See:
      //   https://github.com/babel/babel-loader
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules\/[^@]/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      // This causes .scss files to be pass through several loaders eventually
      // compiled css embedded within JavaScript components
      // See:
      //   https://github.com/jtangelder/sass-loader
      //   https://github.com/postcss/postcss-loader
      //   https://github.com/webpack/css-loader
      //   https://github.com/webpack/style-loader
      { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'postcss-loader', 'sass?sourceMap'], exclude: /node_modules/ }
    ]
  },

  // set postcss plugins
  // See:
  //  https://github.com/postcss/postcss-loader
  //  https://github.com/postcss/autoprefixer
  postcss() {
    return [autoprefixer({
      browsers: [
        'IE >= 9',
        'last 1 Firefox version',
        'last 1 Edge version',
        'last 1 Chrome version',
        'Safari >= 6',
        '> 5%'
      ]
    })]
  },

  // webpack compiler plugins are used to implement certain behaviors. This is
  // where plugins are configured.
  // See:
  //   https://webpack.github.io/docs/using-plugins.html
  //   https://webpack.github.io/docs/list-of-plugins.html
  plugins: [
    // This prevents any output files from being written when there are
    // compilation errors.
    // See:
    //   https://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    new webpack.NoErrorsPlugin(),

    // This is recommended to be used when [chunkhash] is used in output
    // filenames.
    // See:
    //   https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
    //   https://webpack.github.io/docs/configuration.html#output
    new webpack.optimize.OccurenceOrderPlugin(),

    // Allows modules to be "hot swapped" at runtime removing the need for a full
    // page reload during development
    // See:
    //   https://webpack.github.io/docs/hot-module-replacement.html
    new webpack.HotModuleReplacementPlugin(),

    // Prevents the inclusion of duplicate code in the bundle builds.
    // See:
    //   https://github.com/webpack/docs/wiki/optimization#deduplication
    new webpack.optimize.DedupePlugin()
  ]
}, (err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }
  console.log(stats.toString({
    colors: true,
    reasons: VERBOSE,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  }));
});
