export type ParsedSectionMetadata = {
    checksum: Buffer,
    size: number,
    chunk: number,
}

export type ParsedSection<T> = {
    metadata: ParsedSectionMetadata
    data: T
}

export enum PlayerType {
    Human = 'human',
    Computer = 'computer',
    Unknown = 'unknown'
}

export enum PlayerRace {
    Zerg = 'zerg',
    Protoss = 'protoss',
    Terran = 'terran',
    Unknown = 'unknown',
}

export type ParseHeaderPlayerData = {
    slotId: number
    id: number
    type: PlayerType
    race: PlayerRace
    team: number
    name: string
}

export type ParsedHeaderPlayers = {
    [playerName in string]: ParseHeaderPlayerData
}

export type ParsedHeaderSectionData = {
    game: {
        engine: number
        frame: number
        startedAtInSec: number
        name: string
    }
    map: {
        name: string
    }
    hostPlayerName: string
    players: ParsedHeaderPlayers
}

export type ParsedReplay = {
    replayId?: ParsedSection<string>
    header?: ParsedSection<ParsedHeaderSectionData>
}

export type SectionNodeData = {
    parser: (buffer: Buffer, offset: number, result: ParsedReplay) => number
}