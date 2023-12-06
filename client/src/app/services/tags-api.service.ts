import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ITag } from '../tags/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService {
  constructor(private http: HttpClient) {}

  public getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>('http://localhost:8000/tags');
  }

  public getTag(id: number): Observable<ITag> {
    return this.http.get<ITag>('http://localhost:8000/tag/' + String(id));
  }

  public postTag(tag: ITag) {
    return this.http.post<ITag>('http://localhost:8000/tag', tag);
  }

  public deleteTag(id: number) {
    return this.http.delete('http://localhost:8000/tag/' + String(id));
  }

  public updateTag(id: number, tag: ITag) {
    return this.http.put('http://localhost:8000/tag/' + String(id), tag);
  }
}
