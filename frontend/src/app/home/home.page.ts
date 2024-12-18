import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  goToMyList(){
    this.router.navigateByUrl("/list");
  }

  goToCreate(){
    this.router.navigateByUrl("/create");
  }  

  goToStart(){
    this.router.navigateByUrl("/");
  }  

}
