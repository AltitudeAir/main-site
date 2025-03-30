import { Metadata } from 'next';

interface PageSEOProps {
    title: string;
    description?: string;
    canonicalUrl?: string;
    ogType?: "website" | "article" | "music.album" | "music.playlist" | "video.other";
    ogImage?: string;
    twitterCard?: "summary_large_image" | "summary" | "player" | "app";
    keywords?: string[];
}

export function customMetaDataGenerator({
    title,
    description = "Altitude Air offers top-rated helicopter services and scenic package tours to beautiful destinations.",
    canonicalUrl = 'https://altitudeairnepal.com',
    ogType = 'website',
    keywords = [
        "altitude air", "helicopter services Nepal", "adventure flights", "Nepal helicopter tours", "mountain flights",
        "Everest helicopter tour", "Nepal air travel", "Nepal charter flights", "rescue helicopter Nepal",
        "Himalayas helicopter tour", "Everest base camp helicopter tour", "Annapurna helicopter tour", "Langtang helicopter tour",
        "Mustang helicopter tour", "Muktinath helicopter tour", "Gosaikunda helicopter tour", "Rara Lake helicopter tour",
        "Pokhara helicopter tour", "scenic helicopter flights", "mountain sightseeing flights", "helicopter rescue Nepal",
        "medical evacuation Nepal", "emergency helicopter services", "altitude sickness rescue", "air ambulance Nepal",
        "high-altitude rescue", "Himalayan rescue service", "air evacuation Nepal", "medical flight services", "Muktinath tour",
        "Kailash Mansarovar tour", "Damodar Kunda tour", "Gosaikunda yatra", "Halesi Mahadev tour", "Lumbini helicopter tour",
        "Buddhist pilgrimage flights", "Hindu pilgrimage flights", "holy sites Nepal", "spiritual helicopter tours",
        "Everest", "Annapurna", "Langtang", "Manaslu", "Mustang", "Dolpo", "Kanchenjunga", "Dhaulagiri", "Makalu", "Gauri Shankar",
        "Rara Lake", "Shey Phoksundo", "Tsum Valley", "Tilicho Lake", "Lhotse", "Cho Oyu", "Ama Dablam", "Himlung", "Yala Peak",
        "private helicopter Nepal", "chartered flights Nepal", "business charter flights", "VIP helicopter service",
        "luxury helicopter tours", "adventure air travel", "heli safari Nepal", "aerial photography flights", "heli trekking Nepal",
        "Nepal adventure travel", "Nepal air tours", "luxury travel Nepal", "aerial adventure Nepal", "best Nepal travel company",
        "tourism in Nepal", "trekking and helicopter return", "best helicopter tours Nepal", "private tour Nepal",
        "corporate helicopter charter", "VIP helicopter services Nepal", "aerial surveys Nepal", "film and photography flights",
        "wedding helicopter flights", "executive air travel", "heli wedding Nepal", "helicopter adventure sports",
        "best helicopter company Nepal", "affordable helicopter tours", "reliable rescue services", "expert pilots Nepal",
        "safe helicopter rides", "licensed aviation services Nepal", "best Himalayan flights", "scenic helicopter Nepal"
    ],
    ogImage = 'https://altitudeairnepal.com/images/banner/banner-4.jpg',
    twitterCard = 'summary_large_image',
}: PageSEOProps): Metadata {

    const siteTitle = 'Altitude Air Nepal';
    const fullTitle = `${title} - ${siteTitle}`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        openGraph: {
            title: fullTitle,
            description,
            type: ogType,
            url: canonicalUrl,
            images: [
                {
                    url: ogImage,
                    width: 600,
                    height: 630,
                    alt: `${title} - Altitude Air Nepal`,
                    type: 'image/jpeg',
                },
            ],
            locale: 'en_US',
        },
        twitter: {
            card: twitterCard,
            title: fullTitle,
            images: [ogImage],
            description,
            creator: '@yourhandle',
        },
        alternates: {
            canonical: canonicalUrl,
        },
        metadataBase: new URL(canonicalUrl),
        robots: {
            index: true,
            follow: true,
        },
    };
}
