import {replayIdSectionNode} from './replayId/sectionNode'
import {headerSectionNode} from './header/sectionNode'

replayIdSectionNode.next = headerSectionNode

export const sectionList = replayIdSectionNode