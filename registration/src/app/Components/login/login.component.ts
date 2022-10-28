import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateform';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
type:string = "password";
isText:boolean = false;
eyeIcon:string = "fa-eye-slash";
loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideandshow(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye":this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text": this.type = "password";

  }
  onSubmit(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) =>{
          alert(res.message)
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err.message)
        }
      })
      console.log(this.loginForm.value)

    }else{
      console.log("form is not valid ")
      ValidateForm.validateAllFormField(this.loginForm);
    }
  }


}
