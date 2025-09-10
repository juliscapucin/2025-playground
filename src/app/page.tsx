import {
    ExpandableCards,
    Accordion,
    CardsShuffle,
    Table,
    Hero,
} from '@/components';

export default function Home() {
    return (
        <>
            <Hero />
            <Table />
            <ExpandableCards />
            <CardsShuffle />
            <Accordion />
        </>
    );
}
