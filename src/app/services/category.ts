import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoryData {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/api/categories';

  constructor(private http: HttpClient) {}

  createCategory(categoryData: { name: string }): Observable<CategoryData> {
    return this.http.post<CategoryData>(this.apiUrl, categoryData);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateCategory(id: number, categoryData: { name: string }): Observable<CategoryData> {
  return this.http.put<CategoryData>(`${this.apiUrl}/${id}`, categoryData);
  }
  
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
