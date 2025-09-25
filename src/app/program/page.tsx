import {
    CardsShuffle,
    DragAndDropGrid,
    GalleryWithMinimap,
} from '@/components';
import { DefaultPage } from '@/components/pages';

import { cards, images } from '@/data';

export default function ProgramPage() {
    return (
        <DefaultPage title='Program'>
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={3} />
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={3} />
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={3} />
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={3} />
            <CardsShuffle />
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={3} />
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={3} />
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={3} />
        </DefaultPage>
    );
}
