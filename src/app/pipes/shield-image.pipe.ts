import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../interfaces/equipos.interfaces';

@Pipe({
  name: 'shieldImage'
})
export class ShieldImagePipe implements PipeTransform {

  transform(team: Team): string {
    if (!team.shield) {
      return 'assets/imagenes/no-shield.jpg';
    }
    return team.shield;
  }

}
