export interface Products {
    group: Group;
    skus: Product[];
}

export interface Group {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}