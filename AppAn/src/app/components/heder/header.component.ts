import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'MyHeder',
  templateUrl: './header.component.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  constructor(private _router: Router) {}
}
