export interface Products {
    group: Group;
    skus: Product[];
}

interface Group {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}