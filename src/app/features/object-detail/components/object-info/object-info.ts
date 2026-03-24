import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouristObject } from '../../../../shared/models/object.model';

@Component({
  selector: 'app-object-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './object-info.html',
  styleUrls: ['./object-info.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectInfo {
  object = input.required<TouristObject>();

  protected getInfrastructureItems(): { icon: string; label: string; value: boolean }[] {
    const infra = this.object().infrastructure;
    return [
      { icon: '🚻', label: 'Туалеты', value: infra.toilets },
      { icon: '☕', label: 'Кафе/рестораны', value: infra.cafe },
      { icon: '🛍️', label: 'Сувенирные лавки', value: infra.souvenirs },
      { icon: '🚲', label: 'Прокат транспорта', value: infra.rental },
      { icon: '🅿️', label: 'Парковка', value: infra.parking },
      { icon: '📶', label: 'Wi-Fi', value: infra.wifi }
    ];
  }
}