import { Accordion, CardsShuffle } from '@/components';
import { DefaultPage } from '@/components/pages';
import { PageWrapper } from '@/components/ui';

import { faqItems } from '@/data';

export default function AboutPage() {
    return (
        <PageWrapper>
            <CardsShuffle />
            <Accordion items={faqItems} />
        </PageWrapper>
    );
}
