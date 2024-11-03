import { Component } from '@angular/core';
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";

interface NavConfig {
  name: string;
  path: string;
}


export const NAVS: NavConfig[] = [
  { name: "Upload Serial Number", path: "/dashboard/upload-serial-number" },
  { name: "Search Serial Number", path: "/dashboard/search-serial-number" },
  { name: "Generate Report", path: "/dashboard/generate-report" },
  { name: "Block / Unblock Serial Number", path: "/dashboard/block-unblock-serial-number" },
  { name: "Vendor Key Management", path: "/dashboard/vendor-key-management" },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatNavList,
    MatListItem,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navs: NavConfig[] = NAVS;
}
