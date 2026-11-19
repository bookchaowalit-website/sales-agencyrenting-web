import type { Property } from "./sampleData";

export const LOCALES = ["en", "th"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type Mode = "all" | "rent" | "sale";
export const MODES: readonly Mode[] = ["all", "rent", "sale"];

/** Reads the ?mode= parameter; anything unknown means "all", so a chip is never built from raw input. */
export function parseMode(value: string | undefined): Mode {
  return value === "rent" || value === "sale" ? value : "all";
}

/** Every visible string, in both languages. Nothing here claims a team, an office, years or results. */
export const COPY = {
  en: {
    tagline: "Sample property desk",
    nav: { listings: "Listings", guides: "Guides", about: "About", contact: "Contact", other: "ไทย", otherLabel: "อ่านเป็นภาษาไทย" },
    homeEyebrow: "Thailand · sample inventory",
    homeTitle: "Find the address that fits your next chapter.",
    homeLede: "A calm property desk demo for Thailand: browse sample condos, houses and land for rent or sale, read the facts first, then decide what to ask.",
    browse: "Browse all listings",
    howItWorks: "How this desk works",
    picks: "Front-of-desk picks",
    picksNote: "Three sample listings the desk features first.",
    listingsTitle: "Property Listings",
    listingsLede: "Every sample listing on the desk. Search by city, project or type, and narrow to rent or sale.",
    modes: { all: "All", rent: "For rent", sale: "For sale" },
    modeLabel: "Rent or sale",
    searchLabel: "Search listings",
    searchPlaceholder: "City, project or type",
    search: "Search",
    clear: "Clear",
    count: (shown: number, total: number, narrowed: boolean) => (narrowed ? `Showing ${shown} of ${total} listings` : `${total} listings`),
    emptyTitle: "No listings match",
    emptyBody: "No sample listing matches this search. Clear the filters to see every listing again.",
    clearFilters: "Clear filters",
    back: "All listings",
    sampleNote: "Sample listing for a design demo. It is not a real property for rent or sale.",
    features: "Features",
    nearby: "Nearby",
    beds: (n: number) => `${n} ${n === 1 ? "bedroom" : "bedrooms"}`,
    baths: (n: number) => `${n} ${n === 1 ? "bathroom" : "bathrooms"}`,
    size: (n: number) => `${n} sq m`,
    listed: "Listed",
    previous: "Previous listing",
    next: "Next listing",
    pager: "More listings",
    perMonth: "/month",
    types: { condo: "Condo", villa: "Villa", townhouse: "Townhouse", house: "House", commercial: "Commercial", apartment: "Apartment", land: "Land" } as Record<string, string>,
    guidesTitle: "Guides",
    guidesLede: "Notes on renting and buying property in Thailand.",
    guidesEmptyTitle: "No guides published yet",
    guidesEmptyBody: "A draft market guide exists, but it stays unpublished until its figures have sources.",
    aboutTitle: "About this desk",
    aboutLede: "Agency Renting is a bilingual design demo of a property desk for Thailand, built by Bookchaowalit.",
    aboutBody: [
      "The listings are sample data that ship with the site: eight condos, houses, villas, commercial space and land across Bangkok, Phuket, Chiang Mai, Hua Hin, Pattaya and Koh Samui. Photos come from Unsplash.",
      "There is no brokerage, licence, agent team or office behind it. Nothing is for rent or sale, and no enquiry reaches anyone.",
      "The desk shows the facts a renter or buyer checks first: price, rent or sale, size, rooms and location, in English and Thai.",
    ],
    contactTitle: "Contact",
    contactLede: "This desk is a demo, so there is no agent, phone line or inbox to reach.",
    contactBody: "To talk about the project itself, or about building something like it, use the contact links on the Bookchaowalit portfolio.",
    contactCta: "Go to bookchaowalit.com",
    footNote: "Sample listings for a design demo. Nothing is for rent or sale.",
  },
  th: {
    tagline: "โต๊ะอสังหาฯ ตัวอย่าง",
    nav: { listings: "รายการ", guides: "บทความ", about: "เกี่ยวกับ", contact: "ติดต่อ", other: "English", otherLabel: "Read in English" },
    homeEyebrow: "ประเทศไทย · รายการตัวอย่าง",
    homeTitle: "หาที่อยู่ที่พอดีกับบทต่อไปของคุณ",
    homeLede: "เดโมโต๊ะอสังหาฯ ในไทยแบบเรียบง่าย ดูคอนโด บ้าน และที่ดินตัวอย่างทั้งเช่าและขาย อ่านข้อมูลสำคัญก่อน แล้วค่อยตัดสินใจว่าจะถามอะไร",
    browse: "ดูรายการทั้งหมด",
    howItWorks: "โต๊ะนี้ทำงานอย่างไร",
    picks: "รายการที่โต๊ะแนะนำ",
    picksNote: "รายการตัวอย่างสามรายการที่โต๊ะแสดงก่อน",
    listingsTitle: "รายการอสังหาริมทรัพย์",
    listingsLede: "รายการตัวอย่างทั้งหมดบนโต๊ะ ค้นหาด้วยเมือง โครงการ หรือประเภท แล้วเลือกเช่าหรือขาย",
    modes: { all: "ทั้งหมด", rent: "เช่า", sale: "ขาย" },
    modeLabel: "เช่าหรือขาย",
    searchLabel: "ค้นหารายการ",
    searchPlaceholder: "เมือง โครงการ หรือประเภท",
    search: "ค้นหา",
    clear: "ล้าง",
    count: (shown: number, total: number, narrowed: boolean) => (narrowed ? `แสดง ${shown} จาก ${total} รายการ` : `${total} รายการ`),
    emptyTitle: "ไม่พบรายการที่ตรงกัน",
    emptyBody: "ไม่มีรายการตัวอย่างที่ตรงกับการค้นหานี้ ล้างตัวกรองเพื่อดูรายการทั้งหมดอีกครั้ง",
    clearFilters: "ล้างตัวกรอง",
    back: "รายการทั้งหมด",
    sampleNote: "รายการตัวอย่างสำหรับเดโมการออกแบบ ไม่ใช่อสังหาฯ ที่ให้เช่าหรือขายจริง",
    features: "จุดเด่น",
    nearby: "สถานที่ใกล้เคียง",
    beds: (n: number) => `${n} ห้องนอน`,
    baths: (n: number) => `${n} ห้องน้ำ`,
    size: (n: number) => `${n} ตร.ม.`,
    listed: "ลงประกาศ",
    previous: "รายการก่อนหน้า",
    next: "รายการถัดไป",
    pager: "รายการอื่น",
    perMonth: "/เดือน",
    types: { condo: "คอนโด", villa: "วิลล่า", townhouse: "ทาวน์เฮาส์", house: "บ้าน", commercial: "พื้นที่พาณิชย์", apartment: "อพาร์ตเมนต์", land: "ที่ดิน" } as Record<string, string>,
    guidesTitle: "บทความ",
    guidesLede: "บันทึกเรื่องการเช่าและซื้ออสังหาฯ ในไทย",
    guidesEmptyTitle: "ยังไม่มีบทความที่เผยแพร่",
    guidesEmptyBody: "มีร่างบทความเรื่องตลาดอยู่ แต่จะยังไม่เผยแพร่จนกว่าตัวเลขในบทความจะมีแหล่งอ้างอิง",
    aboutTitle: "เกี่ยวกับโต๊ะนี้",
    aboutLede: "Agency Renting คือเดโมการออกแบบโต๊ะอสังหาฯ สองภาษาสำหรับประเทศไทย สร้างโดย Bookchaowalit",
    aboutBody: [
      "รายการทั้งหมดเป็นข้อมูลตัวอย่างที่มากับเว็บ มีแปดรายการ ทั้งคอนโด บ้าน วิลล่า พื้นที่พาณิชย์ และที่ดิน ในกรุงเทพฯ ภูเก็ต เชียงใหม่ หัวหิน พัทยา และเกาะสมุย ภาพประกอบมาจาก Unsplash",
      "ไม่มีบริษัทนายหน้า ใบอนุญาต ทีมเอเจนต์ หรือสำนักงานอยู่เบื้องหลัง ไม่มีอะไรให้เช่าหรือขายจริง และไม่มีคำถามใดส่งถึงใคร",
      "โต๊ะนี้แสดงข้อมูลที่ผู้เช่าหรือผู้ซื้อดูเป็นอย่างแรก ได้แก่ ราคา เช่าหรือขาย ขนาด จำนวนห้อง และทำเล ทั้งภาษาไทยและอังกฤษ",
    ],
    contactTitle: "ติดต่อ",
    contactLede: "โต๊ะนี้เป็นเดโม จึงไม่มีเอเจนต์ เบอร์โทร หรืออีเมลให้ติดต่อ",
    contactBody: "ถ้าอยากคุยเรื่องโปรเจกต์นี้ หรือเรื่องการสร้างงานแบบนี้ ใช้ช่องทางติดต่อบนพอร์ตโฟลิโอ Bookchaowalit",
    contactCta: "ไปที่ bookchaowalit.com",
    footNote: "รายการตัวอย่างสำหรับเดโมการออกแบบ ไม่มีอะไรให้เช่าหรือขายจริง",
  },
} as const;

export type Copy = (typeof COPY)[Locale];

export function money(property: Property, locale: Locale): string {
  const amount = new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(property.price);
  return `฿${amount}${property.price_type === "rent" ? COPY[locale].perMonth : ""}`;
}

export function typeLabel(type: string, locale: Locale): string {
  return COPY[locale].types[type] ?? type.replace(/^./, (letter) => letter.toUpperCase());
}

/** The words a search matches against: English data plus the Thai type name, so a Thai query finds "คอนโด". */
export function searchFields(property: Property): string[] {
  return [property.title, property.location, property.property_type, COPY.th.types[property.property_type] ?? "", property.description];
}
