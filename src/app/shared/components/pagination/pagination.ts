import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

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

    // Выходные события
    pageChange = output<number>();

    protected get pages(): number[] {
        const total = this.totalPages();
        const current = this.currentPage();
        const delta = 2; // Сколько страниц показывать по бокам от текущей

        const range: number[] = [];
        const rangeWithDots: number[] = [];

        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            }
        }

        return range;
    }

    protected changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
            this.pageChange.emit(page);
        }
    }
}
