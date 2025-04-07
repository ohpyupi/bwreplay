export type ParsedSectionMetadata = {
    checksum: Buffer,
    size: number,
    chunk: number,
}

export type ParsedSection<T> = {
    metadata: ParsedSectionMetadata
    data: T
}

export type ParsedHeaderSectionData = {
    gameEngine: number
    gameFrame: number
    gameStartedAtInSeconds: number
    gameName: string
    mapName: string
    hostPlayerName: string
}

export type ParsedReplay = {
    replayId?: ParsedSection<string>
    header?: ParsedSection<ParsedHeaderSectionData>
}

export type SectionNodeData = {
    parser: (buffer: Buffer, offset: number, result: ParsedReplay) => number
}
