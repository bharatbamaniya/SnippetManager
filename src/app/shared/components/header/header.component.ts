import {Component, effect, inject, output, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SnippetSetupComponent} from "../../../core/snippet/snippet-setup/snippet-setup.component";
import {MatDialog} from "@angular/material/dialog";
import {HighlightLoader} from "ngx-highlightjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatButton,
    MatIconButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  readonly hljsLoader: HighlightLoader = inject(HighlightLoader);

  darkMode = signal<boolean>(true);
  createNewSnippet = output();

  setDarkMode = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
    this.hljsLoader.setTheme(`//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${this.darkMode() ? 'github-dark-dimmed' : 'github'}.min.css`);
  })

  onCreateNewSnippet() {
    this.createNewSnippet.emit()
  }

}
