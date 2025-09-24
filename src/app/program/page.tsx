import { Accordion, DragAndDropGrid } from '@/components';
import { DefaultPage } from '@/components/pages';

import { cards } from '@/data';

export default function ProgramPage() {
    return (
        <DefaultPage title='Program'>
            <DragAndDropGrid cardsData={cards} rowHeight={300} columns={3} />
        </DefaultPage>
    );
}
