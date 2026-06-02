'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassWater, Wine, Beer, Leaf, Martini, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getBeerListImage, BeerListData, getSeasonalDrinkImages, SeasonalDrinkData } from '@/lib/wordpress';
import CarouselGallery from '@/components/CarouselGallery';

interface DrinkItem {
    name: string;
    price: string;
    description: string;
}

interface DrinkSection {
    category: string;
    items: DrinkItem[];
    note?: string;
    groupHeader?: string;
}

// ── Cocktails & Spirits ──
const cocktailsLeftCol: DrinkSection[] = [
    {
        category: "Cocktails",
        items: [
            { name: "Crab'A'Rita", price: "", description: "Don Julio Tequila, Grand Marnier, Lime Juice, and Sour Mix" },
            { name: "Classic Margarita", price: "", description: "Your choice of Tequila shaken with Triple Sec, Lime Juice & Sour Mix.\nAdd one of our Real Fruit Infused Purees: Strawberry, Blueberry, Blackberry, Coconut, Mango, or Passionfruit" },
            { name: "Make It a Skinny Margarita", price: "", description: "With agave syrup, orange juice, and lime juice" },
            { name: "Want a Little Spice?", price: "", description: "Have a spicy Margarita with Tanteo Jalapeño" },
            { name: "Crabby Daze", price: "", description: "Coconut Rum, Peach Schnapps, Pineapple and Cranberry Juice" },
            { name: "Mules", price: "", description: "American Mule with Vodka\nIrish Mule with Whiskey\nMexican Mule with Tequila\nKentucky Mule with Bourbon\nAll mixed with Gosling's Ginger Beer & Lime Juice" },
            { name: "Pama-Rita", price: "", description: "Cabo Wabo Blanco Tequila, Pama Pomegranate liquor, sour mix, and lime" },
            { name: "Sangrias", price: "", description: "Red Sangria — Cabernet, Brandy, Triple Sec, Orange Juice\nWhite Sangria — Pinot Grigio, Peach Tree, Pineapple Juice, Orange Juice" }
        ],
        note: "We feature a full bar. We can make the cocktail you want!"
    },
    {
        category: "Bourbon & Whiskey",
        items: [
            { name: "Bulleit & Bulleit Rye", price: "", description: "" },
            { name: "Bushmills", price: "", description: "" },
            { name: "Canadian Club", price: "", description: "" },
            { name: "Crown Apple · Original · Peach · Vanilla", price: "", description: "" },
            { name: "Glenlivet", price: "", description: "" },
            { name: "Jack Daniels", price: "", description: "" },
            { name: "Jack Daniels Fire", price: "", description: "" },
            { name: "Jack Daniels Honey", price: "", description: "" },
            { name: "Jameson Irish Whiskey & Orange", price: "", description: "" },
            { name: "Johnnie Walker Black or Red", price: "", description: "" },
            { name: "Jim Beam & Jim Red Stag", price: "", description: "" },
            { name: "Old Grand Dad", price: "", description: "" },
            { name: "Makers Mark", price: "", description: "" },
            { name: "Seagrams 7", price: "", description: "" },
            { name: "Seagram VO", price: "", description: "" },
            { name: "Southern Comfort", price: "", description: "" },
            { name: "Tullamore Dew", price: "", description: "" },
            { name: "Wild Turkey", price: "", description: "" },
            { name: "Yukon Jack", price: "", description: "" },
            { name: "Yukon American Honey", price: "", description: "" },
            { name: "Woodford Reserve", price: "", description: "" }
        ]
    }
];

