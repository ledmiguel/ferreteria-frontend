import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { CategoryData, CategoryService } from '../../services/category';

@Component({
  selector: 'app-categoria-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './categoria-formulario.html',
  styleUrls: ['./categoria-formulario.css']
})

export class CategoriaFormulario implements OnInit {
  nuevaCategoria = {
    name: ''
  };

  mensaje = '';
  modoEdicion = false;
  categoriaId: number | null = null;
  categorias: CategoryData[] = [];

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.modoEdicion = true;
        this.categoriaId = +idParam;
        this.categoryService.getCategories().subscribe(categorias => {
          const categoria = categorias.find(c => c.id === this.categoriaId);
          if (categoria) {
            this.nuevaCategoria.name = categoria.name;
          }
        });
      }
    });
    
    // Cargar lista de categorías
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: () => {
        this.mensaje = '❌ Error al cargar las categorías';
      }
    });
  }

  guardarCategoria(): void {
    if (this.nuevaCategoria.name.trim() === '') {
      this.mensaje = '⚠️ El nombre de la categoría es obligatorio';
      return;
    }

    if (this.modoEdicion && this.categoriaId !== null) {
      this.categoryService.updateCategory(this.categoriaId, this.nuevaCategoria).subscribe({
        next: () => {
          this.mensaje = 'Categoría actualizada exitosamente ✅';
          setTimeout(() => this.router.navigate(['/categorias']), 1500);
          this.nuevaCategoria.name = '';
          this.cargarCategorias();
        },
        error: () => {
          this.mensaje = '❌ Error al actualizar la categoría';
        }
      });
    } else {
      this.categoryService.createCategory(this.nuevaCategoria).subscribe({
        next: () => {
          this.mensaje = 'Categoría agregada exitosamente ✅';
          this.nuevaCategoria.name = '';
          this.cargarCategorias();
        },
        error: () => {
          this.mensaje = '❌ Error al agregar la categoría';
        }
      });
    }
  }

  editarCategoria(categoria: any): void {
    this.nuevaCategoria = { name: categoria.name };
    this.categoriaId = categoria.id;
    this.modoEdicion = true;
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.mensaje = '✅ Categoría eliminada';
          this.cargarCategorias();
        },
        error: () => {
          this.mensaje = '❌ Error al eliminar la categoría';
        }
      });
    }
  }

    resetFormulario(): void {
    this.nuevaCategoria = { name: '' };
    this.modoEdicion = false;
    this.categoriaId = null;
  }

}
