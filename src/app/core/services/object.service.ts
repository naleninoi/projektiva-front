import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { TouristObject } from '../../shared/models/object.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ObjectService {

    constructor(private http: HttpClient) {}

    getObjects(): Observable<TouristObject[]> {
        return this.http.get<TouristObject[]>('assets/mocks/objects.json')
            .pipe(delay(500)); // Имитация задержки сети
    }

    getObjectById(id: string): Observable<TouristObject | undefined> {
        return this.http.get<TouristObject[]>('/assets/mocks/objects.json')
            .pipe(
                delay(300),
                map(objects => objects.find(obj => obj.id === id))
            );
    }
}

const MOCK_OBJECTS: TouristObject[] = [
    {
        id: '1',
        name: 'Озеро Байкал',
        type: 'nature',
        typeLabel: '🌿 Природный',
        location: {
            region: 'Иркутская область',
            address: 'озеро Байкал',
            coordinates: { lat: 53.5, lng: 108.0 }
        },
        description: 'Самое глубокое озеро в мире, объект Всемирного наследия ЮНЕСКО. Уникальная экосистема и эндемичные виды.',
        shortDescription: 'Самое глубокое озеро в мире',
        workingHours: 'Круглосуточно',
        price: { min: 2500, isFree: false },
        rating: 4.8,
        reviewsCount: 124,
        accessibility: {
            wheelchair: true,
            visual: true,
            hearing: true,
            guideDog: true
        },
        infrastructure: {
            toilets: true,
            cafe: true,
            souvenirs: true,
            rental: true,
            parking: true,
            wifi: true
        },
        images: []
    },
    {
        id: '2',
        name: 'Московский Кремль',
        type: 'culture',
        typeLabel: '🏛️ Культурный',
        location: {
            region: 'Москва',
            address: 'Московский Кремль',
            coordinates: { lat: 55.752, lng: 37.618 }
        },
        description: 'Древнейшая часть Москвы, главный общественно-политический и историко-художественный комплекс города.',
        shortDescription: 'Главный исторический комплекс Москвы',
        workingHours: '10:00–18:00',
        price: { min: 1500, isFree: false },
        rating: 4.9,
        reviewsCount: 356,
        accessibility: {
            wheelchair: true,
            visual: true,
            hearing: false,
            guideDog: true
        },
        infrastructure: {
            toilets: true,
            cafe: true,
            souvenirs: true,
            rental: false,
            parking: true,
            wifi: false
        },
        images: []
    },
    {
        id: '3',
        name: 'Эльбрус',
        type: 'nature',
        typeLabel: '🏔️ Природный',
        location: {
            region: 'Кабардино-Балкария',
            address: 'гора Эльбрус',
            coordinates: { lat: 43.35, lng: 42.45 }
        },
        description: 'Высочайшая вершина России и Европы. Популярный центр горнолыжного спорта и альпинизма.',
        shortDescription: 'Высочайшая вершина России',
        workingHours: 'Круглосуточно',
        price: { min: 4000, isFree: false },
        rating: 4.7,
        reviewsCount: 89,
        accessibility: {
            wheelchair: false,
            visual: false,
            hearing: false,
            guideDog: false,
            limitedAccess: true
        },
        infrastructure: {
            toilets: false,
            cafe: true,
            souvenirs: true,
            rental: true,
            parking: true,
            wifi: false
        },
        images: []
    }
];