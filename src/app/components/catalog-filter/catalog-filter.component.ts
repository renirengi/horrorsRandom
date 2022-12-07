import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IFilterConfig } from 'src/app/interfaces';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
})
export class CatalogFilterComponent {
  @Input() config!: IFilterConfig;
  @Output() change = new EventEmitter<{name: string, values: string[]}>();

  constructor() { }

  onSelectionChange(data: MatSelectChange) {
    this.change.emit({ name: this.config.name, values: data.value});
  }
}
