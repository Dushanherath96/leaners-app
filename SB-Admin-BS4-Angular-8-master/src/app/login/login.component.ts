import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    myForm:FormGroup;
    submitted:boolean = false;
    constructor(private formBuilder: FormBuilder ,
            private router :Router,
        private userService : UserService) {}

    ngOnInit(){
        this.myForm = this.formBuilder.group({
            email: ['',[Validators.required,Validators.email]],
            password: ['',Validators.required]


        });
    }


    get loginf(){
        return this.myForm.controls;
    }
    onSubmit(){
        this.submitted=true;
        if(this.myForm.valid){
           this.userService.login(this.loginf.email.value , this.loginf.password.value)
           .pipe(first())
           .subscribe(
                response=>{
                    console.log(response);
                    this.router.navigate(['/dashboard'])
                },

                error=>{
                    console.log(error)
                }
           )


        }
    }

   //login() {

    //}
    // onLoggedin() {
    //     localStorage.setItem('isLoggedin', 'true');
    // }


}
