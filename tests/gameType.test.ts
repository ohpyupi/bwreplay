import {describe, expect, it} from '@jest/globals';
import {loadTestReplayFile} from './utils';
import {parseReplay} from "../src";
import {GameType} from "../src/parsers/sections/types";


describe('gameType', () => {
    it('asserts the melee game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-melee.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.Melee)
    })
    it('asserts the ffa game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-ffa.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.FreeForAll)
    })
    it('asserts the 1-on-1 game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-1-on-1.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.OneOnOne)
    })
    it('asserts the ctf game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-ctf.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.CaptureTheFlag)
    })
    it('asserts the greed game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-greed.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.Greed)
    })
    it('asserts the slaughter game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-slaughter.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.Slaughter)
    })
    it('asserts the sudden death game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-sudden-death.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.SuddenDeath)
    })
    it('asserts the ums game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-ums.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.UseMapSettings)
    })
    it('asserts the team melee game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-team-melee.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.TeamMelee)
    })
    it('asserts the team ffa game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-team-ffa.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.TeamFreeForAll)
    })
    it('asserts the team ctf game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-team-ctf.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.TeamCaptureTheFlag)
    })
    it('asserts the tvb game type', async () => {
        const replayFile = loadTestReplayFile('gameTypes/game-type-tvb.rep')
        const result = await parseReplay(replayFile)
        expect(result.header.data.game.type).toBe(GameType.TopVsBottom)
    })
})
