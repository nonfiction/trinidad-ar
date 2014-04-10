// Accordion - Next Steps
$(function(){
  $('.next-steps .main > h4').each(function(id, elem){
    $(elem).next('p').toggleClass('hidden');
    $(elem).click(function(ev){
      var target = $(ev.currentTarget).next('p');
      $('.next-steps .main > h4').next('p').not(target).addClass('hidden');
      target.toggleClass('hidden');
      var random_position = function(){
        var random_50_percent = function(){
          return '5' + parseInt(Math.random() * 10)-5 + '%';
        };
        $(".next-steps").css('background-position', random_50_percent() + ' ' + random_50_percent());
      };
      setTimeout(random_position, 300);
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
