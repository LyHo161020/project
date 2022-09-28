package com.cg.dto;


import com.cg.entity.FileMedia;
import com.cg.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;


import javax.validation.constraints.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class MovieDTO implements Serializable {
    private String id;
    @NotBlank(message = "Tiêu đề không được để trống.")
    @Size(min = 1, max = 50, message = "Tiêu đề phim không quá 50 ký tự!")
    private String title;

    @NotBlank(message = "Ngày khởi chiếu không được để trống.")
    private String premiereDate;
    @Min(value = 0, message = "Thời lượng chiếu không được âm!")
    @Max(value = 1000, message = "Thời lượng chiếu không quá 1000 phút!")
    private int showDuration;

    private String categories;
    @NotBlank(message = "Đạo diễn không được để trống.")
    private String director;
    @NotBlank(message = "Diễn viên không được để trống.")
    private String actor;
    @NotBlank(message = "Vui lòng chọn ngôn ngữ.")
    private String language;
    @NotBlank(message = "Mô tả phim không được để trống.")
    private String description;

    private String trailer;

    private String fileName;
    private String fileFolder;
    private String fileUrl;
    private String cloudId;
    private String fileProductId;

    private MultipartFile file;
    private String fileType;

    public Movie toMovie() {
        return new Movie()
                .setId(id)
                .setTitle(title)
                .setPremiereDate(premiereDate)
                .setShowDuration(showDuration)
//                .setCategories(categories)
                .setDirector(director)
                .setActor(actor)
                .setLanguage(language)
                .setDescription(description)
                .setTrailer(trailer);
    }

    public FileMedia toFileMedia() {
        return new FileMedia()
                .setId(fileProductId)
                .setFileName(fileName)
                .setFileFolder(fileFolder)
                .setFileUrl(fileUrl)
                .setCloudId(cloudId)
                .setFileType(fileType);
    }

    public MovieDTO(String id, String title, String premiereDate, int showDuration, String director, String actor, String language, String description) {
        this.id = id;
        this.title = title;
        this.premiereDate = premiereDate;
        this.showDuration = showDuration;
        this.director = director;
        this.actor = actor;
        this.language = language;
        this.description = description;
    }

    public MovieDTO(String id, String title, String premiereDate, int showDuration, String director, String actor, String language, String description, String trailer, String fileFolder, String fileName, String fileType, String fileUrl) {
        this.id = id;
        this.title = title;
        this.premiereDate = premiereDate;
        this.showDuration = showDuration;
        this.director = director;
        this.actor = actor;
        this.language = language;
        this.description = description;
        this.trailer = trailer;
        this.fileName = fileName;
        this.fileFolder = fileFolder;
        this.fileUrl = fileUrl;
        this.fileType = fileType;
    }


}
