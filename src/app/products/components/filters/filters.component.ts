import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersService } from '../../services/filters.service';
import { DynamicFilter } from '../../types';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  activeFilters$: Observable<DynamicFilter[]>;

  constructor(private filtersService: FiltersService) {
    this.activeFilters$ = this.filtersService.activeFilters$;
  }

  ngOnInit(): void {}
}
