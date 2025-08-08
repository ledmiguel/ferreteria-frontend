import { Component, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService, ProductData } from '../../services/product';
import { CategoryService, CategoryData } from '../../services/category';

@Component({
  selector: 'app-producto-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './producto-formulario.html',
  styleUrls: ['./producto-formulario.css']
})
export class ProductoFormulario implements OnInit {
  nuevoProducto: ProductData = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: 0,
    images: [],
    features: []
  };

  categorias: CategoryData[] = [];
  mensaje = '';
  productoId?: number;
  modoEdicion = false;

  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categorias = data;
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.modoEdicion = true;
        this.productoId = +id;
        this.productService.getProductById(this.productoId).subscribe({
          next: (producto) => {
            this.nuevoProducto = producto;
          },
          error: () => {
            this.mensaje = 'Error al cargar el producto';
          }
        });
      }
    });
  }

  guardarProducto(): void {
    if (
      this.nuevoProducto.name &&
      this.nuevoProducto.price &&
      this.nuevoProducto.imageUrl &&
      this.nuevoProducto.categoryId
    ) {
      // ✅ Limpieza previa
      const productoAEnviar: ProductData = {
        ...this.nuevoProducto,
        images: this.nuevoProducto.images?.filter(img => img.url.trim() !== '') || [],
        features: this.nuevoProducto.features?.filter(f => f.name.trim() !== '' && f.value.trim() !== '') || []
      };

      if (this.modoEdicion && this.productoId) {
        this.productService.updateProduct(this.productoId, productoAEnviar).subscribe({
          next: () => {
            this.mensaje = 'Producto actualizado exitosamente';
            this.router.navigate(['/catalogo']);
          },
          error: (error) => {
            console.error(error);
            this.mensaje = 'Error al actualizar el producto';
          }
        });
      } else {
        this.productService.createProduct(productoAEnviar).subscribe({
          next: () => {
            this.mensaje = 'Producto agregado exitosamente';
            this.nuevoProducto = {
              name: '',
              description: '',
              price: 0,
              imageUrl: '',
              categoryId: 0,
              images: [],
              features: []
            };
            this.nameInput.nativeElement.focus();
          },
          error: (error) => {
            console.error(error);
            this.mensaje = 'Error al agregar el producto';
          }
        });
      }
    } else {
      this.mensaje = 'Completa todos los campos obligatorios';
    }
  }

  agregarImagen(): void {
    this.nuevoProducto.images?.push({ url: '' });
  }

  eliminarImagen(index: number): void {
    this.nuevoProducto.images?.splice(index, 1);
  }

  agregarCaracteristica(): void {
    this.nuevoProducto.features?.push({ name: '', value: '' });
  }

  eliminarCaracteristica(index: number): void {
    this.nuevoProducto.features?.splice(index, 1);
  }

}