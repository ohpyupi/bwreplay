import {LinkedListNode} from './dataTypes/LinkedList'
import {ParsedReplay, SectionNodeData} from "./parsers/sections/types";
import {sectionList} from './parsers/sections/sectionList'

export const parseReplay = (replayFileBuffer: Buffer): ParsedReplay => {
    const parsedReplay: ParsedReplay = {}
    let current: LinkedListNode<SectionNodeData> | undefined  = sectionList
    let offset = 0

    while (current) {
        offset = current.data.parser(replayFileBuffer, offset, parsedReplay)
        current = current.next
    }

    return parsedReplay
}