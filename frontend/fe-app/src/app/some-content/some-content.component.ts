import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-some-content',
  templateUrl: './some-content.component.html',
  styleUrls: ['./some-content.component.scss']
})
export class SomeContentComponent implements OnInit
{
  location: string = '';

  constructor()
  {
  }

  ngOnInit(): void
  {
    this.location = window.location.pathname;
  }

}
