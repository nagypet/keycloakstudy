/*
 * Copyright 2020-2022 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package hu.perit.wsstepbystep.rest.api;

import hu.perit.spvitamin.spring.exception.ResourceNotFoundException;
import hu.perit.wsstepbystep.rest.model.BookDTO;
import hu.perit.wsstepbystep.rest.model.BookParams;
import hu.perit.wsstepbystep.rest.model.ResponseUri;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

public interface BookApi
{
    String BASE_URL_BOOKS = "/books";

    //------------------------------------------------------------------------------------------------------------------
    // getAllBooks()
    //------------------------------------------------------------------------------------------------------------------
    @GetMapping(BASE_URL_BOOKS)
    @ApiOperation(value = "getAllBooks() - Retrieves all books")
    @ApiResponses(value = { //
            @ApiResponse(code = 200, message = "Success"), //
            @ApiResponse(code = 401, message = "Invalid credentials"), //
            @ApiResponse(code = 500, message = "Internal server error") //
    })
    @ResponseStatus(value = HttpStatus.OK)
    List<BookDTO> getAllBooks();


    //------------------------------------------------------------------------------------------------------------------
    // getBookById
    //------------------------------------------------------------------------------------------------------------------
    @GetMapping(BASE_URL_BOOKS + "/{id}")
    @ApiOperation(value = "getBookById() - Retrieves a book by ID")
    @ApiResponses(value = { //
            @ApiResponse(code = 200, message = "Success"), //
            @ApiResponse(code = 401, message = "Invalid credentials"), //
            @ApiResponse(code = 404, message = "Book not found"), //
            @ApiResponse(code = 500, message = "Internal server error") //
    })
    @ResponseStatus(value = HttpStatus.OK)
    BookDTO getBookById(@PathVariable("id") Long id) throws ResourceNotFoundException;


    //------------------------------------------------------------------------------------------------------------------
    // createBook
    //------------------------------------------------------------------------------------------------------------------
    @PostMapping(BASE_URL_BOOKS)
    @ApiOperation(value = "createBook() - creates a new book")
    @ApiResponses(value = { //
            @ApiResponse(code = 201, message = "Created"), //
            @ApiResponse(code = 400, message = "Bad request"), //
            @ApiResponse(code = 401, message = "Invalid credentials"), //
            @ApiResponse(code = 409, message = "Book already exists"), //
            @ApiResponse(code = 500, message = "Internal server error") //
    })
    @ResponseStatus(value = HttpStatus.CREATED)
    ResponseUri createBook(@RequestBody BookParams bookParams);


    //------------------------------------------------------------------------------------------------------------------
    // updateBook
    //------------------------------------------------------------------------------------------------------------------
    @PutMapping(BASE_URL_BOOKS + "/{id}")
    @ApiOperation(value = "updateBook() - Updates a book by ID")
    @ApiResponses(value = { //
            @ApiResponse(code = 200, message = "Success"), //
            @ApiResponse(code = 401, message = "Invalid credentials"), //
            @ApiResponse(code = 404, message = "Book not found"), //
            @ApiResponse(code = 500, message = "Internal server error") //
    })
    @ResponseStatus(value = HttpStatus.OK)
    void updateBook(@PathVariable("id") Long id, @RequestBody BookParams bookParams) throws ResourceNotFoundException;


    //------------------------------------------------------------------------------------------------------------------
    // deleteBook
    //------------------------------------------------------------------------------------------------------------------
    @DeleteMapping(BASE_URL_BOOKS + "/{id}")
    @ApiOperation(value = "deleteBook() - removes a book by ID")
    @ApiResponses(value = { //
            @ApiResponse(code = 200, message = "Success"), //
            @ApiResponse(code = 400, message = "Bad request"), //
            @ApiResponse(code = 401, message = "Invalid credentials"), //
            @ApiResponse(code = 404, message = "Book not found"), //
            @ApiResponse(code = 500, message = "Internal server error") //
    })
    @ResponseStatus(value = HttpStatus.OK)
    void deleteBook(@PathVariable("id") Long id) throws ResourceNotFoundException;
}
