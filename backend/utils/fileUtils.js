const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

 const saveImage = async (req, paths) =>  {
    const uniqueFilename = `${uuidv4()}-${req.file.originalname}`; 
    const uploadPath = path.join(__dirname, '../img/' + paths, uniqueFilename);
    await fs.promises.writeFile(uploadPath, req.file.buffer); 
    return uniqueFilename;
}
const deleteImage = async (paths, filename) => {
    const filePath = path.join(__dirname, '../img/' + paths, filename);
    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        console.error(`Ошибка при удалении файла ${filename}:`, error);
    }
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

module.exports = {saveImage, saveImages, deleteImage};