import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TouristObject } from '../../models/object.model';

@Component({
    selector: 'app-object-card',
    standalone: true,
    templateUrl: './object-card.html',
    styleUrls: ['./object-card.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectCard {
    object = input.required<TouristObject>();

    // Вспомогательные методы для шаблона
    protected getAccessibilityIcons(object: TouristObject): string[] {
        const icons: string[] = [];
        if (object.accessibility.wheelchair) icons.push('♿');
        if (object.accessibility.visual) icons.push('👁️');
        if (object.accessibility.hearing) icons.push('👂');
        return icons;
    }

    protected getInfrastructureIcons(object: TouristObject): { icon: string; tooltip: string }[] {
        const items: { icon: string; tooltip: string }[] = [];
        if (object.infrastructure.toilets) items.push({ icon: '🚻', tooltip: 'Туалеты' });
        if (object.infrastructure.cafe) items.push({ icon: '☕', tooltip: 'Кафе' });
        if (object.infrastructure.souvenirs) items.push({ icon: '🛍️', tooltip: 'Сувениры' });
        if (object.infrastructure.rental) items.push({ icon: '🚲', tooltip: 'Прокат' });
        if (object.infrastructure.parking) items.push({ icon: '🅿️', tooltip: 'Парковка' });
        if (object.infrastructure.wifi) items.push({ icon: '📶', tooltip: 'Wi-Fi' });
        return items;
    }

    protected getPriceText(object: TouristObject): string {
        if (object.price.isFree) return 'Бесплатно';
        if (object.price.min && object.price.max) {
            return `от ${object.price.min} – ${object.price.max} ₽`;
        }
        if (object.price.min) {
            return `от ${object.price.min} ₽`;
        }
        return 'Цена не указана';
    }
}
