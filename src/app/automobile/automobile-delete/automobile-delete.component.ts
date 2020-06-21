import { Component, OnInit } from '@angular/core';
import { Automobile } from '../automobile';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomobileService } from '../automobile.service';

@Component({
  selector: 'app-automobile-delete',
  templateUrl: './automobile-delete.component.html',
  styleUrls: ['./automobile-delete.component.css']
})
export class AutomobileDeleteComponent implements OnInit {

  errorMessage: string = '';
  selectedAutomobile: Automobile;

  constructor(private route: ActivatedRoute, private automobileService: AutomobileService,
    private router: Router) { }

  ngOnInit(): void {
    let idParam = +this.route.snapshot.paramMap.get('id');
    this.automobileService.getAutomobile(idParam).subscribe(
      automobileItem => this.selectedAutomobile = automobileItem,
      err => this.errorMessage = err
    )
  }

  delete(automobileInput: Automobile): void {
    console.log('Automobile da eliminare...' + JSON.stringify(automobileInput));
    this.automobileService.delete(automobileInput).subscribe(
      () => { },
      err => this.errorMessage = err,
      () => this.router.navigate(['/automobile/search'], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
    );
  }

}
