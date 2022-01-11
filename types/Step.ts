import EntryType from './Entry';
import ImageType from './Image';

type StepType = EntryType & {
    entryTitle?: string;
    title?: string;
    description?: string;
    images?: ImageType[];
}

export default StepType;