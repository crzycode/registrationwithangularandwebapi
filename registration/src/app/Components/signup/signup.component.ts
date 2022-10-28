import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateform';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type:string = "password";
  isText:boolean = false;
  eyeIcon:string = "fa-eye-slash";
  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder, private auth:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideandshow(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye":this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text": this.type = "password";

  }
  onSignup(){
    if(this.signUpForm.valid){
      this.auth.signup(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message)
          this.signUpForm.reset();
          this.router.navigate(['login'])
        },
        error:(err)=>[
          alert(err?.error.message)
        ]
      });
      console.log(this.signUpForm.value)
    }else{
      ValidateForm.validateAllFormField(this.signUpForm)
    }
  }

}
