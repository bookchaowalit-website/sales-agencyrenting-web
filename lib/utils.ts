/**
 * Group digits with commas ("1,234.57"). Unlike a regex over `toString()`,
 * this never inserts separators into the fractional part and never prints
 * exponent notation for large values. Non-finite input renders as an em dash.
 */
export function groupDigits(value: number): string {
    if (!Number.isFinite(value)) return "\u2014";
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

/**
 * Format a listing timestamp as DD/MM/YYYY on the Bangkok calendar (the
 * market these listings belong to), so a UTC-midnight `created_at` shows the
 * same day for every visitor instead of the day before west of UTC.
 */
export function formatListingDate(value: string, timeZone: string = "Asia/Bangkok"): string {
    if (!value) return "";
    const time = Date.parse(value);
    if (Number.isNaN(time)) return value;
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).formatToParts(new Date(time));
    const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
    return `${part("day")}/${part("month")}/${part("year")}`;
}
