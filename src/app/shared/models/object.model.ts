export interface TouristObject {
    id: string;
    name: string;
    type: 'nature' | 'culture' | 'history' | 'gastronomy' | 'museum' | 'other';
    typeLabel: string;
    location: {
        region: string;
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    description: string;
    shortDescription: string;
    workingHours?: string;
    price: {
        min?: number;
        max?: number;
        isFree: boolean;
        description?: string;
    };
    rating: number;
    reviewsCount: number;
    accessibility: {
        wheelchair: boolean;
        visual: boolean;
        hearing: boolean;
        guideDog: boolean;
        limitedAccess?: boolean;
    };
    infrastructure: {
        toilets: boolean;
        cafe: boolean;
        souvenirs: boolean;
        rental: boolean;
        parking: boolean;
        wifi: boolean;
    };
    images: string[];
    mainImage?: string;
}