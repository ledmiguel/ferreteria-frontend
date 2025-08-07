import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment.prod';

export interface ProductData {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`; // Ajusta si tu backend usa otra ruta

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<ProductData> {
    return this.http.get<ProductData>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductData): Observable<ProductData> {
    return this.http.post<ProductData>(this.apiUrl, product, {
    headers: this.getAuthHeaders()
    });
  }

  updateProduct(id: number, product: ProductData): Observable<ProductData> {
    return this.http.put<ProductData>(`${this.apiUrl}/${id}`, product, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
