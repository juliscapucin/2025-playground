import { ImageField } from "./Image";

export type Film = {
   title: string;
   slug: {
      _type: string;
      current: string;
   };
   info?: string;
   image: ImageField;
   description?: string;
   projectLink?: string;
   projectVideo?: string;
};
