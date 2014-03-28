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
bowerlibs=bower_components/jquery/dist/jquery.js

# General Rules
########################################

default: site

clean:
	rm -rf build/*
	rm -rf .tmp

site: build/index.html assets

assets: javascripts stylesheets

jshint: $(js)
	./node_modules/.bin/jshint $^

# Wildcard Rules
########################################

build/stylesheets/%.css: src/stylesheets/%.less $(lesslibs)
	@ mkdir -p `dirname $@`
	$(LESSC) $(LESSFLAGS) $< > $@

build/javascripts/main.min.js: src/javascripts/main.js
	@ mkdir -p `dirname $@`
	uglifyjs $(UGLIFYFLAGS) --enclose=window:window $^ > $@

build/index.html: src/layout.mustache src/site.yml $(src_md)
	@ mkdir -p `dirname $@`
	./app/combine_pages.js $^ > $@

# Single File Rules
########################################

build/javascripts/lib.min.js: $(bowerlibs)
	@ mkdir -p `dirname $@`
	uglifyjs $(UGLIFYFLAGS) $^ > $@

# Generated Targets
########################################

stylesheets:$(less:src/stylesheets/%.less=build/stylesheets/%.css)
javascripts:build/javascripts/lib.min.js build/javascripts/main.min.js jshint
