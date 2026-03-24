import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouristObject } from '../../../../shared/models/object.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-object-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './object-sidebar.html',
  styleUrls: ['./object-sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectSidebar {
  object = input.required<TouristObject>();

  // Событие для бронирования (можно будет расширить)
  bookClick = output<void>();

  constructor(private favoritesService: FavoritesService) {}

  protected isFavorite = computed(() =>
      this.favoritesService.isFavorite(this.object().id)
  );

  protected getPriceText(): string {
    const obj = this.object();
    if (obj.price.isFree) return 'Бесплатно';
    if (obj.price.min && obj.price.max) {
      return `от ${obj.price.min} – ${obj.price.max} ₽`;
    }
    if (obj.price.min) {
      return `от ${obj.price.min} ₽`;
    }
    return 'Цена не указана';
  }

  protected toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.object().id);
  }

  protected onBook(): void {
    this.bookClick.emit();
  }
}