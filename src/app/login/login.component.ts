import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { ToastMessageService } from '../Utils/toast-message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;  get f() { return this.loginForm.controls; }

  constructor(
    private http: HttpClient,
    private router:Router,
    private loadingController:LoadingController,
    private toast:ToastMessageService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, { 
    }); 
  }

  imgPass = "eye";
  typePass="password";
  onClickShow(){ 
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
    this.imgPass = this.imgPass === 'eye-off' ? 'eye' : 'eye-off';
  }
  submitted= false;
  async onClickLogin(){
    this.submitted = true;
    console.log(this.loginForm);
    if(this.loginForm.invalid){
      return;
    } 
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present();  
    if(this.loginForm.value.email == "bmtest@biomarking.com" && this.loginForm.value.password == "1qw21qw2"){
      //access
      this.getResponse("https://run.mocky.io/v3/8a57f296-30f3-453b-a1fe-93802217ff0a")
    .subscribe(async (res:any)=>{
      loading.dismiss();
      if(res.status){
        await this.router.navigateByUrl('/dashboard');  
      } 
    });  
    }else{
      //invalid
      this.getResponse("https://run.mocky.io/v3/159bee6e-ac51-4aa2-aaf4-37415c278c0d")
      .subscribe(async (res:any)=>{
        loading.dismiss(); 
        if(!res.status){
          this.toast.presentToast(res.data.message);   
        } 
      });  
    }
  }
  getResponse(url){
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('content-type', 'application/json') 
    return this.http
    .get(url, { headers: headers })
  } 
}
