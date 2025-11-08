document.addEventListener("DOMContentLoaded", function() { 
    let slider = {
        $slider: document.getElementById('slider'),
        $slideScrollable: document.querySelector('.slider--slides'),
        $slideItems: document.querySelectorAll('.slider--slide'),
        $scrollButtons: document.querySelectorAll('.slider--controls button'),
        $scrollNext: document.getElementById('slider-next'),
        $scrollPrev: document.getElementById('slider-prev'),
        slideCount: document.querySelectorAll('.slider--slide').length
    }

    function setScrollIncrement(slider) {
        // Based on slide visibility and number of slides, figure out scroll distance
        let slideWidth = slider.$slideItems[0].offsetWidth;
        let increment = 1;
        console.log(slider.directionCount, "How many in this direction");
        if (slider.slidesVisible >= 2.75) {
            // If more slides are visible, reveal more slides at once to minimize extra clicks
            increment = 2;
            // On wider containers/screens, avoid having a half-slide remaining when close to the beginning/end.
            // This can still happen on smaller containers, but not worth trying to override it because we
            // could accidentally skip a whole slide instead.
            // (This issue happens because of our choice to center slides via CSS Scroll Snap)
            if (Math.round(slider.slidesVisible) >= slider.directionCount
                && slider.directionCount >= 1) {
                increment = (slider.directionCount * 2);
            }
        }
        slider.scrollIncrement = (increment * slideWidth);
        slider.scrollToEnd = (Math.round(slider.slidesVisible) <= increment);
        console.log(slider.scrollToEnd, "scrollToEnd?");
    }

    function countSlides(direction, slider) {
        let containerWidth = slider.$slideScrollable.offsetWidth;
        let containerOffset = slider.$slideScrollable.scrollLeft;
        let slideWidth = slider.$slideItems[0].offsetWidth;
        // Count how many slides *could* be visible at once based on slide width vs container width
        slider.slidesVisible = Math.trunc((containerWidth / slideWidth) * 100) / 100;
        slider.$slideScrollable.setAttribute('data-slides-visible', slider.slidesVisible);
        // Count number of slides that are not scrolled to yet on the left or right
        // If scrolling right, counting slides that may be partially hidden to the right (slideWidth/2)
        slider.directionCount = 0;
        slider.$slideItems.forEach(function (slide, i) {
            let offset = slide.offsetLeft;
            console.log("Inside set direction count", offset, slideWidth, containerOffset, containerWidth);
            if ((direction == "right" && (offset + (slideWidth / 2) >= (containerOffset + containerWidth))) ||
                (direction == "left" && (offset < containerOffset))) {
                slider.directionCount++;
            }
        });
    }

    function disableButton(button) {
        button.classList.remove('js-enabled');
        button.setAttribute('aria-hidden', 'true');
    }

    function enableButton(button) {
        button.classList.add('js-enabled');
        button.setAttribute('aria-hidden', '');
    }

//     function handleButtonClick(direction, slider) {
//     let leftPos = slider.$slideScrollable.scrollLeft;
//     console.log("where the f are we", leftPos);

//     if (direction == 'left') {
//         if (slider.scrollToEnd) {
//             slider.$slideScrollable.scrollLeft = 0;
//         }
//         else {
//             slider.$slideScrollable.scrollLeft = leftPos - slider.scrollIncrement;
//         }
//     }
//     else {
//         if (slider.scrollToEnd) {
//             slider.$slideScrollable.scrollLeft = leftPos + slider.scrollIncrement
//         }
//         else {
//             slider.$slideScrollable.scrollLeft = leftPos + slider.scrollIncrement;
//         }
//     }
// }

    function handleButtonClick(direction, slider) {
        let scrollLeftMax = slider.$slideScrollable.scrollWidth - slider.$slideScrollable.clientWidth;
        //let scrollIncrement = scrollLeftMax / 5; //Viewport based number?
        // perhaps get number visible here and if more than 1.75?
        
        ///
        let containerWidth = slider.$slideScrollable.offsetWidth;
        // let containerOffset = slider.$slideScrollable.scrollLeft;
        let slideWidth = slider.$slideItems[0].offsetWidth;
        // Count how many slides *could* be visible at once based on slide width vs container width
        let slidesVisible = Math.trunc((containerWidth / slideWidth) * 100) / 100;

        console.log(slidesVisible, "how many visible")

        let scrollIncrement = slidesVisible > 2 ? ( Math.round(slidesVisible) * .45 ) * slideWidth : slideWidth;

        if (direction == 'left') {
            slider.$slideScrollable.scrollLeft = slider.$slideScrollable.scrollLeft - scrollIncrement;
        }
        else {
            slider.$slideScrollable.scrollLeft = slider.$slideScrollable.scrollLeft + scrollIncrement;
        }
    }

    function handleButtonVisbility(slider) {
        // var scrollLeftMax = slider.$slideScrollable.scrollWidth - slider.$slideScrollable.clientWidth;
        // var scrollLeftCurrent = slider.$slideScrollable.scrollLeft;

        // let slideWidth = slider.$slideItems[0].offsetWidth;
        // let firstSlideLeft = slider.$slideItems[0].offsetLeft;

        // console.log(scrollLeftCurrent, scrollLeftMax, slideWidth, firstSlideLeft);


        // if (scrollLeftCurrent + 48 >= scrollLeftMax) {
        //    disableButton(slider.$scrollNext);
        // }
        // if (scrollLeftCurrent - 48< scrollLeftMax) {
        //    enableButton(slider.$scrollNext);
        // }
        // if (scrollLeftCurrent < firstSlideLeft) {
        //    disableButton(slider.$scrollPrev);
        // }
        // if (scrollLeftCurrent > 0) {
        //    enableButton(slider.$scrollPrev);
        // }
    }

    function scrollToPreferredSlide() {
        // Specific slide - want the focus to be on current "Senior FE Engineer II" role on load
        // Magic numbers for now because content is rigid
        let preferredSlide = slider.$slideItems[9];
        let scrollLeftMax = slider.$slideScrollable.scrollWidth - slider.$slideScrollable.clientWidth;
        let scrollIncrement = scrollLeftMax / 10;
        let scrollLeft = scrollLeftMax - scrollIncrement;
        console.log(scrollLeft);
        slider.$slideScrollable.scrollLeft = scrollLeft;

    }


    handleButtonVisbility(slider);
    scrollToPreferredSlide();

    slider.$scrollNext.addEventListener("click", function(e) {
        // countSlides("right", slider);
        // setScrollIncrement(slider);
        handleButtonClick("right", slider);
        handleButtonVisbility(slider);
    });

    slider.$scrollPrev.addEventListener("click", function(e) {
        // countSlides("left", slider);
        // setScrollIncrement(slider);
        handleButtonClick("left", slider);
        handleButtonVisbility(slider);
    });

});





    ///// TODO:


