// ここからモーダル
// http://coolwebwindow.com/jquery-lab/archives/304
$(function(){
    // 「.modal-open」をクリック
    $('.modal-open').click(function(){

$('body').addClass('modal');
var current_scrollY;
current_scrollY = $( window ).scrollTop();
if ($(this).css("display") !== "none") {
    $('body').css({
        position: 'fixed',
        width: '100%',
        top: -1 * current_scrollY
    });
}
if($('.modal-content .bxslider_02').length){
    var _width = $('.modal-content .bxslider_02 li img').first().width();
    var _height = $('.modal-content .bxslider_02 li img').first().height();
    var _height_cont = $('.modal-content .bxslider_02 li .slide_cont_inner .content_block').first().height();
    var _cont_width = $('.modal-content').first().width();
    var _cont_height = $('.modal-content').height();
    $('.modal-content .bx-viewport .bxslider_02 li').width(_cont_width);
    $('.modal-content .bx-viewport').height(_height * 1.2);
}

        // オーバーレイ用の要素を追加
        $('body').append('<div class="modal-overlay"></div>');
        // オーバーレイをフェードイン
        $('.modal-overlay').fadeIn('slow');

        // モーダルコンテンツのIDを取得
        var modal = '#' + $(this).attr('data-target');
        // モーダルコンテンツの表示位置を設定
        modalResize();
         // モーダルコンテンツフェードイン
         $(modal).fadeIn('slow');

        // 「.modal-overlay」あるいは「.modal-close」をクリック
        $('.modal-overlay, .modal-close').off().click(function(){

            $( 'body' ).attr( { style: '' } );
            $( 'body' ).removeClass('modal');
            $( 'html, body' ).prop( { scrollTop: current_scrollY } );
            
            // モーダルコンテンツとオーバーレイをフェードアウト
            $(modal).fadeOut('slow');
            $('.modal-overlay').fadeOut('slow',function(){
                // オーバーレイを削除
                $('.modal-overlay').remove();
              });
          });

        // リサイズしたら表示位置を再取得
        $(window).on('resize', function(){
          modalResize();
        });

        // モーダルコンテンツの表示位置を設定する関数
        function modalResize(){
            // ウィンドウの横幅、高さを取得
            var w = $(window).width();
            var h = $(window).height();

            // モーダルコンテンツの表示位置を取得
            var x = (w - $(modal).outerWidth(true)) / 2;
            var y = (h - $(modal).outerHeight(true)) / 2;

            // モーダルコンテンツの表示位置を設定
            $(modal).css({'left': x + 'px','top': y + 'px'});
          }

        });
});
// modal-links hover時のテキスト
$(function(){
    var target = $('.bxslider_02 li:first-child .slide_cont_inner');
    array_modal_title = [];
    array_modal_catch = [];

    for (var i = 0; i < target.length; i++) {
        array_modal_title.push(target.eq(i).find('.content_title.js').text());
        array_modal_catch.push(target.eq(i).find('.content_block .catch').html());
    }
console.log(array_modal_title);
console.log(array_modal_catch);

    $('.modal-links a.modal-open').each(function(i, el) {
        $(this).on('mouseenter', function(event) {
            $(this).prepend('<span class="hover_text">' + array_modal_title[i] + '<span class="detail">' + array_modal_catch[i] + '</span></span>');
        });
        $(this).on('mouseleave', function(event) {
            $(this).find('span').remove();
        });
    });
});



// ページ下部に固定の実装中　最後のセクションでは矢印画像変える
$(function(){
    var page_section = $('.section');
    var section_array = [];
    for (var i = 0; i < page_section.length; i++) {
        section_array.push(page_section.eq(i).attr('id'));
    }
console.log('section_array: ' + section_array);

    $('.under_nav a').on('click',function(event) {
        var current_section = $('#fixed-nav li').index($('.current'));
        // $(this).attr('href','#' + section_array[current_section + 1]);
console.log('current_section: ' + current_section);
        if ($('body:not(:animated)')){
            if (current_section + 1 == page_section.length) {
                var start = $('body').offset().top;
                $('html,body').animate({ scrollTop: start }, 700, 'swing');
                console.log('start: ' + start);
            } else {
                var section_position = page_section.eq(current_section + 1).offset().top;
                $('html,body').animate({ scrollTop: section_position }, 700, 'swing');
                console.log('section_position' + section_position);
            }
            event.preventDefault();
        }
    });
    $(window).on("scroll", function() {
        // ドキュメントの高さ
        scrollHeight = $(document).height();
        // ウィンドウの高さ+スクロールした高さ→ 現在のトップからの位置
        scrollPosition = $(window).height() + $(window).scrollTop();
        // 最後のsectionの高さ
        lastHeight = page_section.eq(page_section.length - 1).height();

        // スクロール位置が最後のsectionまで来たら
        if (scrollHeight - scrollPosition <= lastHeight) {
            // ページトップリンクを最後のsectionに固定
            $(".under_nav").addClass('last');
        } else {
            $(".under_nav").removeClass('last');
        }

        footerHeight = $('#footer').height();
        if (scrollHeight - scrollPosition <= footerHeight) {
            $(".under_nav").fadeOut('slow');
        } else {
            $(".under_nav").fadeIn('slow');
        }
    });
});

