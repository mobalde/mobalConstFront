import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.css']
})
export class BanqueComponent implements OnInit {

  constructor(private sharedService: SharedService, private http: Http) { }

  ngOnInit() {
    this.sharedService.displayHeader('pageBanque');
  }

}
