// Add .scrolled class once the window has scrolled
// `scroll_limit` pixels
$(function(){
  var scroll_limit = 80;

  $(this).on('scroll-top', function(_, top){
    if (top > scroll_limit) {
      $('body').not('.scrolled').addClass('scrolled');
    } else {
      $('body.scrolled').removeClass('scrolled');
    }
  });
});

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
