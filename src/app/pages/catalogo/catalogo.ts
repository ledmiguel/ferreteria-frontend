import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

import { ProductService, ProductData } from '../../services/product';
import { CategoryService, CategoryData } from '../../services/category';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class Catalogo implements OnInit {
  productos: ProductData[] = [];
  productosFiltrados: ProductData[] = [];
  categorias: CategoryData[] = [];
  categoriaSeleccionada: number | '' = '';
  busquedaTexto: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {
    this.productService.getProducts().subscribe({
      next: (data: ProductData[]) => {
        this.productos = data;
        this.aplicarFiltros(); // Aplica filtros
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        alert('Ocurrió un error al cargar los productos.');
      }
    });
  }

  cargarCategorias(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        alert('Ocurrió un error al cargar las categorías.');
      }
    });
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideCategoria =
        this.categoriaSeleccionada === '' || p.categoryId === Number(this.categoriaSeleccionada);

      const coincideTexto =
        this.busquedaTexto.trim() === '' ||
        p.name.toLowerCase().includes(this.busquedaTexto.toLowerCase());

      return coincideCategoria && coincideTexto;
    });
  }

  eliminarProducto(id: number): void {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmar) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.productosFiltrados = this.productos.filter(p => p.id !== id);
          this.aplicarFiltros();
        },
        error: err => {
          console.error('Error al eliminar producto:', err);
          alert('No se pudo eliminar el producto.');
        }
      });
    }
  }

  generarEnlaceWhatsApp(nombre: string): string {
    const mensaje = `Hola, estoy interesado en el producto: ${nombre}`;
    return `https://wa.me/51955166689?text=${encodeURIComponent(mensaje)}`;
  }
}
