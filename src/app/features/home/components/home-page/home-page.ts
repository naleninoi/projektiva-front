import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectCard } from '../../../../shared/components/object-card/object-card';
import { ObjectTable } from '../../../../shared/components/object-table/object-table';
import { PageSize, Pagination } from '../../../../shared/components/pagination/pagination';
import { PluralizePipe } from '../../../../shared/pipes/pluralize.pipe';
import { ObjectService } from '../../../../core/services/object.service';
import { Header } from '../../../../layout/header/header';
import { Footer } from '../../../../layout/footer/footer';
import { Filters, FiltersState } from '../filters/filters';
import { ViewToggle } from '../view-toggle/view-toggle';
import { TouristObject } from '../../../../shared/models/object.model';

export type ViewMode = 'grid' | 'table';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        CommonModule,
        Header,
        Footer,
        Filters,
        ViewToggle,
        ObjectCard,
        ObjectTable,
        Pagination,
        PluralizePipe
    ],
    templateUrl: './home-page.html',
    styleUrls: ['./home-page.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
    private objectService = inject(ObjectService);

    // Состояния
    protected viewMode = signal<ViewMode>('grid');
    protected currentPage = signal<number>(1);
    protected pageSize = signal<PageSize>(10);
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

    // Данные
    protected allObjects = signal<TouristObject[]>([]);
    protected loading = signal<boolean>(false);

    // Константа для размера страницы в режиме сетки
    private readonly GRID_PAGE_SIZE = 6;

    // Вычисляемые значения для пагинации
    protected filteredObjects = computed(() => {
        const objects = this.allObjects();
        const filters = this.filters();

        // TODO: здесь будет реальная фильтрация
        // Пока просто возвращаем все объекты
        return objects;
    });

    protected totalItems = computed(() => this.filteredObjects().length);

    // Активный размер страницы в зависимости от режима
    protected activePageSize = computed(() => {
        return this.viewMode() === 'grid' ? this.GRID_PAGE_SIZE : this.pageSize();
    });

    protected totalPages = computed(() => {
        return Math.ceil(this.totalItems() / this.activePageSize());
    });

    protected paginatedObjects = computed(() => {
        const start = (this.currentPage() - 1) * this.activePageSize();
        const end = start + this.activePageSize();
        return this.filteredObjects().slice(start, end);
    });

    ngOnInit(): void {
        this.loadObjects();
    }

    private loadObjects(): void {
        this.loading.set(true);

        this.objectService.getObjects().subscribe({
            next: (objects) => {
                this.allObjects.set(objects);
                this.loading.set(false);
            },
            error: (error) => {
                console.error('Ошибка загрузки объектов:', error);
                this.loading.set(false);
            }
        });
    }

    // Обработчики событий
    protected onViewModeChange(mode: ViewMode): void {
        const oldMode = this.viewMode();
        this.viewMode.set(mode);

        // При переключении с таблицы на сетку сбрасываем на первую страницу
        if (oldMode === 'table' && mode === 'grid') {
            this.currentPage.set(1);
        }
        // При переключении с сетки на таблицу также сбрасываем
        if (oldMode === 'grid' && mode === 'table') {
            this.currentPage.set(1);
        }
    }

    protected onFiltersChange(newFilters: FiltersState): void {
        this.filters.set(newFilters);
        this.currentPage.set(1);
        // TODO: добавить фильтрацию
    }

    protected onPageChange(page: number): void {
        this.currentPage.set(page);
        // Прокрутка к верху страницы
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    protected onPageSizeChange(size: PageSize): void {
        this.pageSize.set(size);
        this.currentPage.set(1);
    }
}