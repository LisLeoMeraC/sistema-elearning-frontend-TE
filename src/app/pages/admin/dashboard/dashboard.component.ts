import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  breadcrumbList: Array<any> = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbList = this.createBreadcrumbs(this.activatedRoute.root);
      }
    });
  }

  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<any> = []): Array<any> {
    let newBreadcrumbs = [...breadcrumbs];

    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return newBreadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'] || this.formatLabel(routeURL);
      const newBreadcrumb = { label, url };

      // Si la ruta es nueva, la añadimos
      if (!newBreadcrumbs.some(b => b.url === url)) {
        newBreadcrumbs.push(newBreadcrumb);
      }
      newBreadcrumbs = this.createBreadcrumbs(child, url, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

  private formatLabel(urlSegment: string): string {
    // Lógica para dar formato o traducir los segmentos de la URL
    return urlSegment.charAt(0).toUpperCase() + urlSegment.slice(1);
  }
}
