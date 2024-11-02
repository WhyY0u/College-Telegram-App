package cc.whyy0u.v2.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class FileUtils {
    private static final String DEV_DIRECTORY = System.getProperty("user.dir") + "/img"; 
    private static final String RELEASE_DIRECTORY = "/path/to/release/images/"; 
    public static final String VERSION = "dev";

    public static String saveImage(MultipartFile file) throws IOException {
        String directoryPath;
        
        if ("dev".equalsIgnoreCase(VERSION)) {
            directoryPath = DEV_DIRECTORY;
        } else if ("release".equalsIgnoreCase(VERSION)) {
            directoryPath = RELEASE_DIRECTORY;
        } else {
            throw new IllegalArgumentException("Неверная версия: " + VERSION);
        }
            File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || originalFileName.isEmpty()) {
            throw new IllegalArgumentException("Имя файла не может быть пустым");
        }
    
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".")); 
        String baseFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
        String uniqueFileName = baseFileName + "_" + UUID.randomUUID().toString().substring(0, Math.min(50 - fileExtension.length(), 36)) + fileExtension;
    
        String fullPath = directoryPath + File.separator + uniqueFileName;
    
        file.transferTo(new File(fullPath));
        System.out.println(fullPath);
    
        return uniqueFileName; 
    }
    
    public static byte[] getImage(String fileName) throws IOException {
        String directoryPath;
        if ("dev".equalsIgnoreCase(VERSION)) {
            directoryPath = DEV_DIRECTORY;
        } else if ("release".equalsIgnoreCase(VERSION)) {
            directoryPath = RELEASE_DIRECTORY;
        } else {
            throw new IllegalArgumentException("Неверная версия: " + VERSION);
        }
        Path filePath = Paths.get(directoryPath, fileName);
        if (!Files.exists(filePath)) {
            throw new IOException("Файл не найден: " + filePath);
        }        return Files.readAllBytes(filePath);
    }
    public static void deleteImage(String fileName) throws IOException {
        String directoryPath;
         if ("dev".equalsIgnoreCase(VERSION)) {
            directoryPath = DEV_DIRECTORY;
        } else if ("release".equalsIgnoreCase(VERSION)) {
            directoryPath = RELEASE_DIRECTORY;
        } else {
            throw new IllegalArgumentException("Неверная версия: " + VERSION);
        }
        
        Path filePath = Paths.get(directoryPath, fileName);
             if (!Files.exists(filePath)) {
            throw new IOException("Файл не найден для удаления: " + filePath);
        }
        Files.delete(filePath);
    }
    
}
