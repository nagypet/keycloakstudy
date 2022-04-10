import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-set',
  templateUrl: './tab-set.component.html',
  styleUrls: ['./tab-set.component.scss']
})
export class TabSetComponent implements OnInit {

  tabs: Array<{ route: string, title: string }> = [
    {route: 'public', title: 'Public area'},
    {route: 'approvals', title: 'Approvals'},
    {route: 'administration', title: 'Administration'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
