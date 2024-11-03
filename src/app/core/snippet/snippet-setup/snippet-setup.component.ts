import {Component, inject, output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {SnippetService} from "../snippet.service";
import {CommonService} from "../../../shared/services/common.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-snippet-setup',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIcon, MatChip, MatChipSet, MatLabel, MatFormField, MatInput, FormsModule],
  templateUrl: './snippet-setup.component.html',
  styleUrl: './snippet-setup.component.scss'
})
export class SnippetSetupComponent {
  snippetService = inject(SnippetService);
  commonService = inject(CommonService);
  toggleSnippetSetupPage = output<boolean>();
  loadSnippets = output();

  title: string = '';
  description: string = '';
  code: string = '';
  tags: string[] = ['javascript', 'nodejs'];

  onAddSnippet() {
    this.snippetService.addSnippet({
      title: this.title,
      description: this.description,
      code: this.code,
      tags: this.tags,
      isFavorite: false,
    }).subscribe({
      next: () => {
        this.commonService.successSnackbarCreator('snippet saved.')
      },
      error: err => {
        this.commonService.successSnackbarCreator('snippet not saved - ' + err.error.message)
      },
      complete: () => {
        this.toggleSnippetSetupPage.emit(true);
        this.loadSnippets.emit();
      }
    })
  }
}
