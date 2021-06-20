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
    id: {
        list: number
        task: number
    }
    name: string
    priority: "low" | "medium" | "high"
    subtasks: SubtaskType[]
}
export type SubtaskType = {
    description: string
    done: boolean
    id: {
        list: number
        task: number
        subtask: number
    }
    name: string
    priority: "low" | "medium" | "high"
    subtasks: SubtaskType[]
}