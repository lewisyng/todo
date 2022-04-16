/**
 * Calculate text color based on background color
 * in order to make text readable on dark or light background
 *
 * @param hexcolor
 * @returns {string}
 */

export function calculateTextColor(hexcolor: string) {
    hexcolor = hexcolor.replace('#', '');

    /**
     * handle short form hex codes and invalid hex codes
     */
    if (hexcolor.length === 2) hexcolor += hexcolor + hexcolor;
    else if (hexcolor.length === 3) hexcolor += hexcolor;
    else if (hexcolor.length !== 6) return 'white';

    let r = parseInt(hexcolor.substring(0, 2), 16);
    let g = parseInt(hexcolor.substring(2, 4), 16);
    let b = parseInt(hexcolor.substring(4, 6), 16);

    let yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? 'black' : 'white';
}
