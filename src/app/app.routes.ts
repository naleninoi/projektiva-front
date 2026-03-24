import { Routes } from '@angular/router';
import { HomePage } from './features/home/components/home-page/home-page';

export const routes: Routes = [
    {
        path: '',
        component: HomePage,
        title: 'Окно в Россию | Туристические объекты'
    },
    {
        path: 'objects/:id',
        loadComponent: () => import('./features/object-detail/pages/object-detail-page/object-detail-page')
            .then(m => m.ObjectDetailPage),
        title: 'Окно в Россию | Детальная информация'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
