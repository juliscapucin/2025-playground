import Link from 'next/link';

type CustomLinkProps = {
    href: string;
    children?: React.ReactNode;
};

export default function CustomLink({ href, children }: CustomLinkProps) {
    return (
        <Link className='custom-button-rounded' href={href} target='_blank'>
            {children}
        </Link>
    );
}
