import sharp from "sharp";
import path from "path";

//here the user will give some text, in my mind the parameters that should be considered are:
//- font of the text, height of the text, is it italic, bold, all these will depend on the options I give to the user. So, I'll decide that while writing the code of the frontend 
//and then come back here and make the changes here.

//features right now: deafult text box with defined width and height.
//text font, and size default
//color choose- default black
//rotation-if any
//bold,italic
//where will the box appear

//how SVG allows us to rotate text- SVG allows us to rotate text element using "transform"
// <text transform="rotate(ANGLE X Y)">


//NOTE: We have to see .toFile()

const addText = async (boxWidth, boxHeight, textInput, textSize, textFont, textRotationAngle, textColor, textBold, textItalic) => {

    try {

        //this way of defining the weight and style of the text is somwthing new I have learnt today and then
        //how it is passed in the style class .title .
        const fontWeight = textBold? 'font-weight: bold;' : '';
        const fontItalic = textItalic? 'font-style:italic;': '';
        
        const x= boxWidth/2;
        const y= boxHeight/2;
        const transformAttr = textRotationAngle!==0 ? `transform = "rotate(${textRotationAngle} ${x} ${y})"`: '';

        const svgImage = `
        <svg width = "${boxWidth}" height="${boxHeight}">
        <style>
        .title {
            fill: ${textColor};
            font-family: ${textFont};
            font-size: ${textSize};
            ${fontWeight};
            ${fontItalic};
        }
        </style>
        <text x="50%" y="50%" text-anchor = "middle" class= "title" ${transformAttr}>  ${textInput}  </text>
        </svg> 
        `;
        // we have taken x, y as 50% as default right now, we have to see to it what it should be.

        const svgBuffer = Buffer.from(svgImage);
        const image = await sharp(svgBuffer).toFile('./public/processed');

    } catch (error) {
        console.log("Error in adding text to the image: ", error);
    }


}

export default addText;