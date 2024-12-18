import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  books: any = [];

  handlerMessage = '';
  roleMessage = '';

  constructor( 
    private bookService: BookService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getAllBooks();
  }

  ionViewDidEnter(){
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe(response => {
      this.books = response;
    });
  }

  deleteBook(id) {
    console.log('Id='+id);
    this.bookService.deleteBook(id).subscribe(() => {
      this.ionViewDidEnter();
      console.log('Libro borrado');
    });
  }  

  addBook(){
    this.router.navigateByUrl("/create");
  }

  goBack(){
    this.router.navigateByUrl("/list");
  }

  async presentAlert(id: BigInteger, title: String) {

    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: '¿Borramos '+title+'? ',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.deleteBook(id);
          },
        },        
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'my-custom-class'
        },
      ],
    });
    await alert.present();
  }

}