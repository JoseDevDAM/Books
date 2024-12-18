import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuOptions } from './interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menuOptions: Observable<MenuOptions[]>;

  constructor(private menuService: MenuService,
              private alertCtrl: AlertController
             ) {}

  ngOnInit() {
    this.menuOptions = this.menuService.getMenuOpts();
  }

}
