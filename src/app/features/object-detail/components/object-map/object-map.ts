import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouristObject } from '../../../../shared/models/object.model';

@Component({
  selector: 'app-object-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './object-map.html',
  styleUrls: ['./object-map.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectMap {
  object = input.required<TouristObject>();

  protected getYandexMapsUrl(): string {
    const coords = this.object().location.coordinates;
    return `https://yandex.ru/maps/?pt=${coords.lng},${coords.lat}&z=15&l=map`;
  }

  protected getStaticMapUrl(): string {
    const coords = this.object().location.coordinates;
    // Статическая карта-заглушка с маркером
    return `https://static-maps.yandex.ru/1.x/?ll=${coords.lng},${coords.lat}&z=14&l=map&pt=${coords.lng},${coords.lat},pm2rdm`;
  }
}