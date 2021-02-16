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
    if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
      $element.addClass('start');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

// Navbar adjusts when you scroll up
$window.bind('touchmove scroll', function() {
  
  //general scrolling class
  var mainTop = $("main").offset().top;
  var scrollTop = $(window).scrollTop();
  console.log(mainTop, scrollTop)
  if (scrollTop + 15 >= mainTop) {
    console.log("scrolling past");
    $('nav').addClass('nav-scrolling');
  }
  else {
    $('nav').removeClass('nav-scrolling slideup slidedown top');
  }

  if (scrollTop == 0) {
    $('nav').addClass('top');
  }

  //animations to slide up and down
  if (this.oldScroll > this.scrollY) {   
    $('nav').removeClass('slideup').addClass('slidedown');
  }
  else if (this.oldScroll < this.scrollY && $('nav').hasClass('slidedown')) { 
    $('nav').removeClass('slidedown').addClass('slideup');
  }
  this.oldScroll = this.scrollY;

});

// // Helps make full div clickable
// $(".portfolio-item").click(function() {
//   window.location = $(this).find("a").attr("href"); 
//   return false;
// });

// Responsive Navbar
$("nav .hamburger").click(function(event){
  event.preventDefault();
  // $("nav .nav-nested").toggle("slide", { direction: "right" }, 250);
  $(this).toggleClass("is-active");
  $("nav").toggleClass("is-open");
});

// Display mode toggle
$("nav #display-mode").on('change', function(event){
  // TODO - if checked - toggle
  $("body").toggleClass("alternate-mode");
});

$window.resize(function(){
    checkSize();
});

function checkSize(){
  if ($("nav .hamburger").css("display") == "none" ){
      $("nav .hamburger").removeClass("is-active");
  }
}


