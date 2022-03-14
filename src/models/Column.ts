export interface Item {
    id?: number;
    title: string;
    description?: string;
}

export interface Column {
    id?: number;
    title: string;
    items: Item[];
}