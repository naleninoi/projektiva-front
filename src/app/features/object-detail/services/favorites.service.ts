import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private readonly STORAGE_KEY = 'favorites';

    // Сигнал с ID избранных объектов
    private favoritesIds = signal<string[]>([]);

    // Вычисляемый сигнал для количества избранных
    favoritesCount = computed(() => this.favoritesIds().length);

    constructor() {
        // Загружаем из localStorage при инициализации
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            this.favoritesIds.set(JSON.parse(stored));
        }

        // Сохраняем в localStorage при изменении
        effect(() => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favoritesIds()));
        });
    }

    isFavorite(id: string): boolean {
        return this.favoritesIds().includes(id);
    }

    addFavorite(id: string): void {
        if (!this.isFavorite(id)) {
            this.favoritesIds.update(ids => [...ids, id]);
        }
    }

    removeFavorite(id: string): void {
        this.favoritesIds.update(ids => ids.filter(favId => favId !== id));
    }

    toggleFavorite(id: string): void {
        if (this.isFavorite(id)) {
            this.removeFavorite(id);
        } else {
            this.addFavorite(id);
        }
    }

    getFavoritesIds(): string[] {
        return this.favoritesIds();
    }
}