import { BlockContent } from "./BlockContent";
import { ImageField } from "./Image";

export type AboutPage = {
   title: string;
   subtitle?: string;
   image: ImageField;
   content1: BlockContent[];
   content2: BlockContent[];
   metadataTitle?: string;
   metadataDescription?: string;
   metadataKeywords?: string[];
};
