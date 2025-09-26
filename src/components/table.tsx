import { Heading } from '@/components/ui';

const amenities = [
    'Hike along forest and lake trails',
    'Swim in the lake or nearby beaches',
    'Kayak, canoe, or paddleboard',
    'Picnic or barbecue in designated areas',
    'Attend outdoor concerts and events',
];

export default function Table() {
    return (
        <div className='mx-auto my-32 w-fit max-w-5xl rounded-3xl border border-accent p-8'>
            <Heading tag='h2' variant='headline'>
                What you can do at Obsidian Park
            </Heading>

            <ul className='mt-8 justify-center *:flex-1 *:border-accent *:not-first:pt-4 *:not-last:border-b *:not-last:pb-4 lg:flex lg:*:not-first:pt-0 lg:*:not-first:pl-4 lg:*:not-last:border-0 lg:*:not-last:border-r lg:*:not-last:pr-4'>
                {amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
            </ul>
        </div>
    );
}
