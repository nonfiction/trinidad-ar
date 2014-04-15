// Add active class when a section is navigated to
$(function(){
  $(this).on('nav-section', function(ev, section){
    var selector = '#navigation [href="#'+section+'"]';
    $('#navigation a').removeClass('active');
    $(selector).addClass('active');
  });
});

// scroll-top event publisher
$(function(){
  $(this).on('scroll', function(){
    $(this).trigger('scroll-top', $(this).scrollTop());
  });
});

// nav-section event publisher
//
// Trigger nav-section event when any .page div reaches within
// `section_offset` pixels from the top of the screen
$(function(){
  var current_section = ''
  ,   section_offset = 200;

  $(this).on('scroll-top', function(_, top){
    var select_section = '';
    $('.page').each(function(){
      if ($(this).offset().top < (top + section_offset)) {
        select_section = $(this).attr('id');
      }
    });
    if (select_section != current_section) {
      current_section = select_section;
      $(this).trigger('nav-section', current_section);
    }
  });
});

// Override scroll handler to activate the right nav item on a direct click
// since the bottom two sections may never activate on scroll
$(function(){
  $('[href^="#/page"]').click(function(ev){
    var $page_to_activate = $(ev.currentTarget);
    function setActiveNav(){
      $('#navigation a').removeClass('active');
      $page_to_activate.addClass('active');
    }
    setTimeout(setActiveNav, 50);
  });
});
