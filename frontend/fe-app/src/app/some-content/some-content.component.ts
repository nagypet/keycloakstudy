import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

export interface Book
{
  id: number;
  title: string;
  author: string;
  pages: number;
  dateIssued: Date;
}

@Component({
  selector: 'app-some-content',
  templateUrl: './some-content.component.html',
  styleUrls: ['./some-content.component.scss']
})
export class SomeContentComponent implements OnInit
{
  location: string = '';
  books: Book[] = [];
  error: string = '';

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router)
  {
  }

  ngOnInit(): void
  {
    this.location = this.router.url.toString();

    this.onReload();
  }


  onReload()
  {
    this.bookService.getAllBooks().subscribe(data =>
    {
      this.error = '';
      this.books = data;
      console.log(data);
    }, error =>
    {
      // In case of 401, we can try to login
      // this.authService.login(this.router.url.toString()).catch(() =>
      // {
      //   this.error = error.message;
      //   console.error(error);
      // });
      this.error = error.message;
      console.error(error);
    });
  }
}
