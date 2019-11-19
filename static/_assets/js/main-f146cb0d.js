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
      })
});
