import EntryType from './Entry';
import ImageType from './Image';

type RecipeType = EntryType & {
    fullName?: string;
    displayName?: string;
    image?: ImageType[];
}

export default RecipeType;