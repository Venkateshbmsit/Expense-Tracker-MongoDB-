const fs = require('fs');

function encodeImageToBase64(filePath) {
    try {
        const imageBuffer = fs.readFileSync(filePath);
        return imageBuffer.toString('base64');
    } catch (error) {
        console.error('Error encoding image:', error);
        return null;
    }
}

module.exports = { encodeImageToBase64 };
