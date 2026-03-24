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
