const $ = e => document.querySelector(e);

const quotesInput = $('#quotes-input');
const nameInput = $('#name-input');
const quotes = $('#quotes');
const name = $('#name');
const BG = $('.bg');

$('#generate').onclick = function () {
    const newQuotes = quotesInput.value;
    const newName = nameInput.value;
    if (newQuotes.match(/\w/) || newName.match(/\w/)) {
        quotes.innerHTML = newQuotes;
        name.innerHTML = newName;
    }
}
//random BG
function randomBG() {
    var randomBG = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    BG.style.background = randomBG;
}
//randomBG on page load
randomBG();
$('#change-bg').onclick = function () {
    randomBG();
}
BG.onclick = function () {
    randomBG();
    $('#download').disabled = true;
}
$('#save').onclick = function () {
    html2canvas(BG, { x: BG.offsetLeft, y: BG.offsetTop }).then((canvas) => {
        const imgData = canvas.toDataURL();
        $('a').href = imgData;
    })
    $('#download').disabled = false;
}
$('#preview').onclick = function () {
    //preview current img
    scrollTo(0, $('#canvas').offsetTop);
    html2canvas(BG, { x: BG.offsetLeft, y: BG.offsetTop }).then((canvas) => {
        $('.preview').style.display = null;
        $('#canvas').appendChild(canvas);
    })
}
//font size
$('#fontSlider').oninput = function () {
    $('#download').disabled = true;
    const fontSize = this.value + 'px';
    quotes.style.fontSize = fontSize;
}
quotes.style.fontSize = $('#fontSlider').value + 'px';

//reset download btn
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.oninput = function () {
        $('#download').disabled = true;
        $('#generate').disabled = false;
    }
})

//change font color
$('.color-white').onclick = function () {
    BG.style.color = "white";
}
$('.color-default').onclick = function () {
    BG.style.color = "black";
}
//fontfamily
const fontList = $('#fontFamily');
fontList.oninput = function () {
    $('#download').disabled = true;
    const fontFamily = fontList.options[fontList.selectedIndex].value;
    quotes.style.fontFamily = fontFamily;
    name.style.fontFamily = fontFamily;
}
//letterspacing
$('#letterSpacing').oninput = function () {
    quotes.style.letterSpacing = this.value + 'px';
    $('#download').disabled = true;
}
//fontweight
const fontWeightList = $('#fontWeightList');
fontWeightList.oninput = function () {
    quotes.style.fontWeight = this.options[this.selectedIndex].value;
    $('#download').disabled = true;
}