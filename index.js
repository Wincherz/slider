var slideItems = document.querySelectorAll('.slide');
var currentSlide = 0;
var slidesLength = slideItems.length;
var slideInterval;
var indContainer = document.querySelector('.indicators');
var indItems = document.querySelectorAll('.indicator');

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = ' ';

document.querySelector('.controls').style.display = 'inline-block';
indContainer.style.display = 'inline-block';
function gotoNSlide(n) {
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (slidesLength + n) % slidesLength;
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');

}

function gotoNextSlide() {
    gotoNSlide(currentSlide + 1);
}

function gotoPrevSlide() {
    gotoNSlide(currentSlide - 1);
}

slideInterval = setInterval(gotoNextSlide, 2000);

function pauseSlideShow () {
    if (playbackStatus){
        clearInterval(slideInterval);
        pauseBtn.innerHTML = '<i class="far fa-play-circle"></i>';
        // pauseBtn.style = 'color: rgba(255, 255, 255, 0.9);';
        playbackStatus = !playbackStatus    
    }
    
}

function playSlideShow () {
    slideInterval = setInterval(gotoNextSlide, 2000);
    pauseBtn.innerHTML = '<i class="far fa-pause-circle"></i>';
    // pauseBtn.style = 'color: rgba(255, 255, 255, 0.01);';
    playbackStatus = !playbackStatus
}

function clickPausePlayBtn () {
    if (playbackStatus) pauseSlideShow()
    else playSlideShow();
}

function clickNextBtn(){
    pauseSlideShow()
    gotoNextSlide();
}
function clickPrevBtn(){
    pauseSlideShow()
    gotoPrevSlide()
}

var pauseBtn = document.querySelector('#pause');
var nextBtn = document.querySelector('#next');
var prevBtn = document.querySelector('#prev')
var playbackStatus = true;


indContainer.addEventListener('click', (e) =>{
    if(e.target.classList.contains('indicator')){
        pauseSlideShow()
        gotoNSlide(+e.target.getAttribute('data-slide-to'))
    }
})


function pressKeyControl (e) {
    if(e.key === LEFT_ARROW) clickPrevBtn()
    else if (e.key === RIGHT_ARROW) clickNextBtn()
    else if (e.key === SPACE) clickPausePlayBtn()
}

pauseBtn.addEventListener('click', clickPausePlayBtn);
nextBtn.addEventListener('click', clickNextBtn);
prevBtn.addEventListener('click', clickPrevBtn);


document.addEventListener('keydown', pressKeyControl)