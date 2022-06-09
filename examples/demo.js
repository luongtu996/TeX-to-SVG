const TeXToSVG = require("../TeXToSVG");

const myTeXEquation = "loe \\\\ k";

const options = {
    width: 1280,
    ex: 8,
    em: 16
};

const SVGEquation = TeXToSVG(myTeXEquation, options);

console.log(SVGEquation);