import { ImageField } from "./Image";

import { Track } from "./Track";

export type Release = {
   title: string;
   slug: {
      _type: string;
      current: string;
   };
   image: ImageField;
   releaseDate: string;
   info?: string;
   tracklist: Track[];
   releaseLink?: string;
};
