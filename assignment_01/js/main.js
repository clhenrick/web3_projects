/*
 * Web3: assignment 01 JS
 */


// Matt's HSV converter
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


 var circle = document.getElementById('circle');

 function randomSize() {
 	var m = Math.floor(Math.round()*100);
 	return m + '%';
 }

