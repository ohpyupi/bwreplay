import {ParsedHeaderPlayers, PlayerRace, PlayerType} from "../types";
import {chunkBufferGenerator, isPrintableByte} from "../../../utils";

const MAX_NUMBER_OF_PLAYERS_IN_GAME = 12
const EACH_PLAYER_BUFFER_SIZE = 36

const mapByteToPlayerRace = (byte: number) => {
    switch (byte) {
        case 0x0:
            return PlayerRace.Zerg
        case 0x1:
            return PlayerRace.Terran
        case 0x2:
            return PlayerRace.Protoss
        default:
            return PlayerRace.Unknown
    }
}

const mapByteToPlayerType = (byte: number) => {
    switch (byte) {
        case 0x1:
            return PlayerType.Computer
        case 0x2:
            return PlayerType.Human
        default:
            return PlayerType.Unknown
    }
}

export const parseHeaderPlayers = (playersBuffer: Buffer) => {
    if (playersBuffer.length !== MAX_NUMBER_OF_PLAYERS_IN_GAME * EACH_PLAYER_BUFFER_SIZE) {
        throw new Error('failed to parse players field in header: wrong buffer size')
    }

    const players: ParsedHeaderPlayers = {}

    for (const buffer of chunkBufferGenerator(playersBuffer, EACH_PLAYER_BUFFER_SIZE)) {
        const name = buffer.subarray(11, 11 + 25).filter(isPrintableByte).toString()

        if (!name) continue

        players[name] = {
            slotId: buffer.readUInt16LE(),
            id: buffer.readUint8(4),
            type: mapByteToPlayerType(buffer.readUint8(8)),
            team: buffer.readUint8(10),
            name,
            race: mapByteToPlayerRace(buffer[9])
        }
    }

    return players
}