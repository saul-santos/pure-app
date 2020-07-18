/**
 * Adds a Link element to head element.
 * @param {String} href url of css, starting from index.html file as ref
 */
export function addCss(href) {
    // Get HTML head element 
    let head = document.getElementsByTagName('HEAD')[0];

    // Create new link Element 
    let link = document.createElement('link');

    // set the attributes for link element
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;

    // Append link element to HTML head
    head.appendChild(link);
}
