
var unixToDate = function(unixTime){
    var time = new Date(unixTime * 1000);
    var ymdhis = "";
    ymdhis += time.getUTCFullYear() + "-";
    month_oldFormat = time.getUTCMonth()+1;
    month_newFormat = (month_oldFormat > 9) ? month_oldFormat : '0' + month_oldFormat;
    ymdhis += month_newFormat + "-";
    date_oldFormat = time.getUTCDate();
    date_newFormat = (date_oldFormat > 9) ? date_oldFormat : '0' + date_oldFormat;
    ymdhis += date_newFormat;
    return ymdhis;
}



$(document).ready(function(){
  $.getJSON("bookmarks.json",function(data){
    var add_book = ''
    $.each(data, function(index, entry){
      add_book += '<li class="book">';
      add_book += '<div class="book_title">' + entry.title + '</div>';
      var time = unixToDate(entry.created);
      add_book += '<div class="book_created_time">' + 'created @ ' + time + '</div>';
      add_book += '</li>';
    });
    $('.books_container').html(add_book);
  });
});

$(document).ready(function(){
    $('input.inputtext').bind("input", function(){
      var pattern = $('input.inputtext').val();
      var reg = new RegExp(pattern, 'ig');
      $("ul.books_container div.book_title").each(function(){
          if(!$(this).text().match(reg))
            $(this).parent("li").css('display','none');
          else {
            $(this).parent("li").css('display','block');
            var str = $(this).text().replace(reg, function(word){
             return '<font class="highlight">'+word+'</font>'
            });
            $(this).html(str);
          }
      });
  });
});
