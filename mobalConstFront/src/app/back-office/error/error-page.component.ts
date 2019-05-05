import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    this.router.navigate(['']);
  }

}
