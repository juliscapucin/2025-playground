import { Accordion } from '@/components';
import { DefaultPage } from '@/components/pages';

import { faqItems } from '@/data';

export default function AboutPage() {
    return (
        <DefaultPage title='About Us'>
            <Accordion items={faqItems} />
        </DefaultPage>
    );
}
