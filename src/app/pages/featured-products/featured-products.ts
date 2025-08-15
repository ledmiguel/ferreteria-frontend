import { Component, OnInit } from '@angular/core';
import { ProductService, ProductData } from '../../services/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured-products',
  imports: [RouterModule],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css'
})
export class FeaturedProducts implements OnInit{
  featuredProducts: ProductData[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data;
      },
      error: (err) => console.error('Error al obterner productos destacados', err)
    });    
  }
}
