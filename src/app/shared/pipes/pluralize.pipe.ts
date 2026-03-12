import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pluralize',
    standalone: true
})
export class PluralizePipe implements PipeTransform {
    transform(count: number, word: string): string {
        const forms: Record<string, string[]> = {
            'объект': ['объект', 'объекта', 'объектов'],
            'отзыв': ['отзыв', 'отзыва', 'отзывов'],
        };

        const form = forms[word] || [word, word + 'а', word + 'ов'];

        if (count % 10 === 1 && count % 100 !== 11) {
            return form[0];
        } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            return form[1];
        } else {
            return form[2];
        }
    }
}