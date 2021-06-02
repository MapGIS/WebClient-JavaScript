// Karma configuration
// Generated on Tue May 18 2021 11:20:59 GMT+0800 (中国标准时间)
// http://karma-runner.github.io/6.3/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],

        browserify: {
            debug: true,
            transform: [
                [
                    require('babelify'),
                    {
                        presets: ['env']
                    }
                ]
            ]
        },

        // list of files / patterns to load in the browser
        // **/*.js: All files with a "js" extension in all subdirectories
        // **/!(jquery).js: Same as previous, but excludes "jquery.js"
        // **/(foo|bar).js: In all subdirectories, all "foo.js" or "bar.js" files
        files: [
            /* '../../node_modules/@babel/polyfill/dist/polyfill.js', */
            './service/**/*.js',
            './unit-test-service.js'

            /***leaflet的源码***/
            // { pattern: './libs/workers/TurfWorkerForTest.js', include: false },
            // { pattern: '../node_modules/leaflet/dist/leaflet.css', include: false },
            // { pattern: '../src/leaflet/**/**/*.css', include: false },
            // '../src/leaflet/**/!(index).js',
            /**测试文件**/
            // './test-main-leaflet.js',
        ],

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './service/**/*.js': ['browserify'],
            './unit-test-service.js': ['browserify']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Firefox'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        
        captureTimeout: 120000,
        browserNoActivityTimeout: 120000,
        browserDisconnectTimeout: 20000
    });
};
