import {beforeAll, describe, expect, it} from '@jest/globals';
import fs from 'fs';
import path from 'path';
import {parseReplay} from "../src";
import {ParsedReplay} from "../src/parsers/sections/types";

const loadTestReplayFile = (fileName: string) => {
    return fs.readFileSync(path.join(__dirname, `../resources/testReplays/${fileName}`))
}

const testReplayOrigLocalGame1 = loadTestReplayFile('test-replay-orig-local-game-1.rep')
const testReplayBwLadderGame1 = loadTestReplayFile('test-replay-bw-ladder-game-1.rep')
const testReplayBwLadderGame2 = loadTestReplayFile('test-replay-bw-ladder-game-2.rep')
const testReplayBwLadderGame3 = loadTestReplayFile('test-replay-bw-ladder-game-3.rep')

describe('parseReplay', () => {
    let parsedReplayOrigLocalGame1: ParsedReplay
    let parsedReplayBwLadderGame1: ParsedReplay
    let parsedReplayBwLadderGame2: ParsedReplay
    let parsedReplayBwLadderGame3: ParsedReplay
    beforeAll(() => {
        parsedReplayOrigLocalGame1 = index(testReplayOrigLocalGame1)
        parsedReplayBwLadderGame1 = index(testReplayBwLadderGame1)
        parsedReplayBwLadderGame2 = index(testReplayBwLadderGame2)
        parsedReplayBwLadderGame3 = index(testReplayBwLadderGame3)
    })
    it('parses the replayId section', () => {
        expect(parsedReplayOrigLocalGame1.replayId).toHaveProperty('metadata.checksum')
        expect(parsedReplayBwLadderGame1.replayId).toHaveProperty('metadata.checksum')
        expect(parsedReplayBwLadderGame2.replayId).toHaveProperty('metadata.checksum')
        expect(parsedReplayOrigLocalGame1.replayId?.data).toEqual("seRS")
        expect(parsedReplayBwLadderGame1.replayId?.data).toEqual("seRS")
        expect(parsedReplayBwLadderGame2.replayId?.data).toEqual("seRS")
    })
    it('parses the header section', () => {
        expect(parsedReplayOrigLocalGame1.header).toHaveProperty('metadata.checksum')
        expect(parsedReplayOrigLocalGame1.header?.data.game).toMatchInlineSnapshot(`
{
  "engine": "starcraft",
  "frame": 13936,
  "name": "supergentle",
  "startedAtInSec": 1743740565,
}
`)
        expect(parsedReplayOrigLocalGame1.header?.data.map).toMatchInlineSnapshot(`
{
  "name": "Bottleneck",
}
`)
        expect(parsedReplayOrigLocalGame1.header?.data.hostPlayerName).toMatchInlineSnapshot(`""`)
        expect(parsedReplayOrigLocalGame1.header?.data.players).toMatchInlineSnapshot(`
{
  "Alpha Squadron": {
    "id": 255,
    "name": "Alpha Squadron",
    "race": "terran",
    "slotId": 1,
    "team": 1,
    "type": "computer",
  },
  "supergentle": {
    "id": 0,
    "name": "supergentle",
    "race": "terran",
    "slotId": 0,
    "team": 1,
    "type": "human",
  },
}
`)
        expect(parsedReplayBwLadderGame1.header).toHaveProperty('metadata.checksum')
        expect(parsedReplayBwLadderGame1.header?.data.game).toMatchInlineSnapshot(`
{
  "engine": "broodwar",
  "frame": 10754,
  "name": "AH\`gPwk]]WZC",
  "startedAtInSec": 1742809475,
}
`)
        expect(parsedReplayBwLadderGame1.header?.data.map).toMatchInlineSnapshot(`
{
  "name": "Deja Vu SE 2.0",
}
`)
        expect(parsedReplayBwLadderGame1.header?.data.hostPlayerName).toMatchInlineSnapshot(`"NAGUNBLO"`)
        expect(parsedReplayBwLadderGame1.header?.data.players).toMatchInlineSnapshot(`
{
  "NAGUNBLO": {
    "id": 0,
    "name": "NAGUNBLO",
    "race": "zerg",
    "slotId": 0,
    "team": 1,
    "type": "human",
  },
  "SKTX_Mini": {
    "id": 1,
    "name": "SKTX_Mini",
    "race": "protoss",
    "slotId": 1,
    "team": 2,
    "type": "human",
  },
}
`)

        expect(parsedReplayBwLadderGame2.header).toHaveProperty('metadata.checksum')
        expect(parsedReplayBwLadderGame2.header?.data.game).toMatchInlineSnapshot(`
{
  "engine": "broodwar",
  "frame": 6971,
  "name": "fNxbHwocBGaS",
  "startedAtInSec": 1742470968,
}
`)
        expect(parsedReplayBwLadderGame2.header?.data.map).toMatchInlineSnapshot(`
{
  "name": "Deja Vu SE 2.0",
}
`)
        expect(parsedReplayBwLadderGame2.header?.data.hostPlayerName).toMatchInlineSnapshot(`"savagemoving"`)
        expect(parsedReplayBwLadderGame2.header?.data.players).toMatchInlineSnapshot(`
{
  "SKTX_Mini": {
    "id": 1,
    "name": "SKTX_Mini",
    "race": "protoss",
    "slotId": 3,
    "team": 2,
    "type": "human",
  },
  "savagemoving": {
    "id": 0,
    "name": "savagemoving",
    "race": "protoss",
    "slotId": 0,
    "team": 1,
    "type": "human",
  },
}
`)

        expect(parsedReplayBwLadderGame3.header).toHaveProperty('metadata.checksum')
        expect(parsedReplayBwLadderGame3.header?.data.game).toMatchInlineSnapshot(`
{
  "engine": "broodwar",
  "frame": 11055,
  "name": "YrPRFmVSXUwp",
  "startedAtInSec": 1704885363,
}
`)
        expect(parsedReplayBwLadderGame3.header?.data.map).toMatchInlineSnapshot(`
{
  "name": "투혼 1.3",
}
`)
        expect(parsedReplayBwLadderGame3.header?.data.hostPlayerName).toMatchInlineSnapshot(`"SKTX_Mini"`)
        expect(parsedReplayBwLadderGame3.header?.data.players).toMatchInlineSnapshot(`
{
  "E-ny\`Ingyu": {
    "id": 1,
    "name": "E-ny\`Ingyu",
    "race": "protoss",
    "slotId": 0,
    "team": 2,
    "type": "human",
  },
  "SKTX_Mini": {
    "id": 0,
    "name": "SKTX_Mini",
    "race": "protoss",
    "slotId": 1,
    "team": 1,
    "type": "human",
  },
}
`)
    })
})