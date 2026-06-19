export function ArrowIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
}

export function CxHeadline({
    lines,
    emphasis,
    className = 'cx-headline',
    centered = false,
}: {
    lines: string[];
    emphasis?: string;
    className?: string;
    centered?: boolean;
}) {
    return (
        <h2 className={className} style={centered ? { textAlign: 'center' } : undefined}>
            {lines.map((line) => (
                <span key={line}>
                    {line}
                    <br />
                </span>
            ))}
            {emphasis && <em>{emphasis}</em>}
        </h2>
    );
}
