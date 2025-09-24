import { HeadingWithParagraph } from '@/components/ui';
import { DefaultPage } from '@/components/pages';

import { faqItems } from '@/data';

type ContactPageProps = {
    ctaTitle: string;
    ctaDescription: string;
};

export default function ContactPage() {
    return (
        <DefaultPage title='Contact'>
            <HeadingWithParagraph
                title='Section Title'
                paragraphs={[
                    'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.',
                    'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas. Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.',
                ]}
            />
        </DefaultPage>
    );
}
