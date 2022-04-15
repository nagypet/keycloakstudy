package hu.perit.wsstepbystep.businesslogic.bookstore;

import hu.perit.spvitamin.spring.exception.ResourceNotFoundException;
import hu.perit.wsstepbystep.businesslogic.api.BookstoreService;
import hu.perit.wsstepbystep.rest.model.BookDTO;
import hu.perit.wsstepbystep.rest.model.BookParams;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookstoreServiceImpl implements BookstoreService
{
    private static final Map<Long, BookDTO> bookRepo = new HashMap<>();

    static
    {
        bookRepo.put(1L, new BookDTO(1L, "Apák könyve", "Vámos Miklós", 280, LocalDate.of(2002, 2, 3)));
        bookRepo.put(2L, new BookDTO(2L, "Robinson Crusoe", "Daniel Defoe", 280, LocalDate.of(1719, 6, 14)));
        bookRepo.put(3L, new BookDTO(3L, "Bár", "Vámos Miklós", 140, LocalDate.of(1998, 6, 14)));
    }

    //------------------------------------------------------------------------------------------------------------------
    // getAllBooks()
    //------------------------------------------------------------------------------------------------------------------
    @Override
    public List<BookDTO> getAllBooks()
    {
        return new ArrayList<>(bookRepo.values());
    }


    //------------------------------------------------------------------------------------------------------------------
    // getBookById
    //------------------------------------------------------------------------------------------------------------------
    @Override
    public BookDTO getBookById(Long id) throws ResourceNotFoundException
    {
        if (bookRepo.containsKey(id))
        {
            return bookRepo.get(id);
        }

        throw new ResourceNotFoundException(String.format("Book with id %d cannot be found!", id));
    }


    //------------------------------------------------------------------------------------------------------------------
    // createBook
    //------------------------------------------------------------------------------------------------------------------
    @Override
    public long createBook(BookParams bookParams)
    {
        return 0;
    }


    //------------------------------------------------------------------------------------------------------------------
    // updateBook
    //------------------------------------------------------------------------------------------------------------------
    @Override
    public void updateBook(Long id, BookParams bookParams) throws ResourceNotFoundException
    {
        BookDTO book = getBookById(id);
    }


    //------------------------------------------------------------------------------------------------------------------
    // deleteBook
    //------------------------------------------------------------------------------------------------------------------
    @Override
    public void deleteBook(Long id) throws ResourceNotFoundException
    {
        if (bookRepo.containsKey(id))
        {
            bookRepo.remove(id);
        }

        throw new ResourceNotFoundException(String.format("Book with id %d cannot be found!", id));
    }
}
