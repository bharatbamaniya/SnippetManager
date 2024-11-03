import {Component, inject, input, signal} from '@angular/core';
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

export interface Vegetable {
  name: string;
}

export interface Snippet {
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
  readonly commonService = inject(CommonService);

  readonly tags = signal<Vegetable[]>([
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'}
  ]);

  snippet = input.required<Snippet>();
  favorite = signal<boolean>(false);

  constructor() {
  }

  clickToCopyCode(snippet: Snippet) {
    this.clipboard.copy(snippet.code || '');
    this.commonService.infoSnackbarCreator('code block copied successfully');
  }

  markAsFavorite(snippet: Snippet) {
    this.snippet().isFavorite = !this.snippet().isFavorite;
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

    dialogRef.afterClosed().subscribe((result) => {

    });

  }
}