// function setScrollIncrement(slider) {
//     // Based on slide visibility and number of slides, figure out scroll distance
//     let slideWidth = slider.$slider.find('.slides > div').first().width();
//     let increment = 1;
//     if (slider.slidesVisible >= 2.75) {
//         // If more slides are visible, reveal more slides at once to minimize extra clicks
//         increment = 2;
//         // On wider containers/screens, avoid having a half-slide remaining when close to the beginning/end.
//         // This can still happen on smaller containers, but not worth trying to override it because we
//         // could accidentally skip a whole slide instead.
//         // (This issue happens because of our choice to center slides via CSS Scroll Snap)
//         if (Math.round(slider.slidesVisible) >= slider.directionCount
//             && slider.directionCount >= 1) {
//             increment = (slider.directionCount * 2);
//         }
//     }
//     slider.scrollIncrement = (increment * slideWidth);
// }

// function countSlides(direction, slider) {
//     let containerWidth = slider.$slideScrollable.width();
//     let containerOffset = slider.$slideScrollable.offset().left;
//     let slideWidth = slider.$slider.find('.slides > div').first().width();
//     // Count how many slides *could* be visible at once based on slide width vs container width
//     slider.slidesVisible = Math.trunc((containerWidth / slideWidth) * 100) / 100;
//     slider.$slideScrollable.attr('data-slides-visible', slider.slidesVisible);
//     // Count number of slides that are not scrolled to yet on the left or right
//     // If scrolling right, counting slides that may be partially hidden to the right (slideWidth/2)
//     slider.directionCount = 0;
//     slider.$slideItems.each(function (index, slide) {
//         let offset = $(this).offset().left;
//         if ((direction == "right" && (offset + (slideWidth / 2) >= (containerOffset + containerWidth))) ||
//             (direction == "left" && ($(this).offset().left < containerOffset))) {
//             slider.directionCount++;
//         }
//     });
// }





// function labelSlides(slider, slide, index) {
//     // Add slide count label for a11y
//     var labelString = Drupal.t('Slide @current of @total', { '@current': index + 1, '@total': slider.slideCount });
//     $(slide)
//         .attr('aria-label', labelString)
//         .attr('data-slide', index + 1);
// }

// // For each slider on the page, attach all event handling

 

//     slider.$slideScrollable.setAttribute('data-slides-total', slider.slideCount);
//     slider.$slideItems.each(function (index, slide) {
//         labelSlides(slider, slide, index);
//     });

//     slider.$scrollButtons.on("touchstart click", function (e) {
//         let direction = document.querySelector(e.currentTarget).getAttribute('data-direction');
//         countSlides(direction, slider);
//         setScrollIncrement(slider);
//         handleButtonClick(direction, slider);
//         handleButtonVisbility(slider);
//     });
//     slider.$slideExpand.on("touchstart click", function (e) {
//         // setTimeout(function () {
//         //     handleButtonVisbility(slider);
//         // }, 500);
//     });
//     slider.$slideScrollable.on("scroll", function (e) {
//         // handleButtonVisbility(slider);
//     });
//     $(window).on("resize", function () {
//         // handleButtonVisbility(slider);
//     });


