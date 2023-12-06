import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ITag, Tag } from '../tag.model';
import { TagsApiService } from '../../services/tags-api.service';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.css',
  providers: [TagsApiService, HttpClientModule],
})
export class TagFormComponent {
  public newTag: ITag = new Tag(0, '', '');

  constructor(private tagApiService: TagsApiService, private router: Router) {}

  public sendPostReq() {
    this.tagApiService
      .postTag(this.newTag)
      .subscribe(() => this.navToTagList());
  }

  public navToTagList(): void {
    this.router.navigate(['tags-list']);
  }
}
