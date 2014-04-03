// Accordion - Next Steps
$(function(){
  $('.next-steps .main > h4').not('#summary').each(function(id, elem){
    $(elem).next('p').toggleClass('hidden');
    $(elem).click(function(ev){
      $(ev.currentTarget).next('p').toggleClass('hidden');
    });
  });
});

// Navigation
$(function(){
  $('nav[role=main] li a').click(function(){
    $('body').toggleClass('nav-active');
  });

  $('[href=#navigation]').click(function(){
    $('body').toggleClass('nav-active');
    return false;
  });
});

// Window Scroll
$(function(){
  $(window).on('scroll', function(){
    if ($(this).scrollTop() > 80) {
      $('body').not('.scrolled').addClass('scrolled');
    } else {
      $('body.scrolled').removeClass('scrolled');
    }
  });
});
