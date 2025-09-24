let currentIndex = 0;
let slideCount = 12;
let slideDuration = 3000;
let slideTimer;
const captions = [
    "Sky Pond (Rocky Mountain National Park)",
    "Buffalo on the Plains (South Dakota)",
    "Garden of the Gods (Colorado Springs)",
    "Elephant Head Wild Flower (Rocky Mountain National Park)",
    "Double Rainbow (Colorado National Monument)",
    "Moose in the Wild (Grand Lake, Colorado)",
    "Camas Wild Flower (Rocky Mountain National Park)",
    "Chasm Lake (Rocky Mountain National Park)",
    "Teton Crest Trail (Grand Teton National Park)",
    "The Notch Trail (Badlands National Park)",
    "Sprague Lake (Rocky Mountain National Park)",
    "Longs Peak Trail (Rocky Mountain National Park)"
];

function showSlide(index) {
    clearTimeout(slideTimer);

    $('.slideImages').each(function (i) {
        if (i === index) {
            $(this).fadeIn(400);
        } else {
            $(this).fadeOut(400);
        }
    });

    $('#caption').fadeOut(200, function () {
        $(this).text(captions[index]).fadeIn(200);
    });

    slideTimer = setTimeout(nextSlide, slideDuration);
}


function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    showSlide(currentIndex);
}

$(document).ready(function () {
    $('.slideImages').hide();
    $('.slideImages').eq(0).show();

    slideTimer = setTimeout(nextSlide, slideDuration);

    $('#rightbutton').click(function () {
        nextSlide();
    });

    $('#leftbutton').click(function () {
        prevSlide();
    });
});
