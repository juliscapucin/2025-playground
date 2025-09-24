import {
    ExpandableCards,
    Accordion,
    CardsShuffle,
    Table,
    Hero,
    DragAndDropGrid,
    GalleryWithMinimap,
} from '@/components';
import { HeadingWithParagraph } from '@/components/ui';

import { cards, faqItems, images } from '@/data';

export default function Home() {
    return (
        <main className='w-full bg-primary pb-16'>
            <Hero />
            <Table />
            <ExpandableCards />
            <CardsShuffle />
            <Accordion items={faqItems} />
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={4} />
            <GalleryWithMinimap images={images} />
            <Table />
            <HeadingWithParagraph
                title='Section Title'
                paragraphs={[
                    'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.',
                    'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas. Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.',
                ]}
            />
        </main>
    );
}
