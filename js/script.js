$( document ).ready(function() {
  $('.header-content').toggleClass("active");
})

// Animation when item is in view
var $animation_elements = $('.transition');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('start');
    } else {
      $element.removeClass('start');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

// Navbar adjusts when you scroll up
$window.scroll(function() {
  if (this.oldScroll > this.scrollY && $(window).scrollTop() > 60) {   
    setTimeout(function(){ 
      $('nav').addClass('nav-scrolling');
    }, 500);
  }
  else {
    $('nav').removeClass('nav-scrolling');
  }
  this.oldScroll = this.scrollY;

});

// Helps make full div clickable
$(".portfolio-item").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});

// Responsive Navbar
$(".hamburger").click(function(event){
  event.preventDefault();
  $(".nav-responsive").toggle("slide", { direction: "right" }, 500);
  $(".hamburger").toggleClass("is-active");
  $("nav").toggleClass("is-open");
});

$(".nav-responsive a").click(function() {
  $(".nav-responsive").toggle();
  $(".hamburger").toggleClass("is-active");
  $("nav").toggleClass("is-open");
});

$window.resize(function(){
    checkSize();
});

function checkSize(){
    if ($(".hamburger").css("display") == "none" ){
        $(".nav-responsive").hide();
        $(".hamburger").removeClass("is-active");
        $(".nav-home").removeClass("is-open");
    }
}

// Smooth scrolling
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top - 65
            }, 300);
            return false;
        }
    }
});

