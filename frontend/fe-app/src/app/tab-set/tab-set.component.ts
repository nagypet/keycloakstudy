import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-set',
  templateUrl: './tab-set.component.html',
  styleUrls: ['./tab-set.component.scss']
})
export class TabSetComponent implements OnInit {

  tabs: Array<{ route: string, title: string }> = [
    {route: 'settings', title: 'Settings'},
    {route: 'keystore', title: 'Keystore'},
    {route: 'truststore', title: 'Truststore'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
