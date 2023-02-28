import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {


  id?:number;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _router:Router,
    ) {

    }

  ngOnInit(): void {
    this.id=this._activatedRoute.snapshot.params['id'];
  }

  GoBack(){
    this._router.navigate(['/news']);
  }
}
