// Accordion - Next Steps
$(function(){
  $('.next-steps .main > h4').each(function(id, elem){
    $(elem).next('p').toggleClass('hidden');
    $(elem).click(function(ev){
      var target = $(ev.currentTarget).next('p');
      $('.next-steps .main > h4').next('p').not(target).addClass('hidden');
      target.toggleClass('hidden');
    });
  });
});

$(function(){
  $('.ops-areas a').prepend('<i class="mouse-link">');
});

$(function(){
  $('nav[role=main] li a').each(function(_, elem){
    $(elem).append($('<span class="shadow-clone">').text($(elem).text()));
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
