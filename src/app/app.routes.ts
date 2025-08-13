import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';
import { ProductoFormulario } from './pages/producto-formulario/producto-formulario';
import { CategoriaFormulario } from './pages/categoria-formulario/categoria-formulario';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Home2 } from './pages/home2/home2';
import { About } from './pages/about/about';

export const routes: Routes = [
    {path: '' , component: Home},
    {path: 'inicio', component: Home2},
    {path: 'catalogo', component: Catalogo },    
    {path: 'nosotros', component: About },
    {path: 'agregar-producto', component: ProductoFormulario },
    {path: 'crear-categoria', component: CategoriaFormulario },
    {path: 'login', component: Login },
    {path: 'editar-producto/:id', loadComponent: () => import('./pages/producto-formulario/producto-formulario').then(m => m.ProductoFormulario)},
    {path: 'editar-categoria/:id', loadComponent: () => import('./pages/categoria-formulario/categoria-formulario').then(m => m.CategoriaFormulario)},
    {path: 'producto/:id', loadComponent: () => import('./pages/detalle-producto/detalle-producto').then(m => m.DetalleProducto)},
];