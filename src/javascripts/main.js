$(function(){
  $('.next-steps .main > h4').not('#summary').each(function(id, elem){
    $(elem).next('p').toggleClass('hidden');
    $(elem).click(function(ev){
      $(ev.currentTarget).next('p').toggleClass('hidden');
    });
  });

  var $main_nav = $('nav[role=main]');

  $('.nav-active nav[role=main] li a').click(function(){
    $('body').toggleClass('nav-active');
  });

  $('[href=#navigation]').click(function(){
    $('body').toggleClass('nav-active');
    return false;
  });
});
