'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Leaf, Calendar, Clock, Star, Utensils, X } from 'lucide-react';
import { getDailySpecials, DailySpecialData, getSeasonalSpecials, SeasonalSpecialData, getBrunchMenu } from '@/lib/wordpress';
import CarouselGallery from '@/components/CarouselGallery';

const MENU_GALLERY_IMAGES = [
    '/pics/lobster.png',
    '/pics/pickle.png',
    '/pics/clams.png',
    '/pics/pasta.jpeg',
    '/pics/shrimp.png',
    '/pics/tacos.jpeg',
    '/pics/calamari.png',
    '/pics/steak and eggs.jpeg',
    '/pics/chowder.png',
    '/pics/dinner.jpeg'
];

interface MenuItem {
    name: string;
    price: string;
    description: React.ReactNode;
}

interface MenuSection {
    category: string;
    items: MenuItem[];
    note?: string;
    footer?: string;
    highlightFooter?: boolean;
}

const mainMenuData: MenuSection[] = [
    {
        category: "SOUP & SALAD",
        items: [
            { name: "Crock of French Onion", price: "7.99", description: "" },
            { name: "Daily Soup", price: "Cup 4.99 | Bowl 5.99 | Pint To Go 8.99", description: "" },
            { name: "Lobster Bisque or New England Clam Chowder", price: "Cup 5.99 | Bowl 6.99 | Pint To Go 9.99", description: "" },
            { name: "House Salad", price: "7.99", description: "Crisp fresh greens & garden vegetables.\nDressings: Balsamic Vinaigrette, Golden Italian, Honey Mustard, Parmesan Peppercorn, Ranch, Thousand Island." },
            { name: "Traditional Caesar Salad", price: "9.99", description: "Freshly chopped romaine hearts in rich Caesar dressing topped with crunchy croutons & parmesan cheese" }
        ],
        footer: "Add to Any Salad (Blackened or Grilled): Chicken 11.99 | Shrimp 15.99 | Steak 16.99 | Salmon 18.99 | Swordfish 18.99 | Tuna 18.99"
    },
    {
        category: "WINGS",
        note: "Served with celery & (1) bleu cheese or ranch. Extra is .50",
        items: [
            { name: "Boneless Wings (5 pc)", price: "9.99", description: "" },
            { name: "Boneless Wings (10 pc)", price: "16.99", description: "" },
            { name: "Bone-In Wings (Dozen)", price: "21.99", description: "" }
        ],
        footer: "Flavor Choices: Bourbon, Buffalo, Carolina Gold, Honey Barbecue, & Garlic Parmesan (Only one flavor per order)"
    },
    {
        category: "APPETIZERS",
        items: [
            { name: "Chilled Shrimp Cocktail (6)", price: "15.99", description: "Peel & eat jumbo shrimp on a bed of mixed greens" },
            { name: "Clams Casino (6)", price: "14.99", description: "" },
            { name: "Crabby’s Crab Cakes (2)", price: "Market Price", description: "Grilled crisp & served with remoulade sauce. Make it a meal with choice of potato & vegetable (Market Price)." },
            { 
                name: "Fried Calamari (10 oz)", 
                price: "14.99", 
                description: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.2rem' }}>
                        <span>Classic with marinara sauce</span>
                        <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Fritti</span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '0.4rem' }}>(Fried Cherry Peppers & Gorgonzola)</span>
                                </div>
                                <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.95rem' }}>16.99</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Crabby Style</span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '0.4rem' }}>(Melted Gorgonzola Sauce & Cherry Peppers)</span>
                                </div>
                                <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.95rem' }}>17.99</span>
                            </div>
                        </div>
                    </div>
                )
            },
            { name: "Fried Whole Belly Clams", price: "Market Price", description: "" },
            { name: "Fried Clam Strips", price: "15.99", description: "" },
            { name: "Stuffed Mushrooms (5)", price: "15.99", description: "With housemade lobster & crab stuffing" },
            { name: "Garlic Bread", price: "Cheese 5.99 | Plain 4.99", description: "" },
            { name: "Golden Coconut Shrimp (6)", price: "13.99", description: "Served with sweet & sour sauce" },
            { name: "Grilled Quesadilla", price: "Cheese 7.99 | Chicken 11.99 | Shrimp 15.99 | Steak 16.99", description: "" },
            { name: "Little Neck Clams", price: "16.99", description: "By the dozen raw or steamed" },
            { name: "Mussels Fra Diavolo or Lemon Garlic Butter", price: "17.99", description: "" },
            { name: "Shrimp & Garlic Bread (5)", price: "17.99", description: "Grilled or blackened shrimp" }
        ]
    },
    {
        category: "SANDWICHES",
        note: "All sandwiches served with a pickle & choice of French fries or house-made chips (Sweet potato fries +2.50 | GF rolls +3.50)",
        items: [
            { name: "Black Angus Burger", price: "16.99", description: "½ lb of Angus beef on a toasted brioche. Add cheese + 2.00" },
            { name: "Buffalo Crispy Chicken Wrap", price: "16.99", description: "With bacon & cheese" },
            { name: "Crispy Chicken Sandwich", price: "15.99", description: "Topped with sriracha aioli" },
            { name: "Fresh Fish Sandwich", price: "16.99", description: "Atlantic cod broiled or fried with tartar sauce on the side" },
            { name: "Grilled Chicken Sandwich", price: "15.99", description: "Blackened, barbecue, bourbon sauce, or grilled" },
            { name: "Ham Cubano", price: "15.99", description: "Ham, Roasted Pork, Swiss, pickles & mustard" },
            { name: "NY Strip Steak Sandwich", price: "18.99", description: "With sautéed mushrooms, onions & melted American cheese" },
            { name: "Sweet Sausage Burger", price: "16.99", description: "With sautéed peppers & onions topped with melted American cheese" },
            { name: "Veggie Burger", price: "15.99", description: "Chipotle black bean patty" }
        ]
    },
    {
        category: "PASTA STATION",
        note: "Add to any pasta dish: Garlic Bread +2.99 | Garlic Bread with Cheese +3.99",
        items: [
            { name: "Chicken Francaise(Egg Washed), Marsala or Piccata", price: "27.99", description: "Served over pasta or with potato & vegetable" },
            { name: "Chicken Parmesan", price: "28.99", description: "Breaded & fried over pasta" },
            { name: "Chicken or Pork Milanese", price: "28.99 | (Fra Diavolo Style 29.99)", description: "Lemon butter sauce over pasta topped with melted cheese" },
            { name: "Linguini & Clams", price: "27.99", description: "Tender baby clams & fresh little necks served in a red or white garlic sauce" },
            { name: "Mussels Fra Diavolo or Lemon Garlic Butter sauce", price: "27.99", description: "Served over linguini" },
            { name: "Seafood Newburg", price: "Market Price", description: "Shrimp, scallops & lobster meat in savory lobster bisque sauce over penne" },
            { name: "Shrimp Scampi", price: "29.99", description: "Tender gulf shrimp cooked in a lemon garlic sauce with roasted red peppers over angel hair pasta" }
        ]
    },
    {
        category: "SEAFOOD ROLLS",
        note: "All served on toasted New England rolls with your choice of French fries or house-made potato chips",
        items: [
            { name: "Fried Scallop Roll (6 pc)", price: "24.99", description: "" },
            { name: "Clam Strip Roll (5 oz)", price: "19.99", description: "" },
            { name: "Hot or Cold Lobster Roll (7 oz)", price: "Market Price", description: "Hot  Lobster roll with side of drawn butter | Cold Lobster roll made to order" },
            { name: "Whole Belly Clam Roll (5 oz)", price: "Market Price", description: "" }
        ]
    },
    {
        category: "FRIED SEAFOOD PLATTERS",
        note: "All served with your choice of French fries or house-made potato chips",
        items: [
            { name: "Fish & Chips", price: "26.99", description: "Fried fresh atlantic cod" },
            { name: "Fried Fish Platter", price: "27.99", description: "Clam strips, cod & shrimp" },
            { name: "Two Way Combo", price: "26.99", description: "Choice of any two: clam strips, cod, Gulf shrimp or calamari" },
            { name: "Clam Strips (8 oz)", price: "23.99", description: "" },
            { name: "Coconut Shrimp (8 PIECES)", price: "19.99", description: "" },
            { name: "Jumbo Gulf Shrimp (7 PIECES)", price: "25.99", description: "" },
            { name: "Sea Scallops (8 oz)", price: "28.99", description: "" },
            { name: "Whole Bellies (8 oz)", price: "Market Price", description: "" }
        ]
    },
    {
        category: "FROM THE SEA",
        note: "All served with choice of potato & daily vegetable. Add lobster sauce to any dish +1.50",
        items: [
            { name: "Boston Baked Cod", price: "26.99", description: "Tender atlantic cod baked with cracker crumbs" },
            { name: "Broiled Sea Scallops", price: "30.99", description: "Jumbo atlantic scallops baked in a butter sauce topped with cracker crumbs" },
            { name: "Salmon Filet", price: "27.99", description: "Grilled or blackend. Served medium unless otherwise requested" },
            { name: "Stuffed Jumbo Gulf Shrimp (4)", price: "28.99", description: "Jumbo gulf shrimp stuffed with our housemade crab stuffing" },
            { name: "Stuffed Salmon or Swordfish", price: "31.99", description: "Stuffed with our housemade crab stuffing" },
            { name: "Swordfish Steak", price: "27.99", description: "Served blackened or grilled" },
            { name: "Yellowfin Tuna", price: "29.99", description: "Served blackened,grilled, or seasake encrusted. Served medium unless otherwise requested" }
        ]
    },
    {
        category: "NOT FISH",
        note: "All served with choice of potato & daily vegetable",
        items: [
            { name: "NY Strip or Ribeye (14 oz)", price: "Market Price", description: "cooked to your liking" },
            { name: "Maple Dijon Pork Chops", price: "31.99", description: "light maple dijon sauce over tender bone in pork chops" }
        ]
    },
    {
        category: "SIDES",
        items: [
            { name: "Baked Potato", price: "3.50", description: "" },
            { name: "Cole Slaw (8 oz)", price: "3.99", description: "" },
            { name: "Daily Vegetable", price: "3.50", description: "" },
            { name: "Daily Rice", price: "3.50", description: "" },
            { name: "Garlic Mashed Potato", price: "3.50", description: "" },
            { name: "Loaded Baked Potato", price: "5.50", description: "" },
            { name: "Loaded Garlic Mashed", price: "5.50", description: "" },
            { name: "Sweet Potato Fries", price: "4.99", description: "" }
        ]
    }
];

