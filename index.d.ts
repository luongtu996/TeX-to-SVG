declare module "tex-to-svg" {
    interface options {
      inline?: boolean; // Process as inline math
      em?: number; // Em-size in pixels
      ex?: number; // Ex-size in pixels
      styles?: boolean; // Include CSS styles for stand-alone image
      width?: number; // Width of container in pixels
      container?: boolean; // Include <mjx-container> element
      fontCache?: boolean; // Whether to use a local font cache or not
      assistiveMml?: boolean; // Whether to include assistive MathML output
    }

    function TeXToSVG(str: string, opts?: options): string;
    export default TeXToSVG;
}
