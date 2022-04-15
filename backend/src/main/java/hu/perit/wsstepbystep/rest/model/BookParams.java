package hu.perit.wsstepbystep.rest.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BookParams
{
    private String title;
    private String author;
    private Integer pages;
    private LocalDate dateIssued;
}
