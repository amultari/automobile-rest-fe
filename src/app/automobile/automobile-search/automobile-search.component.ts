import { Component, OnInit } from '@angular/core';
import { Automobile } from '../automobile';
import { AutomobileService } from '../automobile.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AutomobilePaginationInfoService } from '../automobile-pagination-info.service';

@Component({
  selector: 'app-automobile-search',
  templateUrl: './automobile-search.component.html',
  styleUrls: ['./automobile-search.component.css']
})
export class AutomobileSearchComponent implements OnInit {

  errorMessage: string = '';
  confirmMessage: string = '';
  //bean usato per il form
  automobileSearch: Automobile;
  //lista di risultati di cui fare il display nel nested component
  searchResults: Automobile[] = [];

  //Pagination (nel backend iniziano da zero)
  currentPage: number = 0;
  //il totalCount della query
  totalCount: number = 0;

  getMaxPerPage(): number {
    return this.automobilePaginationInfoService.getMaxPerPage();
  }

  constructor(private automobileService: AutomobileService, private automobilePaginationInfoService: AutomobilePaginationInfoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let stoTornandoIndietroDaSottofunzione: boolean = false;
    //verifico presenza parametro che mi dice che sto tornando indietro da una sottofunzione oppure del messagio di conferma
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il _backFromSubFunction_ non faccio nulla
        console.log('query params...' + params['_backFromSubFunction_'])
        stoTornandoIndietroDaSottofunzione = params['_backFromSubFunction_'] && params['_backFromSubFunction_'] === "true" ? true : false;
        // se non è presente il confirmMessage non faccio nulla
        this.confirmMessage = params['confirmMessage'] ? params['confirmMessage'] : '';
      });

    if (!stoTornandoIndietroDaSottofunzione) {
      this.resetForm();
      this.resetResults();
    } else {
      this.restorePaginationInfo();
    }
  }

  resetForm(): void {
    this.automobileSearch = new Automobile();
    this.automobileSearch.inProduzione = null;
    this.automobilePaginationInfoService.resetForm();
  }

  resetResults(): void {
    this.searchResults = [];
    this.currentPage = 0;
    this.totalCount = 0;
    this.automobilePaginationInfoService.resetResults();
  }

  search(automobileForm: NgForm): void {
    this.resetResults();
    console.log('sub ' + JSON.stringify(this.automobileSearch));
    this.executeSearchAndBindResults();
  }

  nextPage(nextPageFromEmitter: number) {
    //devo sottrarre uno all'emitter perché parte da uno
    this.currentPage = nextPageFromEmitter - 1;
    this.executeSearchAndBindResults();
  }

  private executeSearchAndBindResults(): void {
    const paginationParams: Map<string, string> = new Map<string, string>();
    paginationParams.set('pageNo', this.currentPage.toString());
    paginationParams.set('pageSize', this.getMaxPerPage().toString());

    //TODO gestire ordine e sorting (ma purtroppo la libreria usata in questo progetto non lo consente)
    paginationParams.set('sortBy', 'marca');

    this.automobileService.searchAutomobili(this.automobileSearch, paginationParams).subscribe(
      searchResultsItem => {
        this.searchResults = searchResultsItem.content;
        this.totalCount = searchResultsItem.totalElements;
        this.currentPage = searchResultsItem.pageable.pageNumber;
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = err;
        this.searchResults = [];
      },
      () => this.automobilePaginationInfoService.updatePaginationInfo(this.automobileSearch,
        this.searchResults, this.currentPage, this.totalCount)
    );
  }

  restorePaginationInfo(): void {
    this.automobileSearch = this.automobilePaginationInfoService.automobileSearch;
    this.searchResults = this.automobilePaginationInfoService.searchResults;
    this.currentPage = this.automobilePaginationInfoService.currentPage;
    this.totalCount = this.automobilePaginationInfoService.totalCount;
  }

}
