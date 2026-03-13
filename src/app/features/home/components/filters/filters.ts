import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FiltersState {
    // Тип объекта
    types: string[];

    // Регион
    region: string;

    // Доступная среда
    accessibility: {
        wheelchair: boolean;  // Для маломобильных
        visual: boolean;      // Для слабовидящих
        hearing: boolean;     // Для слабослышащих
        guideDog: boolean;    // Собаки-поводыри
    };

    // Инфраструктура
    infrastructure: {
        toilets: boolean;
        cafe: boolean;
        souvenirs: boolean;
        rental: boolean;
        parking: boolean;
        wifi: boolean;
    };

    // Активный отдых
    activities: {
        guidedTours: boolean;    // Экскурсии с гидом
        hiking: boolean;         // Походы/трекинг
        workshops: boolean;      // Мастер-классы
        sports: boolean;         // Спортивные активности
        children: boolean;       // Детские программы
    };

    // Время посещения
    season: {
        summer: boolean;
        winter: boolean;
        yearRound: boolean;
        evening: boolean;
    };

    // Стоимость
    price: {
        isFree: boolean;
        from: number | null;
        to: number | null;
    };
}

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './filters.html',
    styleUrls: ['./filters.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Filters {
    filtersChange = output<FiltersState>();

    // Состояние фильтров
    protected filters = signal<FiltersState>({
        types: [],
        region: '',
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
        },
        activities: {
            guidedTours: false,
            hiking: false,
            workshops: false,
            sports: false,
            children: false
        },
        season: {
            summer: false,
            winter: false,
            yearRound: false,
            evening: false
        },
        price: {
            isFree: false,
            from: null,
            to: null
        }
    });

    // Для отслеживания состояния раскрытых секций
    protected expandedSections = signal<Record<string, boolean>>({
        types: true,
        region: true,
        accessibility: false,
        infrastructure: false,
        activities: false,
        season: false,
        price: true
    });

    protected toggleSection(section: string): void {
        this.expandedSections.update(sections => ({
            ...sections,
            [section]: !sections[section]
        }));
    }

    protected applyFilters(): void {
        this.filtersChange.emit(this.filters());
    }

    protected resetFilters(): void {
        this.filters.set({
            types: [],
            region: '',
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
            },
            activities: {
                guidedTours: false,
                hiking: false,
                workshops: false,
                sports: false,
                children: false
            },
            season: {
                summer: false,
                winter: false,
                yearRound: false,
                evening: false
            },
            price: {
                isFree: false,
                from: null,
                to: null
            }
        });

        // Применяем пустые фильтры
        this.applyFilters();
    }

    // Вспомогательные методы для подсчета активных фильтров
    protected getActiveFiltersCount(): number {
        const f = this.filters();
        let count = 0;

        // Типы
        count += f.types.length;

        // Регион
        if (f.region) count += 1;

        // Доступная среда
        count += Object.values(f.accessibility).filter(Boolean).length;

        // Инфраструктура
        count += Object.values(f.infrastructure).filter(Boolean).length;

        // Активности
        count += Object.values(f.activities).filter(Boolean).length;

        // Сезон
        count += Object.values(f.season).filter(Boolean).length;

        // Цена
        if (f.price.isFree) count += 1;
        if (f.price.from) count += 1;
        if (f.price.to) count += 1;

        return count;
    }
}