import EntryType from './Entry';
import ImageType from './Image';
import StepType from './Step';
import CookType from './Cook';

type RecipeType = EntryType & {
    entryTitle?: string;
    name?: string;
    slug?: string;
    description?: string;
    images?: ImageType[];
    cooks?: CookType[];
    estimatedTime?: string;
    servings?: string;
    ingredients?: string;
    steps?: StepType[];
    otherRecipes?: RecipeType[];
}

export default RecipeType;