// スライドupdown 右側のBOXを逆順にさせる　IE10でflex column-reverseが効かないため
jQuery(function($) {
    var list = $('.updown_slide .right .inner').toArray().reverse();
    $('.updown_slide .right').empty().append(list);
});

// スライドupdown
$(function(){
    var updown_slide = $('.updown_outer .updown_slide');
    var updown_nav = $('.updown_outer .nav');
    var nav_list = updown_nav.find('.list');
    var inner = $('.updown_slide .left .inner');
    var each_height = inner.outerHeight();

// 配列に高さ位置の情報を格納
    var inner_high_array_l = [];
    var inner_high_array_r = [];
    for (var i = 0; i < inner.length; i++) {
        if ( i === 0 ) {
            inner_high_array_l.push(each_height * inner.length - each_height + 20 * (inner.length - 1) );
        } else {
            inner_high_array_l.push((each_height * inner.length - each_height) + each_height * i + 20 * (inner.length - 1 + i));
        }
    }
console.log('left : ' + inner_high_array_l);

    for (var i = 0; i < inner.length; i++) {
        inner_high_array_r.unshift(each_height * i + (20 * i));
    }
console.log('right : ' + inner_high_array_r);

// 初期位置設定
    $('.updown_slide .left , .updown_slide .right').height(each_height * inner.length + 20 * inner.length );
    // $('.left',updown_slide).css({top:-inner_high_array_l[0] , marginTop: (each_height * inner.length - each_height) + 'px' });
    $('.left',updown_slide).css({top:-inner_high_array_l[0] , marginTop: inner_high_array_l[0] });
    $('.right',updown_slide).css('top',-inner_high_array_r[0] + 'px');

// animation
    nav_list.on('click',function(e) {
        var target_index = nav_list.index(this);
console.log(target_index);
        
        var target = $('.updown_slide .left .inner').eq(target_index);
        var target2 = $('.updown_slide .right .inner').eq(target_index);
        var target_nav = nav_list.eq(target_index);

console.log(target);
console.log(target2);

        if(!target.hasClass('current')){
            $('.left')
            .animate({'opacity':'0.9'},1)
            .animate({
                // marginTop: - (each_height * target_index) + 'px',
                top: -inner_high_array_l[target_index],
                opacity: '1'

                },800,function(){
                    // $('.left .inner').css({top:'0',opacity:'1'});
                    $('.left .inner').removeClass('current'); //いったん全部消す
                    target.addClass('current');
                    nav_list.removeClass('current');
                    target_nav.addClass('current');
                }
            );
        }
        if(!target2.hasClass('current')){
            $('.right')
            .animate({'opacity':'0.9'},1)
            .animate({
                // marginTop: - (each_height * target_index) + 'px',
                // top: '445px',
                top: -inner_high_array_r[target_index],
                opacity: '1'

                },800,function(){
                    // $('.right .inner').css({top:-each_height * target_index});
                    // $('.right').css('marginTop', (-each_height-445) * target_index -20 + 'px');
                    $('.right .inner').removeClass('current'); //いったん全部消す
                    target2.addClass('current');

                }
            );
        }
    });

});



// modal 内の画像切替え
$('#page02 .content').each(function(){
    var img_switch = $('.img_switch',this);
    var img_pager = $('.img_pager a',this);

    img_pager.on('click',function(e){
        var img_index = $(this).attr('data-img-index');
        if (img_switch.eq(img_index).css("display") == "none") {
            img_switch.removeClass('current').hide();
            img_switch.eq(img_index).fadeIn().addClass('current');
        }
        e.preventDefault();
    });
});

// modal-links hover時のテキスト
$(function(){
    var target = $('.pageArea .content');
    array_modal_title = [];
    array_modal_catch = [];

    for (var i = 0; i < target.length; i++) {
        array_modal_title.push(target.eq(i).find('.content_title.js').text());
        array_modal_catch.push(target.eq(i).find('.catch').html());
    }
console.log(array_modal_title);
console.log(array_modal_catch);

    $('.gallery li a.fancybox:not(.no_js)').each(function(i, el) {
        $(this).on('mouseenter', function(event) {
            $(this).prepend('<span class="hover_text">' + array_modal_title[i] + '<span class="detail">' + array_modal_catch[i] + '</span></span>');
        });
        $(this).on('mouseleave', function(event) {
            $(this).find('span').remove();
        });
    });
});






