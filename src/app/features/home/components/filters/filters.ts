import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './filters.html',
    styleUrls: ['./filters.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Filters {
    filtersChange = output<any>();

    // Состояние фильтров (позже расширим)
    protected filters = {
        types: [] as string[],
        region: '',
        priceFrom: null as number | null,
        priceTo: null as number | null,
        accessibility: {
            wheelchair: false,
            visual: false,
            hearing: false,
            guideDog: false
        },
        infrastructure: {
            toilets: false,
            cafe: false,
            souvenirs: false,
            rental: false,
            parking: false,
            wifi: false
        }
    };

    protected applyFilters(): void {
        this.filtersChange.emit(this.filters);
    }

    protected resetFilters(): void {
        this.filters = {
            types: [],
            region: '',
            priceFrom: null,
            priceTo: null,
            accessibility: {
                wheelchair: false,
                visual: false,
                hearing: false,
                guideDog: false
            },
            infrastructure: {
                toilets: false,
                cafe: false,
                souvenirs: false,
                rental: false,
                parking: false,
                wifi: false
            }
        };
        this.applyFilters();
    }
}
