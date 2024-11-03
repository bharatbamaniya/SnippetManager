import {Component, inject, input, output, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Highlight, HighlightAuto} from "ngx-highlightjs";
import {HighlightLineNumbers} from "ngx-highlightjs/line-numbers";
import {MatChipsModule} from "@angular/material/chips";
import {NgStyle} from "@angular/common";
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FormatDatePipe} from "../../../shared/pipes/format-date.pipe";
import {Clipboard} from "@angular/cdk/clipboard";
import {CommonService} from "../../../shared/services/common.service";
import {SnippetService} from "../snippet.service";

export interface Vegetable {
  name: string;
}

export interface Snippet {
  id: number;
  title: string;
  createdAt?: number;
  tags?: string[];
  description?: string;
  code: string;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-single-snippet',
  standalone: true,
  imports: [
    MatIcon,
    Highlight,
    HighlightAuto,
    HighlightLineNumbers,
    MatChipsModule,
    NgStyle,
    FormatDatePipe
  ],
  templateUrl: './single-snippet.component.html',
  styleUrl: './single-snippet.component.scss'
})
export class SingleSnippetComponent {
  readonly dialog = inject(MatDialog);
  readonly clipboard = inject(Clipboard);
  readonly snippetService = inject(SnippetService);
  readonly commonService = inject(CommonService);

  readonly tags = signal<Vegetable[]>([
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'}
  ]);

  snippet = input.required<Snippet>();
  loadSnippets = output();

  constructor() {
  }

  clickToCopyCode(snippet: Snippet) {
    this.clipboard.copy(snippet.code || '');
    this.commonService.infoSnackbarCreator('code block copied successfully');
  }

  addToFavoriteSnippet() {
    this.snippet().isFavorite = !this.snippet().isFavorite;
    this.snippetService.addToFavoriteSnippet(this.snippet().id).subscribe({
      next: () => {
        this.commonService.successSnackbarCreator('Snippet marked as favorite.');
      },
      error: err => {
        this.commonService.errorSnackbarCreator(err.error.message);
      },
      complete: () => {
      }
    });
  }

  onDelete() {
    const dataDialog: ConfirmationDialogData = {
      forAction: "delete snippet.",
      confirmActionLabel: "Yes, Delete it.",
      confirmActionClass: "color-danger",
      cancelActionLabel: "No",
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dataDialog,
      maxWidth: "100vw",
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      autoFocus: "dialog",
    });

    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed === "true") {
        this.deleteSnippet();
      }
    });

  }

  deleteSnippet() {
    this.snippetService.deleteSnippetById(this.snippet().id).subscribe({
      next: () => {
        this.commonService.successSnackbarCreator('Snippet deleted.');
      },
      error: err => {
        this.commonService.errorSnackbarCreator(err.error.message);
      },
      complete: () => {
        this.loadSnippets.emit();
      }
    });
  }
}
