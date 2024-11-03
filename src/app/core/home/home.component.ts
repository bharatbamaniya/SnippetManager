import {Component, signal} from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {SingleSnippetComponent, Snippet} from "../snippet/single-snippet/single-snippet.component";
import {TagsComponent} from "../../shared/components/tags/tags.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {SnippetSetupComponent} from "../snippet/snippet-setup/snippet-setup.component";

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
    MatSidenavContent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  newSnippet = signal(false);

  snippets: Snippet[] = [{
    title: 'Loren ipsum dolor sit amet. Non unde natus',
    timestamp: Date.now(),
    tags: ['javascript', 'nodejs'],
    description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, . Lorem ipsum dolor sit amet, ,' +
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
    code: `import { HighlightPlusModule } from 'ngx-highlightjs';
export class AppComponent {
}`,
    isFavorite: false,
  }, {
    title: 'Loren ipsum dolor sit amet. Non unde natus',
    timestamp: Date.now(),
    tags: ['javascript', 'nodejs'],
    description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, . Lorem ipsum dolor sit amet, ,' +
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
    code: `import { HighlightPlusModule } from 'ngx-highlightjs';
export class AppComponent {
}`,
    isFavorite: false,
  }, {
    title: 'Loren ipsum dolor sit amet. Non unde natus',
    timestamp: Date.now(),
    tags: ['javascript', 'nodejs'],
    description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, . Lorem ipsum dolor sit amet, ,' +
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
    code: `import { HighlightPlusModule } from 'ngx-highlightjs';
export class AppComponent {
}`,
    isFavorite: false,
  }, {
    title: 'Loren ipsum dolor sit amet. Non unde natus',
    timestamp: Date.now(),
    tags: ['javascript', 'nodejs'],
    description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, . Lorem ipsum dolor sit amet, ,' +
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet',
    code: `import { HighlightPlusModule } from 'ngx-highlightjs';

@Component({
  standalone: true,
  selector: 'app-root',
  template: \`
  \`,
  imports: [HighlightPlusModule, CommonModule]
})
export class AppComponent {
}`,
    isFavorite: false,
  },]
}
