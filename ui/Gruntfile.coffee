module.exports = (grunt)->

	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-coffee'

	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		coffee:
			compile:
				files:
					'app/js/main.js': [ 'src/js/**/*.coffee' ]

		concat:
			dist:
				src: [
					#.min.js also refer to .map files, for simplicity this script takes non-minified files
					'resources/bower_components/jquery/dist/jquery.js'
					'resources/bower_components/bootstrap/dist/js/bootstrap.min.js'
					'resources/bower_components/angular/angular.js'
					'resources/bower_components/angular-route/angular-route.js'
					'resources/bower_components/underscore/underscore.js'
					'app/js/main.js'
				]
				dest: 'app/js/<%= pkg.name %>.js'

		copy:
			css:
				expand: true
				src: [
					'resources/bower_components/bootstrap/dist/css/bootstrap.min.css'
					'resources/bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
					'src/css/main.css'
				]
				dest: 'app/css/'
				flatten: true

		sass:
			dist:
				files:
					'app/css/main.css': 'src/css/main.scss'

		watch:
			options:
				livereload: true
				atBegin: true

			js:
				files: 'src/**/*.coffee'
				tasks: [ 'coffee', 'concat' ]

			css:
				files: 'src/**/*.scss'
				tasks: [ 'sass:dist' ]

			html:
				files: 'app/**/*.html'
				tasks: [] #just livereload

	# Default task.
	grunt.registerTask 'default', [ 'coffee', 'concat', 'copy:css', 'sass:dist' ]
