package cc.whyy0u.v2.controller.administrator.request;


import java.util.ArrayList;

import org.springframework.web.multipart.MultipartFile;

import cc.whyy0u.v2.validator.FileCountLimit;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddNews {
    @NotNull
    @Size(min = 3, max = 30)
    private String name;

    @NotNull
    @Size(min = 35, max = 2000)
    private String description;

    @FileCountLimit(maxCount = 10, maxSize = 5 * 1024 * 1024, message = "Нельзя загружать больше 10 файлов и размер каждого файла не должен превышать 5 МБ")
    private ArrayList<MultipartFile> images;
}
