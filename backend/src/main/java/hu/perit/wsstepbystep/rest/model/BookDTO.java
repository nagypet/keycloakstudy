package hu.perit.wsstepbystep.rest.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookDTO
{
    private final Long id;
    private String title;
    private String author;
    private Integer pages;
    private LocalDate dateIssued;
}
