const rgbCss2Obj = (colorString, opacity=1) => {
    colorString = colorString.replace('rgb(', '');
    colorString = colorString.replace(')', '');
    colorString = colorString.replace(' ', '');
    var colorArray = colorString.split(',')

    return({
        r: parseInt(colorArray[0], 10),
        g: parseInt(colorArray[1], 10),
        b: parseInt(colorArray[2], 10),
        a: opacity,
    });
  };

export default rgbCss2Obj