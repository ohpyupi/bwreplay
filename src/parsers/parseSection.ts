import crc from "crc/crc32";
import zlib from 'zlib'

const SECTION_METADATA_SIZE = 0xc
const IN_BETWEEN_DATA_BLOCK_SIZE = 0x4

const isCompressed = (buffer: Buffer) => {
    return buffer[0] === 0x78 && buffer[1] === 0x9c
}

const validateChecksumIntegrity = (storedChecksum: Buffer, data: Buffer) => {
    if (storedChecksum.readInt32LE() !== ~crc(data)) {
        throw new Error('malformed checksum!')
    }
}

export const parseSection = (sectionBuffer: Buffer) => {
    const metadata = {
        checksum: sectionBuffer.subarray(0x0, 0x4),
        chunk: sectionBuffer.readUint32LE(0x4),
        size: sectionBuffer.readInt32LE(0x8),
    }
    const rawDataBuffer = sectionBuffer.subarray(0xc, 0xc + metadata.size)
    const decompressedDataBuffer = isCompressed(rawDataBuffer) ? zlib.inflateSync(rawDataBuffer) : rawDataBuffer

    validateChecksumIntegrity(metadata.checksum, decompressedDataBuffer)

    return {
        metadata,
        dataBuffer: decompressedDataBuffer,
        getNextSectionOffset(currentOffset: number) {
            return currentOffset + SECTION_METADATA_SIZE + metadata.size + IN_BETWEEN_DATA_BLOCK_SIZE
        },
    }
}