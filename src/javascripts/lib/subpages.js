$(function(){
  $('.subpages').each(function(_, parent){
    var $$ = $(parent);
    $('.subpage', $$).not(':first-child').addClass('hidden');

    $('.subpage-nav a[href="#next"]', $$).click(function(ev){
      ev.preventDefault();
      var next_page = $('.subpage', $$).not('.hidden').next('.subpage');
      if (next_page.length){
        $('.subpage', $$).addClass('hidden');
        next_page.removeClass('hidden');
      }
    });

    $('.subpage-nav a[href="#back"]', $$).click(function(ev){
      ev.preventDefault();
      var prev_page = $('.subpage', $$).not('.hidden').prev('.subpage');
      if (prev_page.length){
        $('.subpage', $$).addClass('hidden');
        prev_page.removeClass('hidden');
      }
    });
  });
});
