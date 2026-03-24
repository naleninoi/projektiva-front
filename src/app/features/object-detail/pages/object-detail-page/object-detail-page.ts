import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectService } from '../../../../core/services/object.service';
import { ObjectGallery } from '../../components/object-gallery/object-gallery';
import { ObjectSidebar } from '../../components/object-sidebar/object-sidebar';
import { ObjectInfo } from '../../components/object-info/object-info';
import { ObjectMap } from '../../components/object-map/object-map';
import { ObjectReviews } from '../../components/object-reviews/object-reviews';
import { Header } from '../../../../layout/header/header';
import { Footer } from '../../../../layout/footer/footer';
import { TouristObject } from '../../../../shared/models/object.model';

@Component({
  selector: 'app-object-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer,
    ObjectGallery,
    ObjectSidebar,
    ObjectInfo,
    ObjectMap,
    ObjectReviews
  ],
  templateUrl: './object-detail-page.html',
  styleUrls: ['./object-detail-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private objectService = inject(ObjectService);

  protected object = signal<TouristObject | null>(null);
  protected loading = signal<boolean>(true);
  protected error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadObject(id);
    } else {
      this.router.navigate(['/']);
    }
  }

  private loadObject(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.objectService.getObjectById(id).subscribe({
      next: (obj) => {
        if (obj) {
          this.object.set(obj);
        } else {
          this.error.set('Объект не найден');
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Ошибка загрузки объекта:', err);
        this.error.set('Не удалось загрузить информацию об объекте');
        this.loading.set(false);
      }
    });
  }

  protected goBack(): void {
    this.router.navigate(['/']);
  }

  protected onBook(): void {
    // TODO: реализовать бронирование
    alert('Функция бронирования будет доступна позже');
  }
}