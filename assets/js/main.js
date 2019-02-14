let $slides = $('.slides__item');
let $pausePlayWrap = $('<span class="indicators__pause"><i class="fas fa-play"></i></span>');
let $carousel = $('.carousel');
let $indContainer = $('<div class="indicators"></div>');
let currentSlide = 0;
let carouselInterval = 2000;

$indContainer.prepend($pausePlayWrap);
$carousel.append($indContainer);

const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const FA_PAUSE = '<i class="fas fa-pause"></i>';
const FA_PLAY = '<i class="fas fa-play"></i>';

// activate controls, if javascript is enabled
$indContainer.css('display', 'flex'); // flex
$('.controls').css('display', 'block'); // block

// BEGIN: NEW CODE
for (let i = 0; i < $slides.length; i++) {
    let $indItems = $('<span class="indicators__item"></span>');
    $indItems.attr('data-slide-to', i).text(i + 1);
    $indContainer.append($indItems);
}
// END: NEW CODE

let $indItems = $('.indicators__item');
$($indItems[0]).addClass('active');

// carousel basic engine
let gotoSlide = (n) => {
    $($slides[currentSlide]).toggleClass('active');
    $($indItems[currentSlide]).toggleClass('active');
    currentSlide = (n + $slides.length) % $slides.length;
    $($slides[currentSlide]).toggleClass('active');
    $($indItems[currentSlide]).toggleClass('active');
};

let nextSlide = () => gotoSlide(currentSlide + 1);

let previousSlide = () => gotoSlide(currentSlide - 1);

// controls
let playbackStatus = true;
let $pausePlayBtn = $('.indicators__pause');
let $nextBtn = $('.controls__next');
let $prevBtn = $('.controls__prev');
let slideInterval = setInterval(nextSlide, carouselInterval);

let pauseSlideShow = () => {
    $pausePlayBtn.html(FA_PAUSE);
    playbackStatus = false;
    clearInterval(slideInterval);
};

let playSlideShow = () => {
    $pausePlayBtn.html(FA_PLAY);
    playbackStatus = true;
    slideInterval = setInterval(nextSlide, carouselInterval);
};

let pausePlayClickHandler = () => playbackStatus ? pauseSlideShow() : playSlideShow();

let nextClickHandler = () => {
    pauseSlideShow();
    nextSlide();
};

let prevClickHandler = () => {
    pauseSlideShow();
    previousSlide();
};

$pausePlayBtn.on('click', pausePlayClickHandler);
$nextBtn.on('click', nextClickHandler);
$prevBtn.on('click', prevClickHandler);

// indicators
let indClickHandler = (e) => {
    pauseSlideShow();
    gotoSlide(+e.target.getAttribute('data-slide-to'));
};

// use delegation to optimize the event handler
$indContainer.on('click', '.indicators__item', indClickHandler);

// set keyboard controls
let keyControlHandler = (e) => {
    if (e.key === LEFT_ARROW) prevClickHandler();
    if (e.key === RIGHT_ARROW) nextClickHandler();
    if (e.key === SPACE) pausePlayClickHandler();
};

$(document).on('keydown', keyControlHandler);




