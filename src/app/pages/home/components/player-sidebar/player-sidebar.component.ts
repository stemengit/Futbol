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
  @Input() roles: { text: string, class: string }[] = [];

  @Output() ratingChange = new EventEmitter<number>();
  @Output() roleChange = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();

  public myForm: FormGroup;
  public filteredRatings!: Observable<string[]>;
  public filteredCountries!: Observable<string[]>;

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

    this.myForm.get('rating')!.valueChanges.subscribe(value => {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        this.ratingChange.emit(numericValue);
      }
    });


    this.myForm.get('role')!.valueChanges.subscribe(value => {
      this.roleChange.emit(value);
    });

    this.myForm.get('country')!.valueChanges.subscribe(value => {
      this.countryChange.emit(value);
    });
  }

  onSearchPlayer(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value;
    this.searchEvent.emit(searchValue);
  }

  onSearchCountry(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value;
    this.countryChange.emit(searchValue.toLowerCase());
  }

  onSearchRating(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = parseFloat(target.value);
    if (!isNaN(searchValue)) {
      this.ratingChange.emit(searchValue);
    }
  }

  private _filter(value: string, options: any[]): any[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toString().toLowerCase().includes(filterValue));
  }

}
