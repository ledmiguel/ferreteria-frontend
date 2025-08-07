import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  copyrightText = 'Miguel Leandro - Todos los derechos reservados'
  currentYear = new Date().getFullYear();
}
