#!/usr/bin/env node

var yaml = require('js-yaml')
,   fs   = require('fs')
,   mustache = require('mustache')
,   _ = require('underscore')
,   util = require('./util')
,   usage = "Usage: layout.mustache site.yml [page.md, ...]"
,   args = process.argv.slice(2)
;

if (args.length < 3){
  console.log(usage);
  process.exit(1);
}

var template = fs.readFileSync(args[0], 'utf8').toString()
,   site = yaml.safeLoad(fs.readFileSync(args[1], 'utf8').toString())
,   page_files = args.slice(2)
;

site.pages = [];
site.page = {};
site.partials = {};
site.contents = {};

_.each(page_files, function(f){
  var page_data = util.page_meta(f);
  page_data.content = util.page_content(f);
  if (page_data.partial) {
    site.partials[page_data.id] = page_data.content;
  } else {
    site.page[page_data.id] = page_data;
    site.pages.push(page_data);
  }
  site.contents[page_data.id] = page_data;
});

fs.writeFileSync('build/site.json', JSON.stringify(site), 'utf8');

// Multi-pass rendering allows mustaches in page content and partials
var content = mustache.render(template, site, site.partials);
console.log(mustache.render(content, site, site.partials));
