module.exports = function(config){
	config.set({

		basePath : '../',

		files : [
			'resources/bower_components/angular/angular.js',
			'resources/bower_components/angular-route/angular-route.js',
			'resources/bower_components/angular-resource/angular-resource.js',
			'resources/bower_components/angular-animate/angular-animate.js',
			'resources/bower_components/angular-mocks/angular-mocks.js',
			'src/js/**/*.js',
			'test/unit/**/*.js'
		],

		autoWatch : true,

		frameworks: ['jasmine'],

		browsers : ['Chrome'],

		plugins : [
						'karma-chrome-launcher',
						'karma-jasmine'
						],

		junitReporter : {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}

	});
};

