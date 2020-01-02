const m = require('./md5.js')

const mallocByteBuffer = len => {
    const ptr = m._malloc(len)
    const heapBytes = new Uint8Array(m.HEAPU8.buffer, ptr, len)
    return heapBytes
}

// md5.wasm加载完毕后会执行该回调
m.onRuntimeInitialized = () => {
    const md5 = m.cwrap('md5', null, ['number', 'number'])
    // 需要进行md5加密的字符串
    const str = 'admin'
    const array = str.split('').map(v => v.charCodeAt(0))
    const inBuffer = mallocByteBuffer(array.length)
    inBuffer.set(array)
    const outBuffer = mallocByteBuffer(32)
    // 调用wasm接口
    md5(inBuffer.byteOffset, outBuffer.byteOffset)
    console.log(Array.from(outBuffer).map(v => String.fromCharCode(v)).join('')) 
    // 输出结果为：21232f297a57a5a743894a0e4a801fc3
}