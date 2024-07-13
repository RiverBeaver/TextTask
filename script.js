window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
})();

const banner = document.querySelector('.banner');

const text1 = banner.querySelector('.appeal');
const text2 = banner.querySelector('.call-action');

function startAnimation() {
    callingloweringDownTextAnimation()
}

function callingloweringDownTextAnimation() {
    let startAnimation = null;
    const endAnimation = 400;

    function loweringDownTextAnimation(time) {
        if (!startAnimation) startAnimation = time;

        const distanceText = 73;

        const progress = (time - startAnimation) / endAnimation;
        const transform = easeInOut(progress) * distanceText;

        text1.style.top = (-22.02 + transform) + 'px';
    
        if (progress <= 1) {
            requestAnimationFrame(loweringDownTextAnimation);
        } else {
            text1.style.top = '51.02px';
            callingTextMagnificationAnimation();
        }
    }

    requestAnimationFrame(loweringDownTextAnimation);
}

function callingTextMagnificationAnimation() {
    let startAnimation = null;
    const endAnimation = 500;

    function textMagnificationAnimation(time) {
        if (!startAnimation) startAnimation = time;

        const distanceScale = 0.5;

        const progress = (time - startAnimation) / endAnimation;
        const transform = easeInOut(progress) * distanceScale;

        text1.style.transform = `scale(${0.5 + transform})`;
        
        if (progress <= 1) {
            requestAnimationFrame(textMagnificationAnimation);
        } else {
            text1.style.transform = `scale(1)`;
            setTimeout(() => callingShiftingTextToRightAndImageRotationAnimaions(false), 150);
        }
    }

    requestAnimationFrame(textMagnificationAnimation);
}

const organicShapesImg = banner.querySelector('.organic-shapes-img');
const mathsBoardImg = banner.querySelector('.maths-board-img');
const schoolElementsImg = banner.querySelector('.school-elements-img');
const stationeryImg = banner.querySelector('.stationery-img');

function callingShiftingTextToRightAndImageRotationAnimaions(isBack) {
    let startAnimation = null;
    const endAnimation = 700;

    function shiftingTextToRightAndImageRotationAnimaions(time) {
        if (!startAnimation) startAnimation = time;

        const progress = (time - startAnimation) / endAnimation;

        if (!isBack) shiftingTextToRightAnimaion(progress);
        imageRotationAnimaion(progress, isBack);
    
        if (progress <= 1) {
            requestAnimationFrame(shiftingTextToRightAndImageRotationAnimaions);
        } else if (!isBack) {
            text2.style.left = '59.02px';
            setTimeout(() => callingShiftingTextToRightAndImageRotationAnimaions(true), 50);
        } else {
            organicShapesImg.style.transform = `rotate(114.98deg)`;
            mathsBoardImg.style.transform = `rotate(-12.76deg)`;
            schoolElementsImg.style.transform = `rotate(6.43deg)`;
            stationeryImg.style.transform = `rotate(0deg)`;
        }
    }

    requestAnimationFrame(shiftingTextToRightAndImageRotationAnimaions);
}

function shiftingTextToRightAnimaion(progress) {
    const distanceText = 282;

    const translate = easeInOut(progress) * distanceText;
    text2.style.left = (-223.02 + translate) + 'px';
}

function imageRotationAnimaion(progress, isBack = false) {
    if (!isBack) {
        imageRotation(progress, organicShapesImg, 45, 114.98);
        imageRotation(progress, mathsBoardImg, -47, -12.76);
        imageRotation(progress, schoolElementsImg, 46, 6.43);
        imageRotation(progress, stationeryImg, -46, 0);
    } else {
        imageRotation(progress, organicShapesImg, -45, 159.939);
        imageRotation(progress, mathsBoardImg, 47, -59.7176);
        imageRotation(progress, schoolElementsImg, -46, 52.3885);
        imageRotation(progress, stationeryImg, 46, -46);
    }
}

function imageRotation(progress, elem, distanceRotation, startPosition) {
    const translate = easeInOut(progress) * distanceRotation;
    elem.style.transform = `rotate(${startPosition + translate}deg)`;
}

function easeInOut(time) {
    return 0.5 * (1 - Math.cos(Math.PI * time));
}

startAnimation();