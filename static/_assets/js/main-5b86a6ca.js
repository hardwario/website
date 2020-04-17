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
    })

    $(window).resize(function(){
        $('.js-menu').addClass('d-none')
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

        if($('.submenu').length>0 && $(window).width()>1199) {
            var top = $('.submenu').offset().top;
            var paddingBody = parseInt($('body').css('padding-top'));

            $(window).scroll(function () {
                if ($(window).scrollTop() > top) {
                    $('.submenu').addClass('submenu--fixed');
                    //$('body').css('padding-top',paddingBody+parseInt($('.submenu').height())+'px');
                }
                else {
                    $('.submenu').removeClass('submenu--fixed');
                    //$('body').css('padding-top',paddingBody+'px');
                }

                var hMin = $('#overview').offset().top-100;
                var hMax = parseInt($('#overview').offset().top)+parseInt($('#overview').outerHeight())-100;
                if($(window).scrollTop()>=hMin && $(window).scrollTop()<=hMax)
                {
                    $('.submenu__link--overview').addClass('active');
                }
                else
                {
                    $('.submenu__link--overview').removeClass('active');
                }

                var hMin = $('#applications').offset().top-100;
                var hMax = parseInt($('#applications').offset().top)+parseInt($('#applications').outerHeight())-100;
                if($(window).scrollTop()>=hMin && $(window).scrollTop()<=hMax)
                {
                    $('.submenu__link--applications').addClass('active');
                }
                else
                {
                    $('.submenu__link--applications').removeClass('active');
                }

                var hMin = $('#specification').offset().top-100;
                var hMax = parseInt($('#specification').offset().top)+parseInt($('#specification').outerHeight())-100;
                if($(window).scrollTop()>=hMin && $(window).scrollTop()<=hMax)
                {
                    $('.submenu__link--specification').addClass('active');
                }
                else
                {
                    $('.submenu__link--specification').removeClass('active');
                }

                var hMin = $('#order').offset().top-100;
                var hMax = parseInt($('#order').offset().top)+parseInt($('#order').outerHeight())-100;
                if($(window).scrollTop()>=hMin && $(window).scrollTop()<=hMax)
                {
                    $('.submenu__link--order').addClass('active');
                }
                else
                {
                    $('.submenu__link--order').removeClass('active');
                }

            }).scroll();
        }
    }).resize();

    ('.slick').not('.slick--2').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows:false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.slick--2').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    });
});
