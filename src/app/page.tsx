import {
    ExpandableCards,
    Accordion,
    CardsShuffle,
    Table,
    Hero,
    DragAndDropGrid,
} from '@/components';

const cards = [
    {
        title: 'Card 1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        title: 'Card 2',
        content:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
        title: 'Card 3',
        content:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        title: 'Card 4',
        content:
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    { title: 'Card 5', content: 'Short content.' },
    {
        title: 'Card 6',
        content:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    },
    { title: 'Card 7', content: 'Another short content.' },
    {
        title: 'Card 8',
        content:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
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
        </>
    );
}
