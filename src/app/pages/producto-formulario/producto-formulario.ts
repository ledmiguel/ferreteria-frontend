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
    categoryId: 0
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
      if (this.modoEdicion && this.productoId) {
        this.productService.updateProduct(this.productoId, this.nuevoProducto).subscribe({
          next: () => {
            this.mensaje = 'Producto actualizado exitosamente';
            this.router.navigate(['/catalogo']); // Vuelve al catálogo
          },
          error: () => {
            this.mensaje = 'Error al actualizar el producto';
          }
        });
      } else {
        this.productService.createProduct(this.nuevoProducto).subscribe({
          next: () => {
            this.mensaje = 'Producto agregado exitosamente';
            this.nuevoProducto = {
              name: '',
              description: '',
              price: 0,
              imageUrl: '',
              categoryId: 0
            };
            this.nameInput.nativeElement.focus();
          },
          error: () => {
            this.mensaje = 'Error al agregar el producto';
          }
        });
      }
    } else {
      this.mensaje = 'Completa todos los campos obligatorios';
    }
  }
}