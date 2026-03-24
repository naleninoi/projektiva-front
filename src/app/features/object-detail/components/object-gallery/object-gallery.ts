import { ChangeDetectionStrategy, Component, input, signal, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-object-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './object-gallery.html',
  styleUrls: ['./object-gallery.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectGallery {
  images = input<string[]>([]);
  name = input<string>('');

  protected currentIndex = signal<number>(0);
  protected currentImage = computed(() => {
    const imgs = this.images();
    const idx = this.currentIndex();
    return imgs.length > 0 ? imgs[idx] : null;
  });

  protected hasImages = computed(() => this.images().length > 0);

  // Заглушки для изображений (пока нет реальных фото)
  protected getPlaceholderImage(index: number): string {
    const placeholders = [
      'https://placehold.co/800x500/e0f2e9/047857?text=Фото+1',
      'https://placehold.co/800x500/fef3c7/92400e?text=Фото+2',
      'https://placehold.co/800x500/dbeafe/1e40af?text=Фото+3',
      'https://placehold.co/800x500/f3e8ff/6b21a5?text=Фото+4',
    ];
    return placeholders[index % placeholders.length];
  }

  protected nextImage(): void {
    if (this.images().length > 0) {
      this.currentIndex.update(idx => (idx + 1) % this.images().length);
    }
  }

  protected prevImage(): void {
    if (this.images().length > 0) {
      this.currentIndex.update(idx => (idx - 1 + this.images().length) % this.images().length);
    }
  }

  protected setImage(index: number): void {
    this.currentIndex.set(index);
  }

  // Обработчик ошибки загрузки изображения
  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Заменяем на заглушку
    img.src = this.getPlaceholderImage(this.currentIndex());
  }
}