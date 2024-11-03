import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {SnippetSetupComponent} from "../snippet/snippet-setup/snippet-setup.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    SnippetSetupComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
