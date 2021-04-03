import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'staff-component',
    templateUrl: './staff.component.html'
})

export class StaffComponent implements OnInit {
    staffGroup:FormGroup;
    submitted = false;
    day:any;
    dateFieldValid = false;
    showNewStaff = false;
    constructor(private formBuilder:FormBuilder) {

     }
    ngOnInit() {
        this.staffGroup = this.formBuilder.group({
            staffId:[''],
            staffType:[''],
            description:[''],
            password:[123456],
            firstName:['',Validators.required],
            lastName:['',Validators.required],
            nicNumber:['', [Validators.required, Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
            email: ["", [Validators.required, Validators.email]],
            contactNumber:['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
            emergencyNumber:['',[Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
            address:[''],
            secondAddress:[''],
            birthday:[''],
            age:[''],
            gender:['']
        });
     }

     get f(){
         return this.staffGroup.controls;
     }

     onSubmit(){
            this.submitted =true;
     }

     onKey(event){

        let NICNo  = event.target.value;

        var dayText = 0;
        var year = "";
        var month = "";

        var gender = "";

          // Year
          if (NICNo.length == 10) {
            year = "19" + NICNo.substr(0, 2);
            dayText = parseInt(NICNo.substr(2, 3));
          //  console.log(year);
           // console.log(dayText);
        } else {
            year = NICNo.substr(0, 4);
            dayText = parseInt(NICNo.substr(4, 3));
          //  console.log(year);
         //   console.log(dayText);
        }
          // Gender
          if (dayText > 500) {
            gender = "Female";
            dayText = dayText - 500;
        } else {
            gender = "Male";
        }
        // Day Digit Validation
        if (dayText < 1 && dayText > 366) {
      console.log("Invalid ID");
      }else{
         //Month
         if (dayText > 335) {
         this.day = dayText - 335;
          month = "December";
         // console.log(month);
      }
      else if (dayText > 305) {
         this.day = dayText - 305;
          month = "November";
      }
      else if (dayText > 274) {
         this.day = dayText - 274;
          month = "October";
      }
      else if (dayText > 244) {
         this.day = dayText - 244;
          month = "September";
      }
      else if (dayText > 213) {
         this.day = dayText - 213;
          month = "Auguest";
      }
      else if (dayText > 182) {
         this.day = dayText - 182;
          month = "July";
      }
      else if (dayText > 152) {
         this.day = dayText - 152;
          month = "June";
      }
      else if (dayText > 121) {
         this.day = dayText - 121;
          month = "May";
      }
      else if (dayText > 91) {
         this.day = dayText - 91;
          month = "April";
      }
      else if (dayText > 60) {
         this.day = dayText - 60;
          month = "March";
      }
      else if (dayText < 32) {
          month = "January";
         this.day = dayText;
      }
      else if (dayText > 31) {
         this.day = dayText - 31;
          month = "Febuary";
      }
            //show Details;


            if(this.f.nicNumber.valid){
              this.dateFieldValid = true;
            }else {
              this.dateFieldValid = false;
            }
            let birthday = year+ "-" + month + "-" + this.day
            this.getAge(birthday);
            this.staffGroup.controls['birthday'].setValue(birthday);

            this.staffGroup.controls['gender'].setValue(gender);


      }







}
getAge(birthday) {

    //get today;
    var now = new Date();
    var yearNow = now.getFullYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();

    const bornday = new Date(birthday);

    var bornyear =bornday.getFullYear();
    var bornmonth =bornday.getMonth();
    var bornNow =bornday.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
    var yearAge = yearNow - bornyear;
    this.staffGroup.controls['age'].setValue(yearAge);

    if (monthNow >= bornmonth)
    var monthAge = monthNow - bornmonth;
  else {
    yearAge--;
    var monthAge = 12 + monthNow -bornmonth;
  }

  if (dateNow >= bornNow)
    var dateAge = dateNow - bornNow;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - bornNow;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }
   age = {
    years: yearAge,
    months: monthAge,
    days: dateAge
    };


    console.log(age)

  }

}
