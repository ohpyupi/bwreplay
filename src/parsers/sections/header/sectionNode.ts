import {createLinkedListNode} from "../../../dataTypes/LinkedList";
import {parseSection} from "../../parseSection";
import {GameEngine, GameType, SectionNodeData} from "../types";
import {isPrintableByte} from "../../../utils";
import {parseHeaderPlayers} from "./parseHeaderPlayers";

const mapByteToGameEngineEnum = (byte: number) => {
    switch (byte) {
        case 0x0:
            return GameEngine.Starcraft
        case 0x1:
            return GameEngine.Broodwar
        default:
            return GameEngine.Unknown
    }
}

const mapByteToGameTypeEnum = (byte: number) => {
    switch (byte) {
        case (0x2):
            return GameType.Melee
        case (0x3):
            return GameType.FreeForAll
        case (0x4):
            return GameType.OneOnOne
        case (0x5):
            return GameType.CaptureTheFlag
        case (0x6):
            return GameType.Greed
        case (0x7):
            return GameType.Slaughter
        case (0x8):
            return GameType.SuddenDeath
        case (0x0a):
            return GameType.UseMapSettings
        case (0x0b):
            return GameType.TeamMelee
        case (0x0c):
            return GameType.TeamFreeForAll
        case (0x0d):
            return GameType.TeamCaptureTheFlag
        case (0x0f):
            return GameType.TopVsBottom
        default:
            return GameType.Unknown
    }
}

export const headerSectionNode = createLinkedListNode<SectionNodeData>('header', {
    parser: (buffer, offset, result) => {
        const sectionBuffer = buffer.subarray(offset)
        const {metadata, dataBuffer, getNextSectionOffset} = parseSection(sectionBuffer)

        const game = {
            engine: mapByteToGameEngineEnum(dataBuffer.readUint8(0x0)),
            frame: dataBuffer.readUint32LE(0x1),
            startedAtInSec: dataBuffer.readUint32LE(0x8),
            name: dataBuffer.subarray(0x18, 0x18 + 28).filter(isPrintableByte).toString(),
            type: mapByteToGameTypeEnum(dataBuffer.readUInt8(0x3c))
        }

        const hostPlayerName = dataBuffer.subarray(0x48, 0x48 + 24).filter(isPrintableByte).toString()

        const map = {
            name: dataBuffer.subarray(0x61, 0x61 + 26).filter(isPrintableByte).toString(),
        }

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
