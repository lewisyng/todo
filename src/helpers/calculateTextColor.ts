/**
 * covert rgb component to hex
 *
 * @param c
 * @returns {string}
 */
function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

/**
 * convert rgb to hex
 *
 * @param rgb
 * @returns {string}
 */
function rgbToHex(rgb: string) {
    let r = parseInt(rgb.substring(4, rgb.indexOf(',')));
    let g = parseInt(rgb.substring(rgb.indexOf(',') + 1, rgb.lastIndexOf(',')));
    let b = parseInt(rgb.substring(rgb.lastIndexOf(',') + 1, rgb.length - 1));

    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function cssVariableToHex(cssVariable: string, ref?: React.RefObject<any>) {
    if (ref) {
        let hex = getComputedStyle(ref.current)
            .getPropertyValue(cssVariable.substring(4, cssVariable.length - 1))

        return hex.substring(2);
    }

    return '';
}

/**
 * Calculate text color based on background color
 * in order to make text readable on dark or light background
 *
 * @param hexcolor
 * @returns {string}
 */
export function calculateTextColor(color: string, ref?: React.RefObject<any>) {
    let hexcolor = color || 'white';
    if (!color) return 'white';

    /**
     * check if color comes in css variable format and covert to hex if so
     */
    if (ref && color.indexOf('var(') > -1) {
        hexcolor = cssVariableToHex(color, ref);
    }

    /**
     * check if color comes in rgb format and convert to hex if so
     */
    if (color.substring(0, 3) === 'rgb') {
        hexcolor = rgbToHex(color);
    }

    /**
     * handle short form hex codes and invalid hex codes
     */
    hexcolor = hexcolor.substring(1)
    if (hexcolor.length === 2) hexcolor += hexcolor + hexcolor;
    else if (hexcolor.length === 3) hexcolor += hexcolor;
    else if (hexcolor.length !== 6) return 'white';

    let r = parseInt(hexcolor.substring(0, 2), 16);
    let g = parseInt(hexcolor.substring(2, 4), 16);
    let b = parseInt(hexcolor.substring(4, 6), 16);

    let yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? 'black' : 'white';
}
