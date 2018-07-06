import { Component, OnInit } from '@angular/core';

import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // userName: String = localStorage.getItem('currentUser').indexOf('nom');
  constructor(private route: ActivatedRoute, private router: Router, private http: Http) { }

  ngOnInit() {
    console.log('---- currentUser: ',localStorage.getItem('currentUser'));
  }


}
