import EntryType from './Entry';

type ImageType = EntryType & {
    url?: string;
    size?: number;
    width?: number;
    height?: number;
    fileName?: string;
    title?: string;
}

export function instanceOfImage(object: any): object is ImageType {
    switch (object?.contentType) {
        case 'image/gif':
        case 'image/webp':
        case 'image/jpeg':
        case 'image/png':
        case 'image/svg+xml':
            return true;
        default:
            return false;
    }
}

export default ImageType