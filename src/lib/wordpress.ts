const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://mgmt.crabbyals.com/graphql';

export interface DailySpecialData {
    imageUrl: string;
    dateText: string;
    specialType?: string;
}

export interface SeasonalSpecialData {
    imageUrl: string;
    label: string;
    endDate?: string;
}

export async function getDailySpecials(): Promise<DailySpecialData | null> {
    const query = `
        query GetDailySpecials {
            specials(first: 1) {
                nodes {
                    date
                    dailySpecials {
                        dailySpecials {
                            node {
                                sourceUrl
                            }
                        }
                        dayOfSpecials
                        specialType
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error('❌ GraphQL Errors for Specials:', JSON.stringify(result.errors, null, 2));
            return null;
        }

        const node = result?.data?.specials?.nodes?.[0];
        if (!node) return null;

        const fields = node.dailySpecials || {};

        // Image extraction
        const imageUrl = fields.dailySpecials?.node?.sourceUrl || '';

        // Date extraction
        const manualDate = fields.dayOfSpecials?.trim() ? fields.dayOfSpecials : null;
        const uploadDate = node.date?.trim() ? node.date : null;
        const rawDate = manualDate || uploadDate || '';
        
        let dateText = '';
        if (rawDate) {
            // Extract YYYY-MM-DD to avoid timezone shifting issues (e.g. 5/5 becoming 5/4)
            const datePart = rawDate.split('T')[0];
            const [year, month, day] = datePart.split('-');
            
            if (year && month && day) {
                // Set to noon local time to avoid timezone edge cases
                const safeDate = new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0);
                dateText = safeDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            } else {
                dateText = new Date(rawDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            }
        }

        const specialType = fields.specialType || null;

        return {
            imageUrl,
            dateText,
            specialType,
        };
    } catch (error) {
        console.error('Error fetching specials from WordPress:', error);
        return null;
    }
}

export async function getSeasonalSpecials(): Promise<SeasonalSpecialData[]> {
    const query = `
        query GetSeasonalSpecials {
            seasonalSpecials(first: 10) {
                nodes {
                    seasonalSpecials {
                        menuTitle
                        addSeasonSpecials {
                            node {
                                sourceUrl
                            }
                        }
                        endDate
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error('❌ GraphQL Errors for Seasonal Specials:', JSON.stringify(result.errors, null, 2));
            return [];
        }

        const nodes = result?.data?.seasonalSpecials?.nodes || [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const specials: SeasonalSpecialData[] = nodes
            .map((node: any) => {
                const fields = node.seasonalSpecials || {};

                // Expiration Logic
                if (fields.endDate) {
                    const expirationDate = new Date(fields.endDate);
                    if (today > expirationDate) {
                        return null;
                    }
                }

                const imageUrl = fields.addSeasonSpecials?.node?.sourceUrl || '';
                const label = fields.menuTitle || '';

                if (!imageUrl) return null;

                return { imageUrl, label };
            })
            .filter((special: any): special is SeasonalSpecialData => special !== null);

        return specials;
    } catch (error) {
        console.error('Error fetching seasonal specials from WordPress:', error);
        return [];
    }
}

export interface BeerListData {
    imageUrl: string;
    title: string;
}

export async function getBeerListImage(): Promise<BeerListData | null> {
    const query = `
        query GetBeerListImage {
            beerLists(first: 1) {
                nodes {
                    title
                    beerListFields {
                        beerListImage {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error('❌ GraphQL Errors for Beer List:', JSON.stringify(result.errors, null, 2));
            return null;
        }

        const node = result?.data?.beerLists?.nodes?.[0];
        if (!node) return null;

        const imageUrl = node.beerListFields?.beerListImage?.node?.sourceUrl || '';
        const title = node.title || 'Draft Beer';

        if (!imageUrl) return null;

        return { imageUrl, title };
    } catch (error) {
        console.error('Error fetching beer list from WordPress:', error);
        return null;
    }
}

export interface SeasonalDrinkData {
    imageUrl: string;
    title: string;
}

export async function getSeasonalDrinkImages(): Promise<SeasonalDrinkData[]> {
    const query = `
        query GetSeasonalDrinks {
            seasonalDrinksMenu(first: 1) {
                nodes {
                    title
                    drinksMenu {
                        uploadSeasonalDrinkMenu {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error('❌ GraphQL Errors for Seasonal Drinks:', JSON.stringify(result.errors, null, 2));
            return [];
        }

        const nodes = result?.data?.seasonalDrinksMenu?.nodes || [];

        return nodes
            .map((node: any) => {
                const imageUrl = node.drinksMenu?.uploadSeasonalDrinkMenu?.node?.sourceUrl || '';
                const title = node.title || 'Seasonal Drink';
                if (!imageUrl) return null;
                return { imageUrl, title };
            })
            .filter((item: any): item is SeasonalDrinkData => item !== null);
    } catch (error) {
        console.error('Error fetching seasonal drinks from WordPress:', error);
        return [];
    }
}

export interface HappeningData {
    id: string;
    title: string;
    imageUrl: string;
}

export async function getHappenings(): Promise<HappeningData[]> {
    const query = `
        query GetHappenings {
            happenings(first: 50) {
                nodes {
                    id
                    title
                    happenings {
                        uploadImage {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error('❌ GraphQL Errors for Happenings:', JSON.stringify(result.errors, null, 2));
            return [];
        }

        const nodes = result?.data?.happenings?.nodes || [];

        return nodes
            .map((node: any) => {
                const imageUrl = 
                    node.happenings?.uploadImage?.node?.sourceUrl || 
                    node.featuredImage?.node?.sourceUrl || 
                    '';
                
                if (!imageUrl) return null;

                return {
                    id: node.id || Math.random().toString(),
                    title: node.title || 'Happening',
                    imageUrl
                };
            })
            .filter((item: any): item is HappeningData => item !== null);
    } catch (error) {
        console.error('Error fetching happenings from WordPress:', error);
        return [];
    }
}

export async function getBandScheduleImage(): Promise<string | null> {
    const query = `
        query GetBandSchedule {
            bandSchedules(first: 1) {
                nodes {
                    bandSchedlue {
                        uploadBandSchedule {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error('❌ GraphQL Errors for Band Schedule:', JSON.stringify(result.errors, null, 2));
            return null;
        }

        const node = result?.data?.bandSchedules?.nodes?.[0];
        if (!node) return null;

        return node.bandSchedlue?.uploadBandSchedule?.node?.sourceUrl || null;
    } catch (error) {
        console.error('Error fetching band schedule from WordPress:', error);
        return null;
    }
}

export interface PromoBannerData {
    text: string;
    isActive: boolean;
}

export async function getPromoBanner(): Promise<PromoBannerData | null> {
    const query = `
        query GetPromoBanner {
            promoBanners(first: 1) {
                nodes {
                    editBanner {
                        bannerText
                        bannerSwitch
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
            // Fetch fresh banner data every 60 seconds
            next: { revalidate: 60 }
        });

        const result = await response.json();

        if (result.errors) {
            console.error('❌ GraphQL Errors for Promo Banner:', JSON.stringify(result.errors, null, 2));
            return null;
        }

        const node = result?.data?.promoBanners?.nodes?.[0];
        if (!node) return null;

        const settings = node.editBanner;
        if (!settings) return null;

        return {
            text: settings.bannerText || 'NEW! Banners are here - your new go-to pattern for important announcements',
            isActive: settings.bannerSwitch === true || settings.bannerSwitch === 'true' || settings.bannerSwitch === '1'
        };
    } catch (error) {
        console.error('Error fetching promo banner from WordPress:', error);
        return null;
    }
}

export interface PromoPopupData {
    imageUrl: string;
    text: string;
    buttonText: string;
    buttonLink: string;
    hasButton: boolean;
    isActive: boolean;
}

export async function getPromoPopup(): Promise<PromoPopupData | null> {
    const query = `
        query GetPromoPopup {
            popups(first: 1) {
                nodes {
                    editPopup {
                        popupImage {
                            node {
                                sourceUrl
                            }
                        }
                        popupText
                        buttonText
                        buttonLink
                        buttonSwitch
                        popupSwitch
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
            // Fetch fresh popup data every 60 seconds
            next: { revalidate: 60 }
        });

        const result = await response.json();

        if (result.errors) {
            console.error('❌ GraphQL Errors for Promo Popup:', JSON.stringify(result.errors, null, 2));
            return null;
        }

        const node = result?.data?.popups?.nodes?.[0];
        if (!node) return null;

        const settings = node.editPopup;
        if (!settings) return null;

        return {
            imageUrl: settings.popupImage?.node?.sourceUrl || '',
            text: settings.popupText || '',
            buttonText: settings.buttonText || '',
            buttonLink: settings.buttonLink || '',
            hasButton: settings.buttonSwitch === true || settings.buttonSwitch === 'true' || settings.buttonSwitch === '1',
            isActive: settings.popupSwitch === true || settings.popupSwitch === 'true' || settings.popupSwitch === '1'
        };
    } catch (error) {
        console.error('Error fetching promo popup:', error);
        return null;
    }
}

export async function getBrunchMenu(): Promise<string | null> {
    const query = `
        query GetBrunchMenu {
            allBrunchMenus(first: 1) {
                nodes {
                    updateBrunchMenu {
                        brunchMenu {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            return null;
        }

        const result = await response.json();
        const node = result?.data?.allBrunchMenus?.nodes?.[0];
        
        return node?.updateBrunchMenu?.brunchMenu?.node?.sourceUrl || null;
    } catch (error) {
        console.error('Error fetching brunch menu:', error);
        return null;
    }
}
