import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  bookForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private bookService: BookService,
    private photoService: PhotoService, 
    private loadingCtrl: LoadingController
  ) { 
    this.bookForm = this.formBuilder.group({
      title: [''],
      author: ['']
    });
  }

  ionViewWillEnter() {
    this.bookForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.bookForm.controls;
  }

  async creatingBook() {
    const loading = await this.loadingCtrl.create({
      message: 'Creando libro...',
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
    this.isSubmitted = true;
    if (!this.bookForm.valid) {
      console.log('Por favor rellene todos los campos')
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
      .createBook(this.bookForm.value, blob)
      .subscribe(data => {
          console.log("Photo sent!");
          // this.zone.run(() => {
          // this.bookForm.reset();
          // this.router.navigate(['/list']);
          this.router.navigateByUrl("/list");
        })
      }
  }
  

  goBack(){
    this.router.navigateByUrl("/list");
  }

}