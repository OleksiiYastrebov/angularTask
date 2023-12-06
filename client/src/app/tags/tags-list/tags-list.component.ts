import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

import { ITag } from '../tag.model';
import { TagsApiService } from '../../services/tags-api.service';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.css',
  providers: [TagsApiService, HttpClientModule],
})
export class TagsListComponent implements OnInit {
  public tags!: ITag[];
  constructor(private tagsApiService: TagsApiService, private router: Router) {}

  public ngOnInit(): void {
    this.tagsApiService.getTags().subscribe((tags) => {
      this.tags = tags;
    });
  }

  public navigateToCreate() {
    this.router.navigate(['tag-create'])
  }

  public navigateToEdit(id: number) {
    this.router.navigate(['tag-edit', id]);
  }

  public deleteTag(id: number) {
    this.tagsApiService.deleteTag(id).subscribe(() => {
      this.tags = this.tags.filter((tag) => tag.id !== id);
    });
  }

  public goRoot() {
    this.router.navigate(['']);
  }
}
