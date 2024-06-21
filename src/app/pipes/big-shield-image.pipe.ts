import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../interfaces/equipos.interfaces';

@Pipe({
  name: 'bigShieldImage'
})
export class BigShieldImagePipe implements PipeTransform {
  transform(team: Team): string {
    if (!team.shield_big) {
      return 'assets/imagenes/no-shield.jpg';
    }
    return team.shield_big || '';
  }
}
