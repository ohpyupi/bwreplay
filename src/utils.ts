export const isPrintableByte = (byte: number) => byte > 0x1f && byte !== 0x7f

export function* chunkBufferGenerator<T>(buffer: Buffer, chunkSize: number): Generator<Buffer> {
    for (let i = 0; i < buffer.length; i += chunkSize) {
        yield buffer.subarray(i, i + chunkSize);
    }
}