import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-player-sidebar',
  templateUrl: './player-sidebar.component.html',
  styleUrl: './player-sidebar.component.css'
})
export class SidebarComponent {

  @Output() searchEvent = new EventEmitter<string>();

  onSearchChangePlayer(event: Event): void {

    const target = event.target as HTMLInputElement;
    const searchValue = target.value;

    this.searchEvent.emit(searchValue);
   }

}
