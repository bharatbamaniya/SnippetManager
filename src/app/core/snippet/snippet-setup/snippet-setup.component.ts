import {Component, output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-snippet-setup',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIcon, MatChip, MatChipSet, MatLabel, MatFormField, MatInput],
  templateUrl: './snippet-setup.component.html',
  styleUrl: './snippet-setup.component.scss'
})
export class SnippetSetupComponent {
  createNewSnippet = output<boolean>();

}
