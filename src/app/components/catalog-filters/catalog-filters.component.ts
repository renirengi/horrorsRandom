import {
  Component,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilterConfig } from 'src/app/interfaces';

@Component({
  selector: 'app-catalog-filters',
  templateUrl: './catalog-filters.component.html',
})
export class CatalogFiltersComponent {

  public filters$!: Observable<IFilterConfig[]>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.filters$ = this.route.data.pipe(
      map(({ filters }) => filters)
    );
  }


  public onChange({name, values}: {name: string, values: string[]}) {
    this.router.navigate(['/catalog'], { queryParams: { [name]: values }});
    console.log(name, values);
  }
}
