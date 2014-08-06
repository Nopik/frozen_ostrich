This is test repository for simple AngularJS/Django application.

Since this is my first Django application, things are probably not as clean as they could be. Especially packaging & depedencies - currently you need to install django-tastypie and psycopg2 manually, whereas some packaging (setup.py?) is probably the conventional way to do it.

The directory structure could be improved probably, especially on ui app, as mixing .py, .pyc, package.json, Gruntfile and others into same folder isnt the most elegant solution, for sure.

UI code is some mix between production and development, mostly done this way out of simple convenience instead of long-term maintanability goals. E.g. JS files are concatenated (but not minified), whereas CSS resources are still referenced multiple times from index.html.

For simplicity (and due to lack of such requirement) no authentication/authorization was added.

In real application paging should be added as well, to not return list of all products in one go.

Currently protractor tests are setup to run against development database, which doesn't make much sense, it should run against fixtures.

# Installation

## Depedencies

This instruction assumes that you have the following installed:

1. Python 3.x
1. Virtualenv
1. PostgreSQL (or actually any other SQL DB you can configure).
	1. The DB user should have enough privileges to create/drop databases (for testsuites).
	1. Database used by app should be created empty, by default the DB name is frozen_ostrich
1. bower
1. Node.js 0.10.x

## Steps

1. git clone https://github.com/Nopik/frozen_ostrich.git
1. cd frozen_ostrich
1. virtualenv -p \[your path to python3\] development
1. source development/bin/activate
1. Configure DB access in frozen_ostrich/settings.py, DATABASES variable
1. pip install Django
1. pip install django-tastypie
1. pip install psycopg2
1. ./manage.py syncdb
1. cd ui
1. bower install
1. npm install
1. grunt
1. cd ..
1. ./manage.py runserver

## Running tests

### Backend

1. ./manage.py test

### Frontend

#### Unit tests

1. cd ui
1. npm test (or npm run test-single-run)

#### End-to-end tests

##### Preparation

1. cd ui
1. ./node_modules/protractor/bin/webdriver-manager update

##### Running

You need to run 2 processes simultaneously, on first shell:

1. ./manage.py ./manage.py testserver --addrport 8001 ui/test/e2e/fixture.json --noinput

on the second shell:

1. cd ui
1. npm run protractor
