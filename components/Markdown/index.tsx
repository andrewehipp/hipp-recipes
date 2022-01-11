import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Link from 'next/link';
import { useRouter } from 'next/router'

export interface MarkdownProps {
    textOnly?: boolean;
}

const LinkRenderer: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
    href = '',
    children,
    // @ts-ignore
    node,
    ...props
}) => {
    const {
        asPath
    } = useRouter();

    if (!children) {
        return null;
    }

    if (href.startsWith('http')) {
        return (
            <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
                {children}
            </a>
        );
    }

    if (href.startsWith('#')) {
        return (
            <Link href={`${asPath.split('#')[0]}${href}`}>
                <a {...props}>{children}</a>
            </Link>
        );
    }

    return (
        <Link href={href}>
            <a {...props}>{children}</a>
        </Link>
    );
};

const Markdown: React.FC<
    MarkdownProps &
    ReactMarkdown.ReactMarkdownProps &
    React.HTMLProps<HTMLDivElement>
> = ({ className, children = '', renderers = {}, textOnly }) => {
    return (
        <ReactMarkdown
            className={className}
            escapeHtml={false}
            unwrapDisallowed={textOnly}
            disallowedTypes={textOnly ? ['paragraph'] : undefined}
            plugins={[gfm]}
            renderers={{
                ...renderers,
                link: LinkRenderer,
            }}
            source={children}
        />
    );
};

export default Markdown;
