import { User } from './../../back-office/loggin/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor() { }

  ngOnInit() {
    console.log('---- currentUser: ',this.user);
  }

}
