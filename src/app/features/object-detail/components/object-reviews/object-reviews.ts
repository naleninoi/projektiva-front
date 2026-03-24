import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouristObject } from '../../../../shared/models/object.model';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

@Component({
  selector: 'app-object-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './object-reviews.html',
  styleUrls: ['./object-reviews.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectReviews {
  object = input.required<TouristObject>();

  // Заглушка для отзывов (позже можно загружать с сервера)
  protected reviews: Review[] = [
    {
      id: '1',
      author: 'Анна',
      rating: 5,
      text: 'Замечательное место! Обязательно посетите. Очень атмосферно и познавательно. Экскурсовод рассказывал увлеченно.',
      date: 'март 2026'
    },
    {
      id: '2',
      author: 'Михаил',
      rating: 4,
      text: 'Очень понравилось. Рекомендую взять экскурсию с гидом, без неё многое осталось бы непонятным.',
      date: 'февраль 2026'
    },
    {
      id: '3',
      author: 'Елена',
      rating: 5,
      text: 'Потрясающее место! Вернусь сюда ещё. Спасибо организаторам за отличную работу.',
      date: 'январь 2026'
    }
  ];

  protected getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}