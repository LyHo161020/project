package com.cg.entity;


import com.cg.dto.MovieDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Table(name = "movies")
public class Movie extends BaseEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @JoinColumn(name = "movie_id", referencedColumnName = "id")

    private String id;

    private String title;


    @Column(name="premiere_date")
    private String premiereDate;


    @Column(name="show_duration")
    private int showDuration;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "movies_categories",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;
    private String director;

    private String actor;

    private String language;

    private String description;

    private String trailer;


    @OneToMany(mappedBy = "movie")
    private List<FileMedia> movieMedia;

    public MovieDTO toMovieDTO() {
        return new MovieDTO()
                .setId(id)
                .setTitle(title)
                .setPremiereDate(premiereDate)
                .setShowDuration(showDuration)
                .setDirector(director)
                .setActor(actor)
                .setLanguage(language)
                .setDescription(description)
                .setTrailer(trailer);
    }

}
