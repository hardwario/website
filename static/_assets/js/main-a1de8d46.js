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
    })
});
