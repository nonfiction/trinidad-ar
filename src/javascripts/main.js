// Accordion - Next Steps
$(function(){

  // Slightly randomize the background-position for IE to force a refresh
  function randomizeNextSteps(){
    var background_position = [0, 50];
    var random_percent = function(){
      return parseInt(Math.random() * 5);
    };
    $(".next-steps").css(
      'background-position',
      (background_position[0] + random_percent()) +
      '% ' +
      (background_position[1] + random_percent()) +
      '%'
    );
  }

  // Handle clicks of h4's in next-steps
  $('.next-steps .main > h4').each(function(id, elem){
    $(elem).next('p').toggleClass('hidden');
    $(elem).click(function(ev){
      var target = $(ev.currentTarget).next('p');
      $('.next-steps .main > h4').next('p').not(target).addClass('hidden');
      target.toggleClass('hidden');
      setTimeout(randomizeNextSteps, 300);
    });
  });

  // run randomize to avoid large jumps on first click
  randomizeNextSteps();
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