const kidsMenuData: MenuSection[] = [
    {
        category: "KIDS MENU",
        note: "For our friends 12 and under. All meals served with french fries.",
        items: [
            { name: "Grilled Cheese", price: "", description: "" },
            { name: "Hamburger", price: "", description: "" },
            { name: "Cheeseburger", price: "", description: "" },
            { name: "Hot Diggity Dog", price: "", description: "" },
            { name: "Mac & Cheese", price: "", description: "" },
            { name: "Fish Sticks", price: "", description: "" },
            { name: "Penne Marinara", price: "", description: "" }
        ],
        footer: "Kids Meals are $9.99 each!",
        highlightFooter: true
    }
];

const dailySpecials: MenuSection[] = [
    {
        category: "WEEKLY SPECIALS",
        items: [
            { name: "Taco Tuesday", price: "14.95", description: "Fish tacos with homemade salsa and zesty lime crema." },
            { name: "Wing Wednesday", price: "0.75/wing", description: "Jumbo wings with your choice of nautical-themed sauces." },
            { name: "Pasta Night (Thu)", price: "18.95", description: "Choice of Seafood Linguine or Shrimp Scampi with garlic bread." },
            { name: "Prime Rib Night (Fri)", price: "24.95", description: "Slow-roasted prime rib served with au jus and mashed potatoes." },
            { name: "Crabby Monday", price: "Market", description: "Buy one Crab Cake Dinner, get the second half off." }
        ]
    }
];

