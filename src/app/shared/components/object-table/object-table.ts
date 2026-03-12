import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TouristObject } from '../../models/object.model';

@Component({
    selector: 'app-object-table',
    standalone: true,
    templateUrl: './object-table.html',
    styleUrls: ['./object-table.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectTable {
    objects = input.required<TouristObject[]>();

    protected getAccessibilityIcons(object: TouristObject): string[] {
        const icons: string[] = [];
        if (object.accessibility.wheelchair) icons.push('♿');
        if (object.accessibility.visual) icons.push('👁️');
        if (object.accessibility.hearing) icons.push('👂');
        return icons;
    }

    protected getInfrastructureIcons(object: TouristObject): string[] {
        const icons: string[] = [];
        if (object.infrastructure.toilets) icons.push('🚻');
        if (object.infrastructure.cafe) icons.push('☕');
        if (object.infrastructure.souvenirs) icons.push('🛍️');
        if (object.infrastructure.rental) icons.push('🚲');
        if (object.infrastructure.parking) icons.push('🅿️');
        if (object.infrastructure.wifi) icons.push('📶');
        return icons;
    }

    protected getPriceText(object: TouristObject): string {
        if (object.price.isFree) return 'Бесплатно';
        if (object.price.min) {
            return `от ${object.price.min} ₽`;
        }
        return '—';
    }
}
