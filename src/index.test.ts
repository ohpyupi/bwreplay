import {beforeAll, describe, expect, it} from '@jest/globals';
import fs from 'fs';
import path from 'path';
import {parseReplay} from "./index";
import {ParsedReplay} from "./parsers/sections/types";

const loadTestReplayFile = (fileName: string) => {
    return fs.readFileSync(path.join(__dirname, `../resources/${fileName}`))
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
        parsedReplayOrigLocalGame1 = parseReplay(testReplayOrigLocalGame1)
        parsedReplayBwLadderGame1 = parseReplay(testReplayBwLadderGame1)
        parsedReplayBwLadderGame2 = parseReplay(testReplayBwLadderGame2)
        parsedReplayBwLadderGame3 = parseReplay(testReplayBwLadderGame3)
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
        expect(parsedReplayBwLadderGame1.header).toHaveProperty('metadata.checksum')
        expect(parsedReplayBwLadderGame2.header).toHaveProperty('metadata.checksum')
        expect(parsedReplayOrigLocalGame1.header?.data).toMatchInlineSnapshot(`
{
  "gameEngine": 0,
  "gameFrame": 13936,
  "gameName": "supergentle",
  "gameStartedAtInSeconds": 1743740565,
  "hostPlayerName": "",
  "mapName": "Bottleneck",
}
`)
        expect(parsedReplayBwLadderGame1.header?.data).toMatchInlineSnapshot(`
{
  "gameEngine": 1,
  "gameFrame": 10754,
  "gameName": "AH\`gPwk]]WZC",
  "gameStartedAtInSeconds": 1742809475,
  "hostPlayerName": "NAGUNBLO",
  "mapName": "Deja Vu SE 2.0",
}
`)
        expect(parsedReplayBwLadderGame2.header?.data).toMatchInlineSnapshot(`
{
  "gameEngine": 1,
  "gameFrame": 6971,
  "gameName": "fNxbHwocBGaS",
  "gameStartedAtInSeconds": 1742470968,
  "hostPlayerName": "savagemoving",
  "mapName": "Deja Vu SE 2.0",
}
`)
        expect(parsedReplayBwLadderGame3.header?.data).toMatchInlineSnapshot(`
{
  "gameEngine": 1,
  "gameFrame": 11055,
  "gameName": "YrPRFmVSXUwp",
  "gameStartedAtInSeconds": 1704885363,
  "hostPlayerName": "SKTX_Mini",
  "mapName": "투혼 1.3",
}
`)
    })
})