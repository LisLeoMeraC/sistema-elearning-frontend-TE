import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
  public breadcrumbs$ = this.breadcrumbs.asObservable();
  private breadcrumbHistory: Array<{ label: string, url: string }> = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Aquí es donde necesitas obtener la etiqueta del breadcrumb, posiblemente desde una función o un mapa.
        const label = this.getLabelForUrl(event.urlAfterRedirects);
        this.addBreadcrumb(event.urlAfterRedirects, label);
      }
    });
  }

  private addBreadcrumb(url: string, label: string) {
    // Evita duplicados revisando si la URL ya está en el historial
    const existingIndex = this.breadcrumbHistory.findIndex(bc => bc.url === url);
    if (existingIndex === -1 || existingIndex !== this.breadcrumbHistory.length - 1) {
      // Añade o actualiza la miga de pan
      const newBreadcrumb = { label, url };
      this.breadcrumbHistory = this.breadcrumbHistory.slice(0, existingIndex + 1);
      this.breadcrumbHistory.push(newBreadcrumb);
      this.breadcrumbs.next(this.breadcrumbHistory);
    }
  }

  private getLabelForUrl(url: string): string {
    // Asumimos que la función getLabelForUrl determina la etiqueta del breadcrumb.
    // Debes implementar esta lógica según tus requisitos.
    // Esto puede ser tan simple como tomar el último segmento de la URL o algo más complejo.
    return url.split('/').pop() || 'Home';
  }

  public resetBreadcrumbs(): void {
    this.breadcrumbHistory = [];
    this.breadcrumbs.next([]);
  }
}