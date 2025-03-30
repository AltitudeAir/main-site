
export const apiConfig = {
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

export async function setHeaders(headers: Headers) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey) {
        headers.set('X-Api-Key', apiKey);
    }
    // headers.set('accept', 'application/json');
    return headers;
}

export const apiPaths = {
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    allNewsUrl: '/news/',
    newsLimitUrl: '/news/latest/',
    crewallUrl: '/crew/all/',
    serviceUrl: '/services/',
    getBodUrl: '/general/bod/',
    getBodMessageUrl: '/general/bod-message/',
    blogUrl: '/blog/',
    blogCatrgoryUrl: '/blog-category/',
    reviewurl: '/review/',
    allGalleryUrl: '/gallery/featuredlist/',
    allPackagesPublicUrl: '/packages/public/',
    getPackages: '/packages/',
    bookingUrl: '/bookings/',
    rescuemissionUrl: '/rescue-mission/',
    enquiryUrl: '/enquiry/',
    employeesUrl: '/',
    contactUsUrl: '/contactUs',
    generalUrl: '/general/',
    getContactUrl: '/contact/query/siteContact/',
    getSociallinkUrl: '/socialLink/v2',
    getGeneralUrl: '/general/general-mutation',
    getVolutneryHazardUrl: '/general/hazard',
    getNewsUrl: '/news/',
    footerUrl: '/footer/'
};