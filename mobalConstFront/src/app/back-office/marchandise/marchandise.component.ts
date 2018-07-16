import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marchandise',
  templateUrl: './marchandise.component.html',
  styleUrls: ['./marchandise.component.css']
})
export class MarchandiseComponent implements OnInit {

  constructor(private sharedService: SharedService, private http: Http) { }

  ngOnInit() {
    this.sharedService.displayHeader('pageMarchandise');
  }

}
