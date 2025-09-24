type FooterProps = {
    navlinks?: { label: string; slug: string }[];
};

export default function Footer({ navlinks }: FooterProps) {
    return (
        <footer className='h-96'>
            <div className='fixed right-auto bottom-0 left-auto -z-50 max-w-[var(--max-width)]'>
                {navlinks && navlinks.length > 0 && (
                    <ul>
                        {navlinks.map((link) => (
                            <li key={link.slug}>
                                <a href={link.slug}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                )}
                <p>© 2023 My Website. All rights reserved.</p>
            </div>
        </footer>
    );
}
