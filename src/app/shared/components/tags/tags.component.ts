import {Component, input, signal} from '@angular/core';
import {MatChip, MatChipOption, MatChipSelectionChange, MatChipSet} from "@angular/material/chips";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TitleCasePipe} from "@angular/common";

export interface Tag {
  name: string;
  isSelected?: boolean;
}

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    MatChip,
    MatChipSet,
    MatChipOption,
    MatButton,
    MatIcon,
    TitleCasePipe
  ],
  template: `
    <section class="tags-section mat-elevation-z0 rounded-4 py-2 px-3 d-flex flex-wrap align-items-center">
      <mat-chip-set class="p-2">
        @for (tag of tags(); track tag) {
          <mat-chip-option [selected]="tag.isSelected" (selectionChange)="onSelectionChange($event, tag)">
            {{ tag.name | titlecase }}
          </mat-chip-option>
        } @empty {
          <mat-chip>No Tags</mat-chip>
        }
      </mat-chip-set>
      <button mat-flat-button>
        <mat-icon style="color: var(--sys-on-primary);">add</mat-icon>
        Tag
      </button>
    </section>
  `,
  styleUrl: './tags.component.scss'
})
export class TagsComponent {

  tags = input.required({
    transform: (value: Tag[]) => value.length ? [{name: 'all', isSelected: true}, ...value] : value
  });
  selectedTags: Set<string> = new Set<string>;

  onSelectionChange(event: MatChipSelectionChange, tag: Tag) {
    tag.isSelected = event.selected;
    tag.isSelected && tag.name !== 'all' ? this.selectedTags.add(tag.name) : this.selectedTags.delete(tag.name);

    const _tag = this.tags().at(0);
    if (_tag && this.selectedTags.size === 0) {
      _tag.isSelected = true;
    } else if (_tag) {
      _tag.isSelected = false;
    }
  }
}
