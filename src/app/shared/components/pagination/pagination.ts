import { ChangeDetectionStrategy, Component, input, output, computed, effect, inject } from '@angular/core';

export type PageSize = 5 | 10 | 25 | 50;

@Component({
    selector: 'app-pagination',
    standalone: true,
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pagination {
    // Входные данные
    currentPage = input.required<number>();
    totalPages = input.required<number>();
    totalItems = input<number>(0);
    pageSize = input<PageSize | 6>(10);
    showPageSizeSelector = input<boolean>(true);

    // Выходные события
    pageChange = output<number>();
    pageSizeChange = output<PageSize>();

    // Доступные варианты размера страницы
    protected pageSizeOptions: PageSize[] = [5, 10, 25, 50];

    constructor() {
        // Автоматическая коррекция текущей страницы
        effect(() => {
            const current = this.currentPage();
            const total = this.totalPages();

            if (current > total && total > 0) {
                this.pageChange.emit(total);
            }
        });
    }

    // Вычисляемые значения для отображения диапазона
    protected rangeStart = computed(() => {
        if (this.totalItems() === 0) return 0;
        return (this.currentPage() - 1) * this.pageSize() + 1;
    });

    protected rangeEnd = computed(() => {
        const end = this.currentPage() * this.pageSize();
        return Math.min(end, this.totalItems());
    });

    protected get pages(): number[] {
        const total = this.totalPages();
        const current = this.currentPage();
        const delta = 2;

        const range: number[] = [];

        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            } else if (range[range.length - 1] !== -1 && i < current - delta) {
                range.push(-1);
            } else if (range[range.length - 1] !== -1 && i > current + delta) {
                range.push(-1);
            }
        }

        return range;
    }

    protected changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
            this.pageChange.emit(page);
        }
    }

    protected changePageSize(size: PageSize): void {
        if (size !== this.pageSize()) {
            this.pageSizeChange.emit(size);
            // Сбрасываем на первую страницу
            this.pageChange.emit(1);
        }
    }

    protected isPageSizeSelected(size: PageSize): boolean {
        return this.pageSize() === size;
    }
}