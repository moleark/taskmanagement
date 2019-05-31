import * as React from 'react';
import { Image } from 'tonva';
var imagePath = "http://www.jkchemical.com/static/Structure/";
var altimagePath = "http://www.jkchemical.com/static/Structure/999.png";
export function ProductImage(props) {
    var style = props.style, className = props.className, chemicalId = props.chemicalId;
    return React.createElement(Image, { src: chemicalId && (imagePath + chemicalId.substr(0, 3) + '/' + chemicalId + '.png'), style: style, className: className, altImage: altimagePath });
}
//# sourceMappingURL=productImage.js.map