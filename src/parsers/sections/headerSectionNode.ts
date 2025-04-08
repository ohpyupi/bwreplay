import {createLinkedListNode} from "../../dataTypes/LinkedList";
import {parseSection} from "../parseSection";
import {SectionNodeData} from "./types";
import {isPrintableByte} from "../../utils";

export const headerSection = createLinkedListNode<SectionNodeData>('header', {
    parser: (buffer, offset, result) => {
        const sectionBuffer = buffer.subarray(offset)
        const {metadata, dataBuffer, getNextSectionOffset} = parseSection(sectionBuffer)

        const gameEngine = dataBuffer.readUInt8(0x0)
        const gameFrame = dataBuffer.readUint32LE(0x1)
        const gameStartedAtInSeconds = dataBuffer.readUint32LE(0x8)
        const gameName = dataBuffer.subarray(0x18, 0x18 + 28).filter(isPrintableByte).toString()
        const mapName = dataBuffer.subarray(0x61, 0x61 + 26).filter(isPrintableByte).toString()
        const hostPlayerName = dataBuffer.subarray(0x48, 0x48 + 24).filter(isPrintableByte).toString()

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
