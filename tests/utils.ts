import fs from "fs";
import path from "path";

export const loadTestReplayFile = (fileName: string) => {
    return fs.readFileSync(path.join(__dirname, `../resources/testReplays/${fileName}`))
}

