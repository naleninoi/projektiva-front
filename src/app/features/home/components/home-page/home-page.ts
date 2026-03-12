import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectCard } from '../../../../shared/components/object-card/object-card';
import { ObjectTable } from '../../../../shared/components/object-table/object-table';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { PluralizePipe } from '../../../../shared/pipes/pluralize.pipe';
import { TouristObject } from '../../../../shared/models/object.model';
import { ObjectService } from '../../../../core/services/object.service';
import { Header } from '../../../../layout/header/header';
import { Footer } from '../../../../layout/footer/footer';
import { Filters } from '../filters/filters';
import { ViewToggle } from '../view-toggle/view-toggle';

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
        PluralizePipe,
        Header,
        Footer
    ],
    templateUrl: './home-page.html',
    styleUrls: ['./home-page.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
    // Состояния
    protected viewMode = signal<ViewMode>('grid');
    protected currentPage = signal<number>(1);
    protected pageSize = signal<number>(6);
    protected totalItems = signal<number>(0);

    // Фильтры (пока пустые, потом расширим)
    protected filters = signal<any>({});

    // Данные
    protected objects = signal<TouristObject[]>([]);
    protected loading = signal<boolean>(false);

    constructor(private objectService: ObjectService) {
        // Загружаем объекты при изменении фильтров или пагинации
        // В реальном проекте здесь будет комбинация сигналов
        this.loadObjects();
    }

    private loadObjects(): void {
        this.loading.set(true);

        // Здесь будет запрос с фильтрацией и пагинацией
        this.objectService.getObjects().subscribe({
            next: (objects) => {
                this.objects.set(objects);
                this.totalItems.set(objects.length);
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
        this.viewMode.set(mode);
    }

    protected onFiltersChange(newFilters: any): void {
        this.filters.set(newFilters);
        this.currentPage.set(1); // Сбрасываем на первую страницу
        this.loadObjects(); // Перезагружаем с новыми фильтрами
    }

    protected onPageChange(page: number): void {
        this.currentPage.set(page);
        this.loadObjects(); // Загружаем данные для новой страницы
    }

    // Вычисляемые значения для пагинации
    protected get paginatedObjects(): TouristObject[] {
        const start = (this.currentPage() - 1) * this.pageSize();
        const end = start + this.pageSize();
        return this.objects().slice(start, end);
    }

    protected get totalPages(): number {
        return Math.ceil(this.totalItems() / this.pageSize());
    }
}
