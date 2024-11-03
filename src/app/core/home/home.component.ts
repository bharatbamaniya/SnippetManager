import {Component, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {SingleSnippetComponent, Snippet} from "../snippet/single-snippet/single-snippet.component";
import {TagsComponent} from "../../shared/components/tags/tags.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {SnippetSetupComponent} from "../snippet/snippet-setup/snippet-setup.component";
import {SnippetService} from "../snippet/snippet.service";
import {HttpResponse} from "@angular/common/http";
import {CommonService} from "../../shared/services/common.service";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SingleSnippetComponent,
    TagsComponent,
    MatSidenav,
    SnippetSetupComponent,
    MatSidenavContainer,
    MatSidenavContent,
    MatProgressBar
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  snippetService = inject(SnippetService);
  commonService = inject(CommonService);
  newSnippet = signal(false);
  showLoader = signal(false);
  snippets = signal<Snippet[]>([]);

//   snippets: Snippet[] = [{
//     title: 'Loren ipsum dolor sit amet. Non unde natus',
//     timestamp: Date.now(),
//     tags: ['javascript', 'nodejs'],
//     description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, . Lorem ipsum dolor sit amet, ,' +
//       'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
//     code: "import { HighlightPlusModule } from 'ngx-highlightjs';\n@Component({\n  standalone: true,\n  selector: 'app-root',\n  template: \n  `,\n  imports: [HighlightPlusModule, CommonModule]\n})\nexport class AppComponent {\n}",
//     isFavorite: false,
//   }, {
//     title: 'Loren ipsum dolor sit amet. Non unde natus',
//     timestamp: Date.now(),
//     tags: ['javascript', 'nodejs'],
//     description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, . Lorem ipsum dolor sit amet, ,' +
//       'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
//     code: `import { HighlightPlusModule } from 'ngx-highlightjs';
// export class AppComponent {
// }`,
//     isFavorite: false,
//   }, {
//     title: 'Loren ipsum dolor sit amet. Non unde natus',
//     timestamp: Date.now(),
//     tags: ['javascript', 'nodejs'],
//     description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, . Lorem ipsum dolor sit amet, ,' +
//       'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
//     code: `import { HighlightPlusModule } from 'ngx-highlightjs';
// export class AppComponent {
// }`,
//     isFavorite: false,
//   }, {
//     title: 'Loren ipsum dolor sit amet. Non unde natus',
//     timestamp: Date.now(),
//     tags: ['javascript', 'nodejs'],
//     description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, . Lorem ipsum dolor sit amet, ,' +
//       'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
//     code: `import { HighlightPlusModule } from 'ngx-highlightjs';
//
// @Component({
//   standalone: true,
//   selector: 'app-root',
//   template: \`
//   \`,
//   imports: [HighlightPlusModule, CommonModule]
// })
// export class AppComponent {
// }`,
//     isFavorite: false,
//   },]

  ngOnInit() {
    this.getSnippets();
  }

  getSnippets() {
    this.showLoader.set(true);
    this.snippetService.getSnippets().subscribe({
      next: (snippets: HttpResponse<any>) => {
        this.snippets.set(snippets.body.data);
      },
      error: (err) => {
        this.commonService.errorSnackbarCreator(err.error.message);
      },
      complete: () => {
        this.showLoader.set(false);
      }
    })
  }
}
