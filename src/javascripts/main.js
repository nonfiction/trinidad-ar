$(function(){
  $('.next-steps .main > h4').not('#summary').each(function(id, elem){
    $(elem).next('p').toggleClass('hidden');
    $(elem).click(function(ev){
      $(ev.currentTarget).next('p').toggleClass('hidden');
    });
  });
});
