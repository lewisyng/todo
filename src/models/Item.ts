export interface Item {
    id?: number;
    title: string;
    description?: string;
    columnId: number;
    tags: number[];
    // startDate: Date | null;
    startDate: any;
    // endDate: Date | null;
    endDate: any;
}