const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

 const saveImage = async (req, paths) =>  {
    const uniqueFilename = `${uuidv4()}-${req.file.originalname}`; 
    const uploadPath = path.join(__dirname, '../img/' + paths, uniqueFilename);
    await fs.promises.writeFile(uploadPath, req.file.buffer); 
    return uniqueFilename;
}
const saveImageByFile = async (file, paths) =>  {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`; 
    const uploadPath = path.join(__dirname, '../img/' + paths, uniqueFilename);
    await fs.promises.writeFile(uploadPath, file.buffer); 
    return uniqueFilename;
}

const saveImages = async (files, paths) => {
        const filePaths = [];
        for (const file of files) {
            const name = await saveImageByFile(file, paths);
            filePaths.push(name); 
        }
        return filePaths;    
}

module.exports = {saveImage, saveImages};