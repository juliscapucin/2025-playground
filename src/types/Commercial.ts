import { ImageField } from "./Image";

export type Commercial = {
   title: string;
   slug: {
      _type: string;
      current: string;
   };
   image: ImageField;
   info?: string;
   description?: string;
   projectLink?: string;
   projectVideo?: string;
};
