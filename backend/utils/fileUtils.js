const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

 const saveImage = async (req) =>  {
    const uniqueFilename = `${uuidv4()}-${req.file.originalname}`; 
    const uploadPath = path.join(__dirname, '../img', uniqueFilename);
    await fs.promises.writeFile(uploadPath, req.file.buffer); 
    return uniqueFilename;
}

module.exports = {saveImage};