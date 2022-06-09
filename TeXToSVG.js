const { mathjax } = require("mathjax-full/js/mathjax.js");
const { TeX } = require("mathjax-full/js/input/tex.js");
const { SVG } = require("mathjax-full/js/output/svg.js");
const { liteAdaptor } = require("mathjax-full/js/adaptors/liteAdaptor.js");
const { RegisterHTMLHandler } = require("mathjax-full/js/handlers/html.js");
const { AssistiveMmlHandler } = require("mathjax-full/js/a11y/assistive-mml.js");
const { AllPackages } = require("mathjax-full/js/input/tex/AllPackages.js");

const CSS = [
  "svg a{fill:blue;stroke:blue}",
  '[data-mml-node="merror"]>g{fill:red;stroke:red}',
  '[data-mml-node="merror"]>rect[data-background]{fill:yellow;stroke:none}',
  "[data-frame],[data-line]{stroke-width:70px;fill:none}",
  ".mjx-dashed{stroke-dasharray:140}",
  ".mjx-dotted{stroke-linecap:round;stroke-dasharray:0,140}",
  "use[data-c]{stroke-width:3px}",
].join("");

function TeXToSVG(str, opts) {
  const DEFAULT_OPTIONS = {
    inline: false, /* process as inline math */
    em: 16, /* em-size in pixels */
    ex: 8, /* ex-size in pixels */
    styles: true, /* include css styles for stand-alone image */
    width: 1280, /* width of container in pixels */
    container: false, /* include <mjx-container> element */
    fontCache: true, /** whether to use a local font cache or not */
    assistiveMml: false, /** whether to include assistive MathML output */
  };

  const packages = AllPackages.sort().join(", ").split(/\s*,\s*/);

  const options = opts ? { ...DEFAULT_OPTIONS, ...opts } : DEFAULT_OPTIONS;

  const adaptor = liteAdaptor();
  const handler = RegisterHTMLHandler(adaptor);
  if (options.assistiveMml) AssistiveMmlHandler(handler);

  const tex = new TeX({ packages });
  const svg = new SVG({ fontCache: (options.fontCache ? "local" : "none") });
  const html = mathjax.document("", { InputJax: tex, OutputJax: svg });

  const node = html.convert(str, {
    display: !options.inline,
    em: options.em,
    ex: options.ex,
    containerWidth: options.width,
  });

  let svgString = options.container ? adaptor.outerHTML(node) : adaptor.innerHTML(node);

  return opts.styles ? svgString.replace(/<defs>/, `<defs><style>${CSS}</style>`) : svgString;
}

module.exports = TeXToSVG;
