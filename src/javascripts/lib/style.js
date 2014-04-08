$(function(){
  $('.ops-areas a').each(function(_, elem){
    $(elem).html('<span class="mouse-link"></span> ' + $(elem).html());
  });
});

$(function(){
  $('nav[role=main] li a').each(function(_, elem){
    $(elem).html(
      $(elem).html()+'<span class="shadow-clone">'+$(elem).text()+'</span>'
    );
  });
});
