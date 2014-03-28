# Command Aliases & Flags
########################################

LESSC=./node_modules/.bin/lessc
LESSFLAGS=--compress --include-path=./bower_components
UGLIFYFLAGS=

# File lists
########################################

src_md=$(shell find src/pages -name '*.md')
# jslibs=$(shell find src/javascripts/*/ -name '*.js')
js=$(wildcard src/javascripts/*.js)
less=$(wildcard src/stylesheets/*.less)
lesslibs=$(shell find src/stylesheets/less -name '*.less')
img_sources=$(shell find src/images -type f)
bowerlibs=bower_components/jquery/dist/jquery.js

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
	$(LESSC) $(LESSFLAGS) $< > $@

build/%.ico: src/%.ico
	cp $? $@

build/images/%: src/images/%
	mkdir -p $(@D)
	cp $< $@

build/javascripts/main.min.js: src/javascripts/main.js
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

# Generated Targets
########################################

stylesheets:$(less:src/stylesheets/%.less=build/stylesheets/%.css)
javascripts:build/javascripts/lib.min.js build/javascripts/main.min.js jshint
images: $(patsubst src/images/%,build/images/%,$(img_sources)) build/favicon.ico
