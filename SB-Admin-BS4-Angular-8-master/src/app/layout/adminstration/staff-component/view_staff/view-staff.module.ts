import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewStaffRoutingModule } from './view-staff-routing.module';
import { ViewStaffComponent } from './view-staff.component';


@NgModule({
    imports: [ReactiveFormsModule ,CommonModule ,ViewStaffRoutingModule ],
    declarations: [ViewStaffComponent]
})
export class ViewStaffModule {}
