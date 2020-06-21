import { Component, OnInit } from '@angular/core';
import { Automobile } from '../automobile';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomobileService } from '../automobile.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-automobile-edit',
  templateUrl: './automobile-edit.component.html',
  styleUrls: ['./automobile-edit.component.css']
})
export class AutomobileEditComponent implements OnInit {
  errorMessage: string = '';
  selectedAutomobile: Automobile = new Automobile();
  dataImmatricolazioneString: string = '';

  constructor(private route: ActivatedRoute, private automobileService: AutomobileService,
    private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    let idParam = +this.route.snapshot.paramMap.get('id');
    this.automobileService.getAutomobile(idParam).subscribe(
      automobileItem => {
        this.selectedAutomobile = automobileItem;
        console.log(JSON.stringify(automobileItem));
        this.dataImmatricolazioneString = this.datePipe.transform(automobileItem.dataImmatricolazione, 'yyyy-MM-dd');
      },
      err => this.errorMessage = err
    )
  }

  update(automobileForm: NgForm): void {
    const dataImmatricolazioneStringParsed = new Date(this.dataImmatricolazioneString);
    this.selectedAutomobile.dataImmatricolazione = dataImmatricolazioneStringParsed;

    if (automobileForm.valid) {
      this.automobileService.update(this.selectedAutomobile).subscribe(
        automobileItem => {
          console.log('modificato ' + JSON.stringify(automobileItem));
          this.selectedAutomobile = automobileItem;
        },
        err => this.errorMessage = err,
        () => this.router.navigate([`/automobile/${this.selectedAutomobile.id}`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
      );
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }

  }

}
