var fs = require('fs')
,   _ = require('underscore')
,   yaml = require('js-yaml')
,   marked = require('marked')
;

var slug = module.exports.slug = function(f) {
  return f.split('.').slice(0, -1).join('_').split('/').slice(2).join('_').replace(/-/g, '_');
}

var pages = {};

function loadPage(f){
  if (pages[f]) return pages[f];

  var file_contents = fs.readFileSync(f, 'utf8').toString()
  ,   page_parts = file_contents.trim().split('---')
  ;

  pages[f] = {content: '', data: ''}

  if (page_parts[0] === '') {
    page_parts.shift();
    pages[f].data = page_parts.shift();
  }
  pages[f].content = page_parts.join('---');
  return pages[f];
}

module.exports.page_meta = function(f) {
  var yml_str = loadPage(f).data;
  var data = {};
  if (yml_str) {
    data = yaml.safeLoad(yml_str);
  }
  data.slug = slug(f);
  if (!data.title) {
    data.title = slug(f).split('/').pop().replace(/[-_]/g, ' ');
    data.title = _.map(data.title.split(' '), function(w){ return w.charAt(0).toUpperCase() + w.substr(1);}).join(' ')
  }
  return data
}

module.exports.page_content = function(f) {
  var content = loadPage(f).content;
  if (content) {
    return marked(content);
  } else {
    return '';
  }
}
