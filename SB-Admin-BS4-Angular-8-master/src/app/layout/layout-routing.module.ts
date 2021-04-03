import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { Role } from '../_models/role';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) , canActivate:[AuthGuard],data:{roles:[Role.Admin]}
            },
            {
                path: 'staff',
                loadChildren: () => import('./adminstration/staff-component/staff.module').then((m) => m.StaffModule) , canActivate:[AuthGuard],data:{roles:[Role.Admin]}
            },

            {
                path: 'view-staff',
                loadChildren: () => import('./adminstration/staff-component/view_staff/view-staff.module').then((m) => m.ViewStaffModule) , canActivate:[AuthGuard],data:{roles:[Role.Admin]}
            },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule)
            },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
