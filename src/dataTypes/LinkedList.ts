export type LinkedListNode<T> = {
    name: string
    data: T
    next?: LinkedListNode<T>
}

export const createLinkedListNode = <Data>(name: string, data: Data): LinkedListNode<Data> => ({
    name,
    data,
    })