This is test repository for simple AngularJS/Django application.

Since this is my first Django application, things are probably not as clean as they could be. Especially packaging & depedencies - currently you need to install django-tastypie and psycopg2 manually, whereas some packaging (setup.py?) is probably the conventional way to do it.

The directory structure could be improved probably, especially on ui app, as mixing .py, .pyc, package.json, Gruntfile and others into same folder isnt the most elegant solution, for sure.

UI code is some mix between production and development, mostly done this way out of simple convenience instead of long-term maintanability goals. E.g. JS files are concatenated (but not minified), whereas CSS resources are still referenced multiple times from index.html.

For simplicity (and due to lack of such requirement) no authentication/authorization was added.

In real application paging should be added as well, to not return list of all products in one go.

