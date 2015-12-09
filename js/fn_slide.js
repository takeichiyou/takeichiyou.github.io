
// ver 2
$(function(){
  var nowId = 1,
  icolist   = $('.ver2 #icolist ul'),
  nav       = $('.ver2#nav'),
  my_prev   = $('.ver2 #my_prev'),
  my_next   = $('.ver2 #my_next');

  my_next.click(function(){
    if(nowId == 5){
      $('li:visible',icolist).fadeOut();
      $('li',icolist).first().fadeIn();
      $('span.selected',nav).removeClass('selected');
      $('span',nav).first().addClass('selected');
      nowId = 1 ;

    } else {
      icolist.children('li:visible').fadeOut().next().fadeIn();
      nav.children('span.selected').removeClass('selected').next().addClass('selected');
      nowId ++ ;
    }
    console.log(nowId);
  });

  my_prev.click(function(){
    if(nowId == 1){
      $('li:visible',icolist).fadeOut();
      $('li',icolist).last().fadeIn();
      $('span.selected',nav).removeClass('selected');
      $('span',nav).last().addClass('selected');
      nowId = 5 ;

    } else {
      icolist.children('li:visible').fadeOut().prev().fadeIn();
      nav.children('span.selected').removeClass('selected').prev().addClass('selected');
      nowId -- ;
    }
    console.log(nowId);
  });
// 丸アイコンクリックでも動作　追加
  $('span',nav).click(function(){
    var iconNum = $('span',nav).index(this);
    $('li',icolist).fadeOut();
    $('li',icolist).eq(iconNum).fadeIn();
    $('span.selected',nav).removeClass('selected');
    $('span',nav).eq(iconNum).addClass('selected');
    console.log(iconNum);
  });

});