const cocktailsRightCol: DrinkSection[] = [
    {
        category: "Martinis",
        items: [
            { name: "Appletini", price: "", description: "Vodka, Sour Apple Pucker, Triple Sec & a Maraschino Cherry" },
            { name: "Cathy's Espresso Martini", price: "", description: "Stoli Vanilla Vodka, Dark Crème de Cacao, Kahlúa, Fresh brewed espresso and your choice to include Bailey's Irish Cream" },
            { name: "Classic Dirty Martini", price: "", description: "Shaken with Grey Goose Vodka & Stirrings Dirty Martini Imported Olive Brine, garnished with Olives" },
            { name: "Classic Gin Martini", price: "", description: "Hendricks Gin, Dry Vermouth, lemon twist, and optional dash of Bitters" },
            { name: "Cosmopolitan", price: "", description: "Made our way with Absolut Citron, Triple Sec, Splash of Lime Juice and Cranberry\n\nOr Make It a White Cosmo with White Cranberry Juice" },
            { name: "French Martini", price: "", description: "Classically made with Tito's Handmade Vodka, Chambord & Pineapple Juice" },
            { name: "Lemon Drop Martini", price: "", description: "Absolut Citron, Triple Sec, Simple Syrup and a Splash of Sour Mix. Glass is Sugar Rimmed" },
            { name: "Peanut Butter Martini", price: "", description: "Skrewball Whiskey, Kahlua, and Fresh Espresso, Splash of Cream" },
            { name: "Pecan Pie Martini", price: "", description: "Bourbon, RumChata, Crème de Cacao, Splash of Cream" },
            { name: "Perfect Manhattan", price: "", description: "Bulleit Rye, Sweet Vermouth, Dry Vermouth, Dash of Bitters, Served with cocktail cherry" },
            { name: "Tiramisu Martini", price: "", description: "Stoli Vanilla, Amaretto, Kahlua and Splash of Cream" }
        ]
    },
    {
        category: "Tequila",
        items: [
            { name: "1800 Reposado", price: "", description: "" },
            { name: "Cabo Wabo Blanco", price: "", description: "" },
            { name: "Casamigos Blanco", price: "", description: "" },
            { name: "Don Julio Blanco", price: "", description: "" },
            { name: "Don Julio Reposado", price: "", description: "" },
            { name: "Espolon Blanco", price: "", description: "" },
            { name: "Espolon Reposado", price: "", description: "" },
            { name: "Jose Cuervo Gold", price: "", description: "" },
            { name: "Patron Silver", price: "", description: "" },
            { name: "Patron Anejo", price: "", description: "" },
            { name: "Tanteo Jalapeño", price: "", description: "" }
        ]
    },
    {
        category: "Bottles & Cans",
        items: [
            { name: "High Noon Vodka Seltzers", price: "", description: "Black Cherry, Lime, Peach and Pineapple" },
            { name: "Sun Cruisers Non-Carbonated", price: "", description: "Iced Tea & Lemonade, Iced Tea, Raspberry and Peach" },
            { name: "White Claw Black Cherry", price: "", description: "" }
        ],
        note: "Spiked Seltzers & Non-Carbonated — Flavors may change due to stock"
    }
];

// ── Beer ──
const beerData: DrinkSection[] = [
    {
        category: "Bottled Beer",
        items: [
            { name: "Becks", price: "", description: "" },
            { name: "Budweiser", price: "", description: "" },
            { name: "Bud Light", price: "", description: "" },
            { name: "Twisted Tea", price: "", description: "" },
            { name: "Coors Banquet", price: "", description: "" },
            { name: "Coors Light", price: "", description: "" },
            { name: "Corona", price: "", description: "" },
            { name: "Corona Premier", price: "", description: "" },
            { name: "Heineken", price: "", description: "" },
            { name: "Heineken Light", price: "", description: "" },
            { name: "Miller Lite & Miller High Life", price: "", description: "" },
            { name: "Michelob Ultra", price: "", description: "" },
            { name: "Rolling Rock", price: "", description: "" },
            { name: "Sam Adams Lager", price: "", description: "" },
            { name: "Sam Adams Seasonal", price: "", description: "" },
            { name: "Yuengling Light", price: "", description: "" }
        ]
    },
    {
        category: "Non-Alcoholic",
        items: [
            { name: "Bud Zero NA", price: "", description: "" },
            { name: "Guinness NA", price: "", description: "" },
            { name: "Heineken Zero", price: "", description: "" }
        ]
    }
];

// ── Wine ──
const wineData: DrinkSection[] = [
    {
        category: "Reds",
        items: [
            { name: "House Cabernet — Estrella", price: "", description: "" },
            { name: "House Merlot — Estrella", price: "", description: "" },
            { name: "Merlot", price: "", description: "California offers rich blackberry, plum & raspberry notes with hints of vanilla & toasted French bread" },
            { name: "Josh Cabernet Sauvignon", price: "", description: "Blackberry, toasted hazelnut and cinnamon, complemented by hints of vanilla and toasted oak" },
            { name: "Woodbridge by Mondavi Pinot Noir", price: "", description: "California smells like strawberry, roses & vanilla with flavors of cherry & raspberry" }
        ]
    },
    {
        category: "Whites",
        items: [
            { name: "House Chardonnay — Estrella", price: "", description: "" },
            { name: "House Pinot Grigio — Estrella", price: "", description: "" },
            { name: "House White Zinfandel — Sutter Home", price: "", description: "" },
            { name: "Josh Rosé", price: "", description: "Crisp, light bodied, refreshing and bursting with bright citrus — A warm summer sunset in a glass" },
            { name: "Cavit Collection Pinot Grigio", price: "", description: "Imported from Italy. Crisp & refreshing with a delicate floral aroma and flavors of citrus, apple, & pear" },
            { name: "Cultus Moscato", price: "", description: "Produced and bottled in Chile. Full bodied — No Butts About It, with a great fruit finish" },
            { name: "Nobilo Sauvignon Blanc", price: "", description: "Produced & bottled in Marlborough, New Zealand. Distinct notes of fresh melon & citrus" },
            { name: "Robert Mondavi Private Selection Chardonnay", price: "", description: "Fruity notes with the smooth aftertaste of vanilla from California" },
            { name: "Ruffino Prosecco", price: "", description: "A clean & delicate taste with fine bubbles and intense flavors of apples & peaches as well as lingering floral notes" },
            { name: "Schmitt Söhne Dry Riesling", price: "", description: "From Germany. Crisp green apple, honeysuckle and citrus flavors balanced by notes of bright mineral" }
        ]
    }
];

const seasonalData: DrinkSection[] = [
    {
        category: "Seasonal Drinks",
        items: [
            { name: "Check back for our seasonal offerings!", price: "", description: "Our seasonal drink menu rotates throughout the year. Ask your server for current selections." }
        ]
    }
];

const tabs = [
    { name: "Cocktails & Spirits", icon: <Martini size={18} /> },
    { name: "Beer", icon: <Beer size={18} /> },
    { name: "Wine", icon: <Wine size={18} /> },
    { name: "Seasonal Drinks", icon: <Leaf size={18} /> }
];

function getTabData(tab: string): DrinkSection[] {
    switch (tab) {
        case "Beer": return beerData;
        case "Wine": return wineData;
        case "Seasonal Drinks": return seasonalData;
        default: return [];
    }
}

function getColumnCount(tab: string): number {
    if (tab === "Wine") return 2;
    return 1;
}

