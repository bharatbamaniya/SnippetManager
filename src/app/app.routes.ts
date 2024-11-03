import {Routes} from '@angular/router';
import {LayoutComponent} from "./core/layout/layout.component";
import {HomeComponent} from "./core/home/home.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    pathMatch: "full",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      }
    ]
  },
  {path: "**", redirectTo: "/dashboard"},
];
