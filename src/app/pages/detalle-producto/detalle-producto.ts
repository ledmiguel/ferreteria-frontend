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
  imagenSeleccionadaIndex = 0;
  modalAbierto = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.imagenSeleccionadaIndex = 0;
      },
      error: () => alert('Producto no encontrado')
    });
  }

  get imagenSeleccionada(): string | null {
    if (!this.producto) return null;
    return this.imagenSeleccionadaIndex === 0
      ? this.producto.imageUrl
      : this.producto.images?.[this.imagenSeleccionadaIndex - 1]?.url || null;
  }

  cambiarImagen(index: number) {
    this.imagenSeleccionadaIndex = index;
  }

  abrirModal(index: number) {
    this.imagenSeleccionadaIndex = index;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  siguienteImagen() {
    if (!this.producto) return;
    const total = 1 + (this.producto.images?.length || 0);
    this.imagenSeleccionadaIndex = (this.imagenSeleccionadaIndex + 1) % total;
  }

  anteriorImagen() {
    if (!this.producto) return;
    const total = 1 + (this.producto.images?.length || 0);
    this.imagenSeleccionadaIndex =
      (this.imagenSeleccionadaIndex - 1 + total) % total;
  }

  generarEnlaceWhatsApp(nombre: string): string {
    const mensaje = `Hola, estoy interesado en el producto: ${nombre}`;
    return `https://wa.me/51955166689?text=${encodeURIComponent(mensaje)}`;
  }
}
