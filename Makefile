# Command Aliases & Flags
########################################

LESSC=./node_modules/.bin/lessc
LESSFLAGS=--compress --include-path=./bower_components --source-map-less-inline
UGLIFYFLAGS=

# File lists
########################################

src_md=$(shell find src/pages -name '*.md')
jslibs=$(shell find src/javascripts/* -name '*.js')
js=$(wildcard src/javascripts/*.js)
less=$(wildcard src/stylesheets/*.less)
lesslibs=$(shell find src/stylesheets/less -name '*.less')
img_sources=$(shell find src/images -type f \! -name '.*')
bowerlibs=bower_components/jquery/dist/jquery.js \


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

build/%.ico: src/%.ico
	cp $? $@

build/images/%: src/images/%
	mkdir -p $(@D)
	cp $< $@

build/javascripts/main.min.js: $(jslibs) src/javascripts/main.js
	@ mkdir -p $(@D)
	uglifyjs $(UGLIFYFLAGS) --enclose=window:window $^ > $@

build/index.html: src/layout.mustache src/site.yml $(src_md)
	@ mkdir -p $(@D)
	./app/combine_pages.js $^ > $@

# Single File Rules
########################################

build/javascripts/lib.min.js: $(bowerlibs)
	@ mkdir -p $(@D)
	uglifyjs $(UGLIFYFLAGS) $^ > $@

build/javascripts/html5shiv.js: bower_components/html5shiv/dist/html5shiv.js
	@ mkdir -p $(@D)
	cp $^ $@

build/javascripts/css3-mediaqueries.js: bower_components/css3-mediaqueries-js/css3-mediaqueries.js
	@ mkdir -p $(@D)
	cp $^ $@

# Generated Targets
########################################

stylesheets:$(less:src/stylesheets/%.less=build/stylesheets/%.css)
javascripts: build/javascripts/lib.min.js   \
						 build/javascripts/main.min.js  \
						 jshint                         \
						 build/javascripts/html5shiv.js \
						 build/javascripts/css3-mediaqueries.js

images: $(patsubst src/images/%,build/images/%,$(img_sources)) build/favicon.ico
