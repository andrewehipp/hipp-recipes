import EntryType from './Entry';

type VideoType = EntryType & {
    url: string;
    size: number;
    width: number;
    height: number;
    fileName: string;
    title: string;
}

export function instanceOfVideo(object: any): object is VideoType {
    switch (object?.contentType) {
        case 'video/mp4':
        case 'video/webm':
            return true;
        default:
            return false;
    }
}

export default VideoType;
