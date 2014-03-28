#!/usr/bin/env node

var yaml = require('js-yaml')
,   fs   = require('fs')
,   mustache = require('mustache')
,   marked = require('marked')
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

_.each(page_files, function(f){
  var page_data = util.page_meta(f);
  page_data.content = util.page_content(f);
  site.page[page_data.id] = page_data;
  site.pages.push(page_data);
});

fs.writeFileSync('build/site.json', JSON.stringify(site), 'utf8');

// Multi-pass rendering allows mustaches in page content and partials
content = template;

for (var i = 0; i < 3; i++) {
  content = mustache.render(content, site);
};

console.log(content);
