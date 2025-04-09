import {createLinkedListNode} from "../../../dataTypes/LinkedList";
import {parseSection} from "../../parseSection";
import {SectionNodeData} from "../types";
import {isPrintableByte} from "../../../utils";
import {parseHeaderPlayers, HEADER_PLAYERS_BUFFER_SIZE} from "./parseHeaderPlayers";

export const headerSectionNode = createLinkedListNode<SectionNodeData>('header', {
    parser: (buffer, offset, result) => {
        const sectionBuffer = buffer.subarray(offset)
        const {metadata, dataBuffer, getNextSectionOffset} = parseSection(sectionBuffer)

        const game = {
            engine: dataBuffer.readUint8(0x0),
            frame: dataBuffer.readUint32LE(0x1),
            startedAtInSec: dataBuffer.readUint32LE(0x8),
            name: dataBuffer.subarray(0x18, 0x18 + 28).filter(isPrintableByte).toString()
        }

        const map = {
            name: dataBuffer.subarray(0x61, 0x61 + 26).filter(isPrintableByte).toString(),
        }

        const hostPlayerName = dataBuffer.subarray(0x48, 0x48 + 24).filter(isPrintableByte).toString()

        const players = parseHeaderPlayers(dataBuffer.subarray(0xa1, 0xa1 + 432))

        result.header = {
            metadata,
            data: {
                game,
                map,
                hostPlayerName,
                players,
            }
        }

        return getNextSectionOffset(offset)
    },
})
