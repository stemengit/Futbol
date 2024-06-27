import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-player-sidebar',
  templateUrl: './player-sidebar.component.html',
  styleUrls: ['./player-sidebar.component.css']
})
export class SidebarComponent {

  @Input() ratings: number[] = [];
  @Input() countries: string[] = [];
  @Input() roles: { text: string, class: string, value: string }[] = [];


  @Output() ratingChange = new EventEmitter<string>();
  @Output() roleChange = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();

  @Output() filters = new EventEmitter<{rating: string , role: string , country: string , name: string }>();

  @Output() searchEvent = new EventEmitter<string>();

  public myForm: FormGroup;
  public filteredRatings!: Observable<string[]>;
  public filteredCountries!: Observable<string[]>;
  public name: string = '';

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      rating: [''],
      role: [''],
      country: ['']
    });
  }


  ngOnInit(): void {

    this.filteredRatings = this.myForm.get('rating')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.ratings))
    );

    this.filteredCountries = this.myForm.get('country')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.countries))
    );

    // this.myForm.get('rating')!.valueChanges.subscribe(value => {
    //   this.ratingChange.emit(value);
    // });

    // this.myForm.get('role')!.valueChanges.subscribe(value => {
    //   this.roleChange.emit(value);
    // });

    // this.myForm.get('country')!.valueChanges.subscribe(value => {
    //   this.countryChange.emit(value);
    // });
  }

  // onSearchPlayer(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   const searchValue = target.value;
  //   // this.searchEvent.emit(searchValue);
  //   this.name = searchValue;
  // }

  private _filter(value: string, options: any[]): any[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toString().toLowerCase().includes(filterValue));
  }

  onApplyFilters(){
    this.filters.emit({rating: this.myForm.get('rating')?.value, role: this.myForm.get('role')?.value, country: this.myForm.get('country')?.value, name: this.name  })
  }

  onReset(){
    this.myForm.get('rating')?.setValue('');
    this.myForm.get('role')?.setValue('');
    this.myForm.get('country')?.setValue('');
    this.name = '';

    this.filters.emit({rating: this.myForm.get('rating')?.value, role: this.myForm.get('role')?.value, country: this.myForm.get('country')?.value, name: this.name  })
  }

}

