# Command Aliases & Flags
########################################

LESSC=./node_modules/.bin/lessc
LESSFLAGS=--compress --include-path=./bower_components --source-map-less-inline
UGLIFYJS=./node_modules/uglify-js/bin/uglifyjs
UGLIFYFLAGS=

# File lists
########################################

src_md=$(shell find src/pages -name '*.md')
jslibs=$(shell find src/javascripts/* -name '*.js')
js=$(wildcard src/javascripts/*.js)
less=$(wildcard src/stylesheets/*.less)
lesslibs=$(shell find src/stylesheets/less -name '*.less')
img_sources=$(shell find src/images -type f \! -name '.*')

# list of files to go into lib.js
bower_libs=bower_components/jquery/dist/jquery.js

# list of files to add to head.js
bower_head=bower_components/modernizr/modernizr.js 										 \
					 bower_components/css3-mediaqueries-js/css3-mediaqueries.js

# list of files to copy directly
bower_cp=bower_components/html5shiv/dist/html5shiv.js  \
				 bower_components/respond/src/respond.js


# General Rules
########################################

default: site

clean:
	rm -rf build/*

watch:
	fswatch src:app 'clear; make;'

serve:
	@ cd build && ../app/static_server.js

site: build/index.html assets

assets: javascripts stylesheets images

jshint: $(js)
	./node_modules/.bin/jshint $^

# Wildcard Rules
########################################

build/stylesheets/%.css: src/stylesheets/%.less $(lesslibs)
	@ mkdir -p $(@D)
	$(LESSC) $(LESSFLAGS) --source-map=$(@).map --source-map-url=`basename $(@)`.map $< > $@

build/javascripts/components/%.js: bower_components/%.js
	@mkdir -p $(@D)
	cp $< $@

build/%.ico: src/%.ico
	cp $? $@

build/images/%: src/images/%
	mkdir -p $(@D)
	cp -R src/images/* build/images/

# Single File Rules
########################################

build/index.html: src/layout.mustache src/site.yml $(src_md)
	@ mkdir -p $(@D)
	./app/combine_pages.js $^ > $@

build/javascripts/main.min.js: $(jslibs) src/javascripts/main.js
	@ mkdir -p $(@D)
	$(UGLIFYJS) $(UGLIFYFLAGS) --enclose=window:window $^ > $@

build/javascripts/lib.min.js: $(bower_libs)
	@ mkdir -p $(@D)
	$(UGLIFYJS) $(UGLIFYFLAGS) $^ > $@

build/javascripts/head.min.js: $(bower_head)
	@ mkdir -p $(@D)
	$(UGLIFYJS) $(UGLIFYFLAGS) $^ > $@

build/javascripts/polyfills/PIE.htc: src/javascripts/pie/PIE.htc
	@ mkdir -p $(@D)
	@ cp $? $@

build/javascripts/polyfills/backgroundsize.min.htc: bower_components/background-size-polyfill/backgroundsize.min.htc
	@ mkdir -p $(@D)
	@ cp $? $@

# this requires ant and is therefore seperate from the normal build process
src/javascripts/pie/PIE.htc:
	@ mkdir -p $(@D)
	cd bower_components/pie && ant
	mv bower_components/pie/build/PIE.htc src/javascripts/pie/PIE.htc
	rm -rf bower_components/pie/build

# Generated Targets
########################################

stylesheets:$(less:src/stylesheets/%.less=build/stylesheets/%.css)
javascripts: build/javascripts/lib.min.js   \
						 build/javascripts/head.min.js   \
						 build/javascripts/main.min.js  \
						 jshint                         \
						 $(bower_cp:bower_components/%.js=build/javascripts/components/%.js) \
						 build/javascripts/polyfills/PIE.htc  \
						 build/javascripts/polyfills/backgroundsize.min.htc

images: $(patsubst src/images/%,build/images/%,$(img_sources)) build/favicon.ico
