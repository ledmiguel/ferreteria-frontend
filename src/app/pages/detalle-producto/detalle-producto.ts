import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, ProductData } from '../../services/product';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.html',
  styleUrls: ['./detalle-producto.css']
})
export class DetalleProducto implements OnInit {
  producto!: ProductData | null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => this.producto = data,
      error: () => alert('Producto no encontrado')
    });
  }

  generarEnlaceWhatsApp(nombre: string): string {
    const mensaje = `Hola, estoy interesado en el producto: ${nombre}`;
    return `https://wa.me/51955166689?text=${encodeURIComponent(mensaje)}`;
  }
}
