import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Automobile } from '../automobile';
import { AutomobileService } from '../automobile.service';

@Component({
  selector: 'app-automobile-detail',
  templateUrl: './automobile-detail.component.html',
  styleUrls: ['./automobile-detail.component.css']
})
export class AutomobileDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private automobileService: AutomobileService,
    private router: Router) { }

  selectedAutomobile: Automobile;
  errorMessage: string = '';
  confirmMessage: string = '';

  ngOnInit(): void {
    let idParam = +this.route.snapshot.paramMap.get('id');
    this.automobileService.getAutomobile(idParam).subscribe(
      (automobileItem: Automobile) => {
        this.selectedAutomobile = automobileItem;
        console.log(JSON.stringify(automobileItem))
      },
      err => this.errorMessage = err
    );

    //verifico presenza messaggio nei query params
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il confirmMessage non faccio nulla
        this.confirmMessage = params['confirmMessage'] ? params['confirmMessage'] : '';
      });
  }

}
