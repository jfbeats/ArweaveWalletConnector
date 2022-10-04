const B64js = () => {
  var lookup: any[] = []
  var revLookup: any[] = []
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
  
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i]
    revLookup[code.charCodeAt(i)] = i
  }
  
  // Support decoding URL-safe base64 strings, as Node.js does.
  // See: https://en.wikipedia.org/wiki/Base64#URL_applications
  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63
  
  function getLens (b64: any) {
    var len = b64.length
    
    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }
    
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=')
    if (validLen === -1) validLen = len
    
    var placeHoldersLen = validLen === len
        ? 0
        : 4 - (validLen % 4)
    
    return [validLen, placeHoldersLen]
  }
  
  // base64 is 4/3 + up to two characters of the original data
  function byteLength (b64: any) {
    var lens = getLens(b64)
    var validLen = lens[0]
    var placeHoldersLen = lens[1]
    return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
  }
  
  function _byteLength (b64: any, validLen: any, placeHoldersLen: any) {
    return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
  }
  
  function toByteArray (b64: any) {
    var tmp
    var lens = getLens(b64)
    var validLen = lens[0]
    var placeHoldersLen = lens[1]
    
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))
    
    var curByte = 0
    
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0
        ? validLen - 4
        : validLen
    
    var i
    for (i = 0; i < len; i += 4) {
      tmp =
          (revLookup[b64.charCodeAt(i)] << 18) |
          (revLookup[b64.charCodeAt(i + 1)] << 12) |
          (revLookup[b64.charCodeAt(i + 2)] << 6) |
          revLookup[b64.charCodeAt(i + 3)]
      arr[curByte++] = (tmp >> 16) & 0xFF
      arr[curByte++] = (tmp >> 8) & 0xFF
      arr[curByte++] = tmp & 0xFF
    }
    
    if (placeHoldersLen === 2) {
      tmp =
          (revLookup[b64.charCodeAt(i)] << 2) |
          (revLookup[b64.charCodeAt(i + 1)] >> 4)
      arr[curByte++] = tmp & 0xFF
    }
    
    if (placeHoldersLen === 1) {
      tmp =
          (revLookup[b64.charCodeAt(i)] << 10) |
          (revLookup[b64.charCodeAt(i + 1)] << 4) |
          (revLookup[b64.charCodeAt(i + 2)] >> 2)
      arr[curByte++] = (tmp >> 8) & 0xFF
      arr[curByte++] = tmp & 0xFF
    }
    
    return arr
  }
  
  function tripletToBase64 (num: any) {
    return lookup[num >> 18 & 0x3F] +
        lookup[num >> 12 & 0x3F] +
        lookup[num >> 6 & 0x3F] +
        lookup[num & 0x3F]
  }
  
  function encodeChunk (uint8: any, start: any, end: any) {
    var tmp
    var output = []
    for (var i = start; i < end; i += 3) {
      tmp =
          ((uint8[i] << 16) & 0xFF0000) +
          ((uint8[i + 1] << 8) & 0xFF00) +
          (uint8[i + 2] & 0xFF)
      output.push(tripletToBase64(tmp))
    }
    return output.join('')
  }
  
  function fromByteArray (uint8: any) {
    var tmp
    var len = uint8.length
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    var parts = []
    var maxChunkLength = 16383 // must be multiple of 3
    
    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
    }
    
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1]
      parts.push(
          lookup[tmp >> 2] +
          lookup[(tmp << 4) & 0x3F] +
          '=='
      )
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1]
      parts.push(
          lookup[tmp >> 10] +
          lookup[(tmp >> 4) & 0x3F] +
          lookup[(tmp << 2) & 0x3F] +
          '='
      )
    }
    
    return parts.join('')
  }
  
  return { toByteArray, fromByteArray }
}



function b64UrlToString(b64UrlString: string): string {
  let buffer = b64UrlToBuffer(b64UrlString);
  return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
}

function bufferToString(buffer: Uint8Array | ArrayBuffer): string {
  return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
}

function stringToBuffer(string: string): Uint8Array {
  return new TextEncoder().encode(string);
}

function stringToB64Url(string: string): string {
  return bufferTob64Url(stringToBuffer(string));
}

function b64UrlToBuffer(b64UrlString: string): Uint8Array {
  return new Uint8Array(B64js().toByteArray(b64UrlDecode(b64UrlString)));
}

function bufferTob64(buffer: Uint8Array): string {
  return B64js().fromByteArray(new Uint8Array(buffer));
}

function bufferTob64Url(buffer: Uint8Array): string {
  return b64UrlEncode(bufferTob64(buffer));
}

function b64UrlEncode(b64UrlString: string): string {
  return b64UrlString
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/\=/g, "");
}

function b64UrlDecode(b64UrlString: string): string {
  b64UrlString = b64UrlString.replace(/\-/g, "+").replace(/\_/g, "/");
  let padding;
  b64UrlString.length % 4 == 0
      ? (padding = 0)
      : (padding = 4 - (b64UrlString.length % 4));
  return b64UrlString.concat("=".repeat(padding));
}

export const ArweaveUtils = {
  b64UrlToString,
  bufferToString,
  stringToBuffer,
  stringToB64Url,
  b64UrlToBuffer,
  bufferTob64,
  bufferTob64Url,
  b64UrlEncode,
  b64UrlDecode,
}



class BaseObject {
  [key: string]: any;

  public get(field: string): string;
  public get(
    field: string,
    options: { decode: true; string: false }
  ): Uint8Array;
  public get(field: string, options: { decode: true; string: true }): string;

  public get(
    field: string,
    options?: {
      string?: boolean;
      decode?: boolean;
    }
  ): string | Uint8Array | Tag[] {
    if (!Object.getOwnPropertyNames(this).includes(field)) {
      throw new Error(
        `Field "${field}" is not a property of the Arweave Transaction class.`
      );
    }

    // Handle fields that are Uint8Arrays.
    // To maintain compat we encode them to b64url
    // if decode option is not specificed.
    if (this[field] instanceof Uint8Array) {
      if (options && options.decode && options.string) {
        return ArweaveUtils.bufferToString(this[field]);
      }
      if (options && options.decode && !options.string) {
        return this[field];
      }
      return ArweaveUtils.bufferTob64Url(this[field]);
    }

    if (options && options.decode == true) {
      if (options && options.string) {
        return ArweaveUtils.b64UrlToString(this[field]);
      }

      return ArweaveUtils.b64UrlToBuffer(this[field]);
    }

    return this[field];
  }
}



export class Tag extends BaseObject {
  readonly name: string;
  readonly value: string;

  public constructor(name: string, value: string, decode = false) {
    super();
    this.name = name;
    this.value = value;
  }
}