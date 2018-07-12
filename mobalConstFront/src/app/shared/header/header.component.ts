import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { LoginService } from './../../back-office/loggin/async-services/login.service';
import { User } from './../../back-office/loggin/models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private router: Router, private loginService: LoginService, sharedService: SharedService) { }

  ngOnInit() {
  }

  deconnexion(){
    this.loginService.logout().subscribe(
      data => {
          if(localStorage.getItem('currentUser') !== null){
            localStorage.removeItem('currentUser');
          }
          this.router.navigate(['']);
      }, error => {
        this.router.navigate(['']);
      }
    );
  }

}
