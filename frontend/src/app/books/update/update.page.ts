import { Component, OnInit } from '@angular/core';

import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  updateBookForm: FormGroup;
  capturedPhoto: string = "";
  id: any;

  constructor( 
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private photoService: PhotoService,
    private loadingCtrl: LoadingController
  ) {
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
  }









  

  ngOnInit() {
    this.getBook(this.id);
    this.updateBookForm = this.formBuilder.group({
      title: [''],
      author: ['']
    })
  }

  getBook(id){
    console.log('getBook  -  id: '+this.id)
    this.bookService.getBook(this.id).subscribe( (data) => {
      this.updateBookForm.setValue({
        title: data['title'],
        author: data['author']
      });
    });
  }

  goBack(){
    this.router.navigateByUrl("/home");
  }

  async updatingBook() {
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando libro ...',
      duration: 3000,
    });
    loading.present();

    this.onSubmit();
  }


  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
      console.log('takePhoto - capturedPhoto'+this.capturedPhoto);
      console.log('takePhoto - webPath'+data.webPath);
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
      console.log('pickImage - capturedPhoto'+this.capturedPhoto);
      console.log('pickImage - webPath'+data.webPath);      
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  async onSubmit() {
    if (!this.updateBookForm.valid) {
       return false;
    } else {

      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        console.log('onSubmit - response'+response);
        console.log('onSubmit - response.blob'+response.blob);  
        blob = await response.blob();
      }


      this.bookService
        .updateBook(this.id, this.updateBookForm.value, blob)
        .subscribe(() => {
          this.updateBookForm.reset();
          this.router.navigate(['/list']);
        })
    }
  }  
}
