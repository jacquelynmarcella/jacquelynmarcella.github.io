// Navbar adjusts when you scroll
$(window).scroll(function() {
  var height = $(window).scrollTop();
  if(height  > 300) {
    $('nav').addClass('nav-scrolling');
  }
  else {
    $('nav').removeClass('nav-scrolling');
  }
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
});

$(".nav-responsive a").click(function() {
  $(".nav-responsive").toggle();
  $(".hamburger").toggleClass("is-active");
});

$(window).resize(function(){
    checkSize();
});

function checkSize(){
    if ($(".hamburger").css("display") == "none" ){
        $(".nav-responsive").hide();
        $(".hamburger").removeClass("is-active");
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
            }, 1000);
            return false;
        }
    }
});