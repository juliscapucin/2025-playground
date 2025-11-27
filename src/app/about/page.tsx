import { Accordion, CardsShuffle } from '@/components';
import { DefaultPage } from '@/components/pages';
import { Heading, PageWrapper, ParagraphFeature } from '@/components/ui';

import { faqItems } from '@/data';

export default function AboutPage() {
    return (
        <DefaultPage title='About Us'>
            <ParagraphFeature variant='body'>
                Our team is dedicated to providing the best service possible.
                With years of experience in the industry, we strive to exceed
                our clients' expectations and deliver exceptional results. Learn
                more about our journey, values, and the people who make it all
                happen.
            </ParagraphFeature>
            <CardsShuffle />
            <Accordion items={faqItems} />
        </DefaultPage>
    );
}
