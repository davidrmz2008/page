let searchbar = document.querySelector('#search-bar');
let searchbox = document.querySelector('.search-box');
let shop = document.querySelector('#shop-cart');
let shopcart = document.querySelector('.shopping-cart');
let menubar = document.querySelector('#menu-bar');
let mynav = document.querySelector('.navbar');

var lastScrollTop = 0; // Guarda la última posición de desplazamiento

window.addEventListener("scroll", function() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Desplazamiento hacia abajo
        document.querySelector('.header').style.top = "-200px"; // Oculta el encabezado
    } else {
        // Desplazamiento hacia arriba
        document.querySelector('.header').style.top = "0"; // Muestra el encabezado
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, false);


searchbar.onclick = () =>{
    searchbox.classList.toggle('active')
}
shop.onclick = () =>{
    console.log("sadhaskjdgh")
    shopcart.classList.toggle('active');
}
menubar.onclick = () =>{
    mynav.classList.toggle('active');
}

$('.slides').slick({
    dots: false,
    infinite: false,
    autoplay:true,
    arrows:false,   
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
     
    ]
  });