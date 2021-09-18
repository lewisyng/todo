export type CollectionType = {
    id: number
}
export type ListType = {
    id: number
    name: string
    todos: TodoType[]
}
export type TodoType = {
    description: string
    done: boolean
    id: TaskIdType
    name: string
    priority: "low" | "medium" | "high"
    subtasks: SubtaskType[]
}
export type SubtaskType = {
    description: string
    done: boolean
    id: SubtaskIdType
    name: string
    priority: "low" | "medium" | "high"
}

export interface TaskIdType {
    list: number,
    task: number,
}
export interface SubtaskIdType {
    list: number,
    task: number,
    subtask: number
}