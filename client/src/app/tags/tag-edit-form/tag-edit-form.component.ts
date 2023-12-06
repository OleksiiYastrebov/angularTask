import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TagsApiService } from '../../services/tags-api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ITag } from '../tag.model';

@Component({
  selector: 'app-tag-edit-form',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './tag-edit-form.component.html',
  styleUrl: './tag-edit-form.component.css',
  providers: [TagsApiService],
})
export class TagEditFormComponent implements OnInit {
  public updatedTag!: ITag;

  constructor(
    private router: Router,
    private tagsApiService: TagsApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.tagsApiService.getTag(id).subscribe((tag) => {
      this.updatedTag = tag;
    });
  }

  public sendPutReq(id: number) {
    this.tagsApiService
      .updateTag(id, this.updatedTag)
      .subscribe(() => this.goToTagList());
  }

  public goToTagList() {
    this.router.navigate(['tags-list']);
  }
}
