import React, { ImgHTMLAttributes } from 'react';

export type Source = {
    src: string;
    sizes: string;
    media?: string;
};

export interface PictureProps {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
    focus?:
        | 'center'
        | 'top'
        | 'right'
        | 'left'
        | 'bottom'
        | 'top_right'
        | 'top_left'
        | 'bottom_right'
        | 'bottom_left'
        | 'face'
        | 'faces';
}

const getQueryString = (object: { [key: string]: any }) =>
    Object.keys(object)
        .filter(key => object[key])
        .map(key => `${key}=${object[key]}`)
        .join('&');

const Picture: React.FC<ImgHTMLAttributes<HTMLImageElement> & PictureProps> = ({
    src,
    width,
    height,
    quality = 100,
    fit,
    focus,
    loading = 'lazy',
    alt,
    ...props
}) => {
    if (!src) {
        return null;
    }

    const isSvg = src.endsWith('.svg');

    if (isSvg) {
        return <img src={src} {...props} width={width} height={height} alt={alt} />;
    }

    const query = {
        q: quality,
        w: width,
        h: height,
        f: focus,
        fit,
    };

    const highResQuery = {
        ...query,
        w: width && width * 2,
        h: height && height * 2,
    };

    const queryString = getQueryString(query);
    const highResQueryString = getQueryString(highResQuery);

    const contentfulSrc = `${src}?${queryString}`;
    const contentfulHighResSrc = `${src}?${highResQueryString}`;

    return (
        <picture>
            <source
                srcSet={`${contentfulHighResSrc}&fm=avif 2x, ${contentfulSrc}&fm=avif 1x`}
                type='image/avif'
            />
            <source
                srcSet={`${contentfulHighResSrc}&fm=webp 2x, ${contentfulSrc}&fm=webp 1x`}
                type='image/webp'
            />
            <source
                srcSet={`${contentfulHighResSrc} 2x, ${contentfulSrc} 1x`}
            />
            <source srcSet={`${contentfulSrc}&fm=webp`} type='image/webp' />
            <img
                src={contentfulSrc}
                {...props}
                width={width}
                height={height}
                loading={loading}
                alt={alt}
            />
        </picture>
    );
};

export default React.memo(Picture);
