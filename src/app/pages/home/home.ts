import { Component } from '@angular/core';
import { FeaturedProducts } from '../featured-products/featured-products';

@Component({
  selector: 'app-home',
  imports: [FeaturedProducts],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
}
