import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-team-sidebar',
  templateUrl: './team-sidebar.component.html',
  styleUrl: './team-sidebar.component.css'
})
export class TeamSidebarComponent {

  @Output() searchEvent = new EventEmitter<string>();

  onSearchChangePlayer(event: Event): void {

    const target = event.target as HTMLInputElement;
    const searchValue = target.value;

    this.searchEvent.emit(searchValue);
   }

}
