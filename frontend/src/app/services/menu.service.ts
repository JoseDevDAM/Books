import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuOptions } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private httpClient: HttpClient) { }

  getMenuOpts() {
    return this.httpClient.get<MenuOptions[]> ('/assets/data/menu-opts.json');
  }
}
