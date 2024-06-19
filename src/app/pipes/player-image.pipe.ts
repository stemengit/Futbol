import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/jugadores.interface';

@Pipe({
  name: 'playerImage'
})
export class PlayerImagePipe implements PipeTransform {

  transform(player: Player): string {
    if (!player.image) {
      return 'assets/imagenes/no-image.png';
    }
    return player.image;
  }

}

