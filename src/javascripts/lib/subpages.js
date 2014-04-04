$(function(){
  $('.subpages').each(function(_, parent){
    var $$ = $(parent);

    $('.subpage', $$).not(':first-child').addClass('hidden');

    $('.subpage-nav a').click(function(ev){
      var id = $(this).attr('href'),
          $target = $(id, $$);

      ev.preventDefault();

      $('.subpage', $$).not(id).addClass('hidden');
      $target.removeClass('hidden');

      // scroll back up on small screens
      if ($(window).height() < $target.height()){
        $(window).scrollTop($target.offset().top - 90);
      }
      return false;
    });
  });
});
