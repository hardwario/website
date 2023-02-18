$(function(){
    // if($('.slick1').length>0)
    // {
    //     $('.slick1').slick({
    //         infinite: true,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         autoplay: false,
    //         arrows: true,
    //         dots: false,
    //         infinite: true,
    //         fade: true
    //     });
    // }

    $('.js-formenu').click(function(){
        $('.js-menu').toggleClass('d-none')
    });

    $('.js-forsubmenu').click(function(){
        $('.js-submenu').toggleClass('d-none')
    });

    $(window).resize(function(){
        $('.js-menu').addClass('d-none');
        $('.js-submenu').addClass('d-none');
    });

    $(".collapsor__item").length > 0 && $(".collapsor__item").each(function() {
        var e = $(this);
        e.find(".collapsor__header").click(function() {
            e.siblings().find(".collapsor__body").slideUp(function() {
                $(this).parents(".collapsor__item").find(".collapsor__header").removeClass("collapsor__header--active"), $(this).removeClass("collapsor__body--active")
            }), $(this).toggleClass("collapsor__header--active"), e.find(".collapsor__body").slideToggle(function() {
                $(this).toggleClass("collapsor__body--active")
            })
        })
      });


      $(window).resize(function(){
        if($(window).width()<992)
        {
            $('.navtop__link').unbind('click');
            $('.navtop__link').on('click',function(e){
                var obj = $(this);
                if($(this).parent().find('.navtop__submenu').length>0)
                {
                    if($(this).parent().find('.navtop__submenu').hasClass('active')) {
                        $(this).parent().find('.navtop__submenu').removeClass('active').hide();
                        obj.removeClass('navtop__link--active');
                    }
                    else {
                        $(this).parent().find('.navtop__submenu').addClass('active').show();
                        obj.addClass('navtop__link--active');
                    }
                    return false;
                }
            })
        }

        var playerReady = null;
        $(window).scroll(function () {
            if($('#playerArea').length>0 && $(window).width()>1199) {
                var hMin = $('#playerArea').offset().top - 100;
                var hMax = parseInt($('#playerArea').offset().top) + parseInt($('#playerArea').outerHeight()) - 100;

                if(playerReady==null) {
                    if ($(window).scrollTop() >= hMin && $(window).scrollTop() <= hMax) {
                        $("#player").YTPStop().YTPPlay();
                        playerReady = 1;
                    }
                }
            }
        }).scroll();

        
    }).resize();
});
