$(function(){
  $('.ops-areas a').prepend('<span class="mouse-link">');
});

$(function(){
  $('nav[role=main] li a').each(function(_, elem){
    $(elem).append($('<span class="shadow-clone">').text($(elem).text()));
  });
});
