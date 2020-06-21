import { Injectable } from '@angular/core';
import { Automobile } from './automobile';

@Injectable({
  providedIn: 'root'
})
export class AutomobilePaginationInfoService {

  //bean usato per il form
  automobileSearch: Automobile;
  //lista di risultati di cui fare il display 
  searchResults: Automobile[] = [];

  //Pagination
  currentPage: number = 0;
  //numero di elementi per pagina
  static readonly MAXPERPAGE: number = 5;
  //il totalCount della query
  totalCount: number = 0;
  //l'offset che mi aiuta a capire in che porzione della paginazione mi trovo

  getMaxPerPage(): number {
    return AutomobilePaginationInfoService.MAXPERPAGE;
  }

  constructor() { }

  resetForm(): void {
    this.automobileSearch = new Automobile();
    this.automobileSearch.inProduzione = null;
  }

  resetResults(): void {
    this.searchResults = [];
    this.currentPage = 0;
    this.totalCount = 0;
  }

  updatePaginationInfo(automobileSearchInput: Automobile, searchResultsInput: Automobile[],
    currentPageInput: number, totalCountInput: number): void {
    this.automobileSearch = automobileSearchInput;
    this.searchResults = searchResultsInput;
    this.currentPage = currentPageInput;
    this.totalCount = totalCountInput;
  }
}