function MenuPageContent() {
    const params = useParams();
    const router = useRouter();

    const slugMap: Record<string, string> = {
        'main': 'Main Menu',
        'kids': 'Kids Menu',
        'brunch': 'Brunch Menu',
        'seasonal': 'Seasonal Specials',
        'daily': 'Daily Specials'
    };

    const reverseSlugMap: Record<string, string> = {
        'Main Menu': 'main',
        'Kids Menu': 'kids',
        'Brunch Menu': 'brunch',
        'Seasonal Specials': 'seasonal',
        'Daily Specials': 'daily'
    };

    const slugArray = params.slug as string[] | undefined;
    const slug = slugArray ? slugArray[0] : 'main';
    const validTabs = ["Main Menu", "Kids Menu", "Brunch Menu", "Seasonal Specials", "Daily Specials"];
    const initialTab = slugMap[slug] || "Main Menu";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [specials, setSpecials] = useState<DailySpecialData | null>(null);
    const [loadingSpecials, setLoadingSpecials] = useState(false);
    const [seasonalSpecials, setSeasonalSpecials] = useState<SeasonalSpecialData[]>([]);
    const [loadingSeasonal, setLoadingSeasonal] = useState(false);
    const [brunchImageUrl, setBrunchImageUrl] = useState<string | null>(null);
    const [loadingBrunch, setLoadingBrunch] = useState(false);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
        const newSlug = reverseSlugMap[tabName] || 'main';
        if (newSlug === 'main') {
            router.push('/menu');
        } else {
            router.push(`/menu/${newSlug}`);
        }
    };

    // Sync tab with URL slug when it changes
    useEffect(() => {
        const currentSlug = params.slug ? (params.slug as string[])[0] : 'main';
        const tab = slugMap[currentSlug];
        if (tab && validTabs.includes(tab)) {
            setActiveTab(tab);
        }
    }, [params.slug]);

    useEffect(() => {
        if (activeTab === "Daily Specials" && !specials) {
            setLoadingSpecials(true);
            getDailySpecials().then(data => {
                setSpecials(data);
                setLoadingSpecials(false);
            });
        }
        if (activeTab === "Seasonal Specials" && seasonalSpecials.length === 0) {
            setLoadingSeasonal(true);
            getSeasonalSpecials().then(data => {
                setSeasonalSpecials(data);
                setLoadingSeasonal(false);
            });
        }
        if (activeTab === "Brunch Menu" && !brunchImageUrl && !loadingBrunch) {
            setLoadingBrunch(true);
            getBrunchMenu().then(url => {
                setBrunchImageUrl(url);
                setLoadingBrunch(false);
            });
        }
    }, [activeTab, specials, seasonalSpecials.length, brunchImageUrl, loadingBrunch]);

    const tabs = [
        { name: "Main Menu", icon: <Utensils size={18} /> },
        { name: "Daily Specials", icon: <Calendar size={18} /> },
        { name: "Seasonal Specials", icon: <Leaf size={18} /> },
        { name: "Brunch Menu", icon: <Clock size={18} /> },
        { name: "Kids Menu", icon: <Star size={18} /> }
    ];

    const getActiveData = () => {
        switch (activeTab) {
            case "Main Menu": return mainMenuData;
            case "Kids Menu": return kidsMenuData;
            case "Daily Specials": return dailySpecials;
            default: return mainMenuData;
        }
    };

    const today = new Date();
    const defaultDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="section" style={{ minHeight: '100vh', background: 'transparent', paddingTop: '4rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
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
                                onClick={() => handleTabClick(tab.name)}
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
                                onChange={(e) => handleTabClick(e.target.value)}
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

                    {activeTab === "Main Menu" && (
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
                            <div>Available</div>
                            <div>Sunday–Thursday: 11am–10pm</div>
                            <div>Friday–Saturday: 11am–11pm</div>
                        </div>
                    )}

                </div>

                <div key={activeTab} className="fade-in">
                    {activeTab === "Daily Specials" ? (
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            {loadingSpecials ? (
                                <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="animate-pulse" style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px' }}>LOADING SPECIALS...</div>
                                </div>
                            ) : (
                                <>
                                    <img
                                        src={specials?.imageUrl || "/daily-specials.png"}
                                        alt="Daily Specials"
                                        className="mobile-zoomable"
                                        style={{
                                            maxWidth: '800px',
                                            width: '100%',
                                            maxHeight: '70vh',
                                            height: 'auto',
                                            objectFit: 'contain'
                                        }}
                                        onClick={(e) => {
                                            if (window.innerWidth <= 768) {
                                                setEnlargedImage((e.target as HTMLImageElement).src);
                                            }
                                        }}
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            if (img.src.includes('hostingersite.com')) {
                                                img.src = '/daily-specials.png';
                                            } else if (img.src.endsWith('/daily-specials.png')) {
                                                img.src = '/dummydata.png';
                                            } else if (img.src.endsWith('/dummydata.png')) {
                                                img.src = 'https://placehold.co/800x1000?text=Daily+Specials+Coming+Soon';
                                            }
                                        }}
                                    />
                                    <div style={{ marginTop: '2rem' }}>
                                        <h2 style={{
                                            fontFamily: 'var(--font-serif)',
                                            fontSize: '1.2rem',
                                            color: 'var(--accent)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            margin: 0
                                        }}>
                                            {specials?.dateText ? `Specials for ${specials.dateText}` : `Specials for ${defaultDate}`}
                                        </h2>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : activeTab === "Seasonal Specials" ? (
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            {loadingSeasonal ? (
                                <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="animate-pulse" style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px' }}>LOADING SEASONAL SPECIALS...</div>
                                </div>
                            ) : seasonalSpecials.length > 0 ? (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '3rem',
                                    justifyItems: 'center',
                                    width: '100%',
                                    maxWidth: '1200px',
                                    margin: '0 auto'
                                }}>
                                    {seasonalSpecials.map((special, index) => (
                                        <div key={index} style={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1.5rem',
                                            textAlign: 'center'
                                        }}>
                                            {special.label && (
                                                <h2 style={{
                                                    fontFamily: 'var(--font-serif)',
                                                    fontSize: '1.6rem',
                                                    color: 'var(--primary)',
                                                    letterSpacing: '0.5px',
                                                    margin: 0,
                                                    fontWeight: '600'
                                                }}>
                                                    {special.label}
                                                </h2>
                                            )}
                                            <img
                                                src={special.imageUrl}
                                                alt={special.label || "Seasonal Special"}
                                                className="mobile-zoomable"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    maxHeight: '70vh',
                                                    objectFit: 'contain'
                                                }}
                                                onClick={(e) => {
                                                    if (window.innerWidth <= 768) {
                                                        setEnlargedImage((e.target as HTMLImageElement).src);
                                                    }
                                                }}
                                                onError={(e) => {
                                                    const img = e.target as HTMLImageElement;
                                                    img.src = 'https://placehold.co/800x1000?text=Seasonal+Special';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    minHeight: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    color: 'var(--primary)',
                                    opacity: 0.5
                                }}>
                                    <Leaf size={48} />
                                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontStyle: 'italic', margin: 0 }}>
                                        Seasonal specials coming soon!
                                    </p>
                                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                                        Check back for our latest seasonal offerings.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : activeTab === "Brunch Menu" ? (
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            {loadingBrunch ? (
                                <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="animate-pulse" style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px' }}>LOADING BRUNCH MENU...</div>
                                </div>
                            ) : brunchImageUrl ? (
                                <img
                                    src={brunchImageUrl}
                                    alt="Brunch Menu"
                                    className="mobile-zoomable"
                                    style={{
                                        maxWidth: '800px',
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }}
                                    onClick={(e) => {
                                        if (window.innerWidth <= 768) {
                                            setEnlargedImage((e.target as HTMLImageElement).src);
                                        }
                                    }}
                                />
                            ) : (
                                <div style={{
                                    minHeight: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    color: 'var(--primary)',
                                    opacity: 0.5
                                }}>
                                    <Clock size={48} />
                                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontStyle: 'italic', margin: 0 }}>
                                        Brunch specials coming soon!
                                    </p>
                                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                                        Please check back.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        getActiveData().map((section, idx) => (
                            <div key={idx} style={{ marginBottom: '3rem' }}>
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: '2rem',
                                    position: 'relative'
                                }}>
                                    <h2 style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: '1.8rem',
                                        color: 'var(--primary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        display: 'inline-block',
                                        background: 'transparent',
                                        padding: '0 1rem',
                                        position: 'relative',
                                        zIndex: 1
                                    }}>
                                        {section.category}
                                    </h2>
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

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                                    gap: '1.25rem 3rem'
                                }}>
                                    {section.items.map((item, iidx) => (
                                        <div key={iidx} style={{ borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '0.75rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.15rem' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.5px' }}>{item.name}</h3>
                                                <div style={{ fontWeight: 'bold', color: 'var(--accent)', fontSize: '1rem', textAlign: 'right' }}>
                                                    {item.price}
                                                </div>
                                            </div>
                                            {item.description && <div style={{ opacity: 0.8, fontSize: '0.85rem', margin: 0, whiteSpace: 'pre-line' }}>{item.description}</div>}
                                        </div>
                                    ))}
                                </div>

                                {section.footer && (
                                    <div 
                                        className={section.highlightFooter ? "kids-banner" : ""}
                                        style={{
                                        position: 'relative',
                                        marginTop: '2rem',
                                        textAlign: 'center',
                                        padding: section.highlightFooter ? '1.5rem 2rem' : '1rem',
                                        background: section.highlightFooter ? 'url("/pics/kids-banner-bg.png") center / 115% auto no-repeat' : 'rgba(10, 61, 98, 0.05)',
                                        color: section.highlightFooter ? 'white' : 'var(--primary)',
                                        borderRadius: '12px',
                                        fontSize: section.highlightFooter ? '1.5rem' : '0.9rem',
                                        fontWeight: section.highlightFooter ? '800' : '600',
                                        textTransform: section.highlightFooter ? 'uppercase' : 'none',
                                        letterSpacing: section.highlightFooter ? '1px' : 'normal',
                                        boxShadow: section.highlightFooter ? '0 10px 30px rgba(0, 119, 182, 0.4)' : 'none',
                                        border: section.highlightFooter ? '2px solid rgba(255, 255, 255, 0.3)' : 'none',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ position: 'relative', zIndex: 1, textShadow: section.highlightFooter ? '0 2px 6px rgba(0,0,0,0.4)' : 'none' }}>
                                            {section.footer}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {activeTab === "Main Menu" && (
                        <div style={{
                            textAlign: 'center',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            fontStyle: 'italic',
                            color: 'var(--primary)',
                            fontSize: '1.2rem',
                            fontWeight: '600'
                        }}>
                            <div style={{ marginBottom: '2rem' }}>
                                Ask about Crabby Al’s daily house made desserts!
                            </div>
                        </div>
                    )}

                    {activeTab === "Kids Menu" && (
                        <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '2rem' }}>
                            <img
                                src="/pics/Kids Menu.png"
                                alt="Kids Menu Illustration"
                                style={{
                                    maxWidth: '500px',
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '20px'
                                }}
                            />
                        </div>
                    )}

                    <CarouselGallery images={MENU_GALLERY_IMAGES} />
                </div>

                <div style={{
                    marginTop: '4rem',
                    padding: '3rem 2rem',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '16px',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(10, 61, 98, 0.2)',
                    marginBottom: '4rem'
                }}>
                    <h2 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>Food for every mood.</h2>
                    <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto 1.5rem', fontWeight: '600', fontSize: '1.1rem' }}>
                        Before placing your order, please inform your server if a person in your party has a food allergy.
                    </p>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontStyle: 'italic' }}>
                        * Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness.
                    </div>
                </div>

                {enlargedImage && (
                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem'
                        }}
                        onClick={() => setEnlargedImage(null)}
                    >
                        <button 
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                zIndex: 10000
                            }}
                            onClick={() => setEnlargedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <img 
                            src={enlargedImage} 
                            alt="Enlarged menu" 
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                objectFit: 'contain'
                            }} 
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
            <style jsx>{`
                .fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .desktop-tabs {
                    display: flex;
                }
                .mobile-tabs {
                    display: none;
                }
                @media (max-width: 768px) {
                    .mobile-zoomable {
                        cursor: pointer;
                    }
                    .kids-banner {
                        background: url("/pics/kids-banner-bg.png") center / 250% auto no-repeat !important;
                    }
                    .desktop-tabs {
                        display: none !important;
                    }
                    .mobile-tabs {
                        display: block;
                        margin-bottom: 3rem;
                        max-width: 400px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            `}</style>
        </div>
    );
}

export default function MenuPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'transparent' }} />}>
            <MenuPageContent />
        </Suspense>
    );
}
