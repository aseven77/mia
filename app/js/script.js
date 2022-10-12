$(document).ready(function () {
    $("input[type=tel]").mask("+7 000 000 00 00");
    const swiper = new Swiper('.similar-products-slider', {
        slidesPerView: 1,
        breakpoints: {
            767: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 4
            }
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next.similar-products-slider-btn',
            prevEl: '.swiper-button-prev.similar-products-slider-btn',
        }
    });

    const swiperReview = new Swiper('.reviews-slider', {
        slidesPerView: 1,
        breakpoints: {

            992: {
                slidesPerView: 2,
                spaceBetween: 50
            }
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next.reviews-slider-btn',
            prevEl: '.swiper-button-prev.reviews-slider-btn',
        }
    });

    $('.scrollto_item').on('click', function () {

        let href = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 370,   // по умолчанию «400» 
            easing: "linear" // по умолчанию «swing» 
        });

        return false;
    });

    $(".js-open-menu").on("click" , function() {
        $("body").toggleClass("active--menu")
    })
});


$(document).mouseup(function(e) {

    var mobileMenu = $("mobile-menu");
    if (mobileMenu.has(e.target).length === 0) {
       $("body").removeClass("active--menu")
    }


});

$(function() {
    document.getElementById('ajax-contact-form').addEventListener('submit', function(evt){
      var http = new XMLHttpRequest(), f = this;
      var th = $(this);
      evt.preventDefault();
      http.open("POST", "contact.php", true);
      http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
          if (http.responseText.indexOf(f.nameFF.value) == 0) { // очистить поля формы, если в ответе первым словом будет имя отправителя (nameFF)
            th.trigger("reset");
          }
        }
      }
      http.onerror = function() {
        alert('Ошибка, попробуйте еще раз');
      }
      http.send(new FormData(f));
    }, false);
   
  });