import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})

// error 404 component
export class Error404Component {
  constructor(private router:Router){

  }
// set the currenr year
year: number = new Date().getFullYear();
routerfun(){
this.router.navigate(['/admin'])
}
}
