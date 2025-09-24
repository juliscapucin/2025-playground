import {
    ExpandableCards,
    Accordion,
    CardsShuffle,
    Table,
    Hero,
    DragAndDropGrid,
    GalleryWithMinimap,
} from '@/components';
import { HeadingWithParagraph, ParagraphFeature } from '@/components/ui';

const cards = [
    {
        id: '1',
        title: 'Card 1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: '2',
        title: 'Card 2',
        content:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
        id: '3',
        title: 'Card 3',
        content:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        id: '4',
        title: 'Card 4',
        content:
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    { id: '5', title: 'Card 5', content: 'Short content.' },
    {
        id: '6',
        title: 'Card 6',
        content:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    },
    { id: '7', title: 'Card 7', content: 'Another short content.' },
    {
        id: '8',
        title: 'Card 8',
        content:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    },
];

const images = [
    {
        id: '1',
        src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg',
        width: 300,
        height: 200,
        alt: 'Image 1',
    },
    {
        id: '2',
        src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg',
        width: 300,
        height: 200,
        alt: 'Image 2',
    },
    {
        id: '3',
        src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg',
        width: 300,
        height: 200,
        alt: 'Image 3',
    },
    {
        id: '4',
        src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg',
        width: 300,
        height: 200,
        alt: 'Image 4',
    },
    {
        id: '5',
        src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg',
        width: 300,
        height: 200,
        alt: 'Image 5',
    },
];

export default function Home() {
    return (
        <>
            <Hero />
            <Table />
            <ExpandableCards />
            <CardsShuffle />
            <Accordion />
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={4} />
            <GalleryWithMinimap images={images} artistName='Artist Name' />
            <Table />
            <HeadingWithParagraph
                title='Section Title'
                paragraphs={[
                    'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.',
                    'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas. Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.',
                ]}
            />
        </>
    );
}
