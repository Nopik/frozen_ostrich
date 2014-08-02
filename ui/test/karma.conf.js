module.exports = function(config){
	config.set({
    preprocessors: {
      'src/js/**/*.coffee': [ 'coffee' ]
    },

    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js');
      }
    },

    basePath: '../',

		files: [
			'resources/bower_components/underscore/underscore.js',
			'resources/bower_components/angular/angular.js',
			'resources/bower_components/angular-route/angular-route.js',
			'resources/bower_components/angular-resource/angular-resource.js',
			'resources/bower_components/angular-animate/angular-animate.js',
			'resources/bower_components/angular-mocks/angular-mocks.js',
			'src/js/**/*.coffee',
			'test/unit/**/*.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

		plugins: [
      'karma-coffee-preprocessor',
      'karma-chrome-launcher',
      'karma-jasmine'
		],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}
	});
};