function renderSections(sections: DrinkSection[]) {
    return sections.map((section, idx) => (
        <div key={idx} style={{ marginBottom: '3rem' }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem',
                position: 'relative'
            }}>
                <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    display: 'inline-block',
                    background: 'var(--background)',
                    padding: '0 1.5rem',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {section.category}
                </h2>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'rgba(0,0,0,0.1)',
                    zIndex: 0
                }}></div>
                {section.note && (
                    <p style={{
                        fontStyle: 'italic',
                        opacity: 0.7,
                        marginTop: '0.5rem',
                        fontSize: '0.9rem'
                    }}>
                        {section.note}
                    </p>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {section.items.map((item, iidx) => (
                    <div key={iidx} style={{ borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.25rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px' }}>{item.name}</h3>
                            {item.price && (
                                <div style={{ fontWeight: 'bold', color: 'var(--accent)', fontSize: '1rem', textAlign: 'right' }}>
                                    {item.price}
                                </div>
                            )}
                        </div>
                        {item.description && <p style={{ opacity: 0.8, fontSize: '0.85rem', margin: 0, whiteSpace: 'pre-line' }}>{item.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    ));
}

const GALLERY_IMAGES = [
    '/pics/drinks hero.png',
    '/pics/cheers.jpeg',
    '/pics/drink_gallery_corrected_1.jpg',
    '/pics/drink_gallery_corrected_2.jpg',
    '/pics/drink_gallery_corrected_3.jpg',
    '/pics/cocktail.jpeg',
    '/pics/drink_gallery_corrected_4.jpg',
    '/pics/beer taps.jpeg',
    '/pics/drink_gallery_corrected_5.jpg',
    '/pics/drink_gallery_corrected_6.jpg'
];

function DrinksPageContent() {
    const searchParams = useSearchParams();
    const validTabs = ["Cocktails & Spirits", "Beer", "Wine", "Seasonal Drinks"];
    const tabParam = searchParams.get('tab');
    const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : "Cocktails & Spirits";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [beerListImage, setBeerListImage] = useState<BeerListData | null>(null);
    const [loadingBeer, setLoadingBeer] = useState(false);
    const [seasonalImages, setSeasonalImages] = useState<SeasonalDrinkData[]>([]);
    const [loadingSeasonal, setLoadingSeasonal] = useState(false);
    const data = getTabData(activeTab);
    const cols = getColumnCount(activeTab);
    const isGrid = cols > 1;
    const isCocktails = activeTab === "Cocktails & Spirits";

    // Sync tab with URL query param when it changes
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && validTabs.includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    useEffect(() => {
        if (activeTab === "Beer" && !beerListImage) {
            setLoadingBeer(true);
            getBeerListImage().then(data => {
                setBeerListImage(data);
                setLoadingBeer(false);
            });
        }
    }, [activeTab, beerListImage]);

    useEffect(() => {
        if (activeTab === "Seasonal Drinks" && seasonalImages.length === 0) {
            setLoadingSeasonal(true);
            getSeasonalDrinkImages().then(data => {
                setSeasonalImages(data);
                setLoadingSeasonal(false);
            });
        }
    }, [activeTab, seasonalImages.length]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            {/* Hero Section */}
            <div style={{
                height: '38vh', // Adjusted height
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'url("/pics/drinks hero.png")',
                    backgroundSize: 'cover',
                    // 👇 MODIFY THIS TO MOVE THE IMAGE UP OR DOWN 
                    // 'center' keeps it centered. 
                    // 'center 20%' moves it up (shows more of the bottom).
                    // 'center 80%' moves it down (shows more of the top).
                    backgroundPosition: 'center',
                    zIndex: 0
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                    zIndex: 1
                }}></div>
                {/* White fade effect at the bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, width: '100%', height: '15vh',
                    background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
                    zIndex: 2
                }}></div>

                <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '4.5rem',
                        marginBottom: '0.5rem',
                        color: 'white',
                        opacity: 0.85,
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '4px'
                    }}>
                        Drinks
                    </h1>
                    <div style={{ width: '100px', height: '4px', background: 'var(--accent)', margin: '0 auto' }}></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="section" style={{ paddingTop: '4rem' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <img src="/logo_with_text.png" alt="Crabby Al's Logo" style={{ height: '150px', width: 'auto', marginBottom: '2rem' }} />

                        {/* Tab Navigation */}
                        <div className="desktop-tabs" style={{
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            marginBottom: '4rem'
                        }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '50px',
                                        border: 'none',
                                        background: activeTab === tab.name ? 'var(--primary)' : 'var(--white)',
                                        color: activeTab === tab.name ? 'white' : 'var(--primary)',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)',
                                        boxShadow: activeTab === tab.name ? '0 10px 20px rgba(10, 61, 98, 0.2)' : '0 4px 10px rgba(0,0,0,0.05)',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {tab.icon}
                                    {tab.name}
                                </button>
                            ))}
                        </div>

                        {/* Tab Navigation - Mobile */}
                        <div className="mobile-tabs">
                            <div style={{ position: 'relative' }}>
                                <select
                                    value={activeTab}
                                    onChange={(e) => setActiveTab(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 3rem 1rem 1.5rem',
                                        borderRadius: '50px',
                                        border: '2px solid var(--primary)',
                                        background: 'var(--white)',
                                        color: 'var(--primary)',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        appearance: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                        outline: 'none'
                                    }}
                                >
                                    {tabs.map((tab) => (
                                        <option key={tab.name} value={tab.name}>{tab.name}</option>
                                    ))}
                                </select>
                                <div style={{
                                    position: 'absolute',
                                    right: '1.5rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    pointerEvents: 'none',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            fontSize: '1.2rem',
                            color: 'var(--primary)',
                            fontWeight: '600',
                            marginTop: '-1rem',
                            marginBottom: '2rem',
                            fontStyle: 'italic',
                            opacity: 0.9,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem'
                        }}>
                            <div>Bar Hours</div>
                            <div>Sunday–Thursday: 11am–1am</div>
                            <div>Friday–Saturday: 11am–2am</div>
                        </div>
                    </div>

                    <div key={activeTab} className="fade-in">
                        {activeTab === "Beer" && (
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                {loadingBeer ? (
                                    <p style={{ opacity: 0.6, fontStyle: 'italic' }}>Loading draft beer list...</p>
                                ) : beerListImage ? (
                                    <div>
                                        <div style={{
                                            textAlign: 'center',
                                            marginBottom: '1.5rem',
                                            position: 'relative'
                                        }}>
                                            <h2 style={{
                                                fontFamily: 'var(--font-serif)',
                                                fontSize: '2.5rem',
                                                color: 'var(--primary)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '3px',
                                                display: 'inline-block',
                                                background: 'var(--background)',
                                                padding: '0 1.5rem',
                                                position: 'relative',
                                                zIndex: 1
                                            }}>
                                                {beerListImage.title}
                                            </h2>
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: 0,
                                                right: 0,
                                                height: '1px',
                                                background: 'rgba(0,0,0,0.1)',
                                                zIndex: 0
                                            }}></div>
                                            <p style={{
                                                fontStyle: 'italic',
                                                opacity: 0.8,
                                                marginTop: '0.75rem',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.6',
                                                whiteSpace: 'pre-line',
                                                maxWidth: '600px',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}>
                                                16 Rotating Taps{'\n'}
                                                Beer list changes quickly, we will try to update several times a week! 🍻
                                            </p>
                                        </div>
                                        <img
                                            src={beerListImage.imageUrl}
                                            alt={beerListImage.title}
                                            style={{
                                                maxWidth: '100%',
                                                width: '400px',
                                                borderRadius: '12px',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        )}
                        {activeTab === "Seasonal Drinks" && (
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                {loadingSeasonal ? (
                                    <p style={{ opacity: 0.6, fontStyle: 'italic' }}>Loading seasonal drinks...</p>
                                ) : seasonalImages.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
                                        {seasonalImages.map((drink, idx) => (
                                            <div key={idx}>
                                                {drink.title && drink.title !== 'Seasonal Drink' && (
                                                    <h3 style={{
                                                        fontFamily: 'var(--font-serif)',
                                                        fontSize: '1.5rem',
                                                        color: 'var(--primary)',
                                                        marginBottom: '1rem',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '2px'
                                                    }}>
                                                        {drink.title}
                                                    </h3>
                                                )}
                                                <img
                                                    src={drink.imageUrl}
                                                    alt={drink.title}
                                                    style={{
                                                        maxWidth: '100%',
                                                        width: '400px',
                                                        borderRadius: '12px',
                                                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <p style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                            Check back for our seasonal offerings!
                                        </p>
                                        <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>
                                            Our seasonal drink menu rotates throughout the year. Ask your server for current selections.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "Wine" && (
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '3rem',
                                position: 'relative'
                            }}>
                                <h2 style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: '2.5rem',
                                    color: 'var(--primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    display: 'inline-block',
                                    background: 'var(--background)',
                                    padding: '0 1.5rem',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    Wines
                                </h2>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0,
                                    right: 0,
                                    height: '1px',
                                    background: 'rgba(0,0,0,0.1)',
                                    zIndex: 0
                                }}></div>
                                <p style={{
                                    fontStyle: 'italic',
                                    opacity: 0.7,
                                    marginTop: '0.5rem',
                                    fontSize: '0.95rem'
                                }}>
                                    All specialty wines are available by the glass or by the bottle. House wine by the glass only.
                                </p>
                            </div>
                        )}

                        {isCocktails ? (
                            <div className="drinks-columns" style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '3rem',
                                alignItems: 'start'
                            }}>
                                {/* Row 1: Cocktails & Martinis */}
                                <div>{renderSections([cocktailsLeftCol[0]])}</div>
                                <div>{renderSections([cocktailsRightCol[0]])}</div>

                                {/* Row 2: Bourbon & Tequila + Bottles/Cans */}
                                <div>{renderSections([cocktailsLeftCol[1]])}</div>
                                <div>{renderSections([cocktailsRightCol[1], cocktailsRightCol[2]])}</div>
                            </div>
                        ) : activeTab !== "Seasonal Drinks" ? (
                            <div className={isGrid ? 'drinks-columns' : ''} style={{
                                display: isGrid ? 'grid' : 'block',
                                gridTemplateColumns: isGrid ? `repeat(${cols}, 1fr)` : undefined,
                                gap: '2rem',
                                alignItems: 'start'
                            }}>
                                {renderSections(data)}
                            </div>
                        ) : null}
                        
                        <CarouselGallery images={GALLERY_IMAGES} />
                    </div>
                </div>
                <style jsx>{`
                .fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .desktop-tabs { display: flex; }
                .mobile-tabs { display: none; }
                @media (max-width: 1200px) {
                    .drinks-columns {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 768px) {
                    .desktop-tabs { display: none !important; }
                    .mobile-tabs {
                        display: block;
                        margin-bottom: 3rem;
                        max-width: 400px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .drinks-columns {
                        grid-template-columns: 1fr !important;
                    }
                    .gallery-desktop { display: none !important; }
                    .gallery-mobile  { display: grid !important; }
                }
            `}</style>
            </div>
        </div>
    );
}

export default function DrinksPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--background)' }} />}>
            <DrinksPageContent />
        </Suspense>
    );
}
