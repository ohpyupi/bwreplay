import {createLinkedListNode} from "../../dataTypes/LinkedList";
import {parseSection} from "../parseSection";
import {SectionNodeData} from "./types";

export const headerSection = createLinkedListNode<SectionNodeData>('header', {
    parser: (buffer, offset, result) => {
        const sectionBuffer = buffer.subarray(offset)
        const {metadata, dataBuffer, getNextSectionOffset} = parseSection(sectionBuffer)

        const gameEngine = dataBuffer.readUInt8(0x0)
        const gameFrame = dataBuffer.readUint32LE(0x1)
        const gameStartedAtInSeconds = dataBuffer.readUint32LE(0x8)
        const gameName = dataBuffer.subarray(0x18, 0x18 + 28).toString()
        const mapName = dataBuffer.subarray(0x61, 0x61 + 26).toString()
        const hostPlayerName = dataBuffer.subarray(0x48, 0x48 + 24).filter(byte => byte !== 0x00).toString()

        result.header = {
            metadata,
            data: {
                gameEngine,
                gameFrame,
                gameName,
                gameStartedAtInSeconds,
                mapName,
                hostPlayerName,
            }
        }

        return getNextSectionOffset(offset)
    },
})
