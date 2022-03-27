// Title has to be unique
// When a tag gets deleted, all columnItems that have this tag must be updated

export interface TagType {
    id?: number;
    title: string;
    color: string;
}