import {createLinkedListNode} from "../../dataTypes/LinkedList";
import {parseSection} from "../parseSection";
import {SectionNodeData} from "./types";

export const replayIdSectionNode = createLinkedListNode<SectionNodeData>('replayId', {
    parser: (buffer, offset, result) => {
        const sectionBuffer = buffer.subarray(offset)
        const {metadata, dataBuffer, getNextSectionOffset} = parseSection(sectionBuffer)

        result.replayId = {
            metadata,
            data: dataBuffer.toString()
        }

        return getNextSectionOffset(offset)
    },
})
