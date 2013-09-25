/*
 * Web3: assignment 01 JS
 */


/* HSV to RGB color converter
/* @credits: https://github.com/xmatthewx/HSV-to-RGB
/*           http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately/17243070#17243070
*/
 function HSVtoRGB(h, s, br) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && br === undefined) {
        s = h.s, br = h.br, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = br * (1 - s);
    q = br * (1 - f * s);
    t = br * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = br, g = t, b = p; break;
        case 1: r = q, g = br, b = p; break;
        case 2: r = p, g = br, b = t; break;
        case 3: r = p, g = q, b = br; break;
        case 4: r = t, g = p, b = br; break;
        case 5: r = br, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}


// Generate random values for HSV input
 function randomH() {
 	var m = Math.random()*1;
 	return m;
 }

  function randomS() {
    // keeps colors from getting too light!
    // return Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(Math.random() * (1 - 0.6 + 1)) + 0.6;
 }


 function randomBr() {
    return Math.floor(Math.random() * (1 - 0.8 + 1)) + 0.8
 }

function makeColor(h,s,b) {
    var rgb = HSVtoRGB(h,s,b);
    var rgbCSS = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b +  ', 0.3' + ')';
    return rgbCSS;
}


// store shape divs in a variable
var shape = document.getElementsByTagName("div");

// on click change the shape's color using the HSVtoRGB()
/**** currently returning a NaN error for the newColor function call :/ ****/
for (i=0; i < shape.length; i++){
    console.log(shape[i]);
    // on click do some cool stuff
    shape[i].onclick = function(){
        console.log("clicked");

        // making the brightness 100 each time keeps the colors looking fresher :)
        newColor = makeColor(randomH(), randomS(), 1)

        this.style.background=newColor;

        // test
        console.log(this.style.background=newColor)
    }

}



// use jquery method of grabbing width and height of elements
cWidth = $( "#circle").width();

rWidth = $("#square").width();
rHeight = $("#square").height();

console.log( "Circle diameter: " + cWidth + ", Square width: " + rWidth + " Square height: " + rHeight);