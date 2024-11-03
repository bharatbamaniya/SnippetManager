import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SingleSnippetComponent} from "./core/snippet/single-snippet/single-snippet.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SingleSnippetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'snippet-manager';
}
