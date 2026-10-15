import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { compactText, filterProperties, parseFilterNumber, sampleProperties, sortProperties } from "../lib/sampleData.ts";
import type { Property } from "../lib/sampleData.ts";

const ids = (properties: Property[]) => properties.map((property) => property.id).sort();

describe("location filter", () => {
  it("matches every location option offered by the search form", () => {
    for (const option of ["bangkok", "phuket", "pattaya", "chiangmai", "huahin", "koh_samui"]) {
      assert.ok(filterProperties(sampleProperties, { location: option }).length > 0, `no results for ${option}`);
    }
  });

  it("does not match unrelated places", () => {
    const phuket = filterProperties(sampleProperties, { location: "phuket" });
    assert.ok(phuket.every((property) => property.location.includes("Phuket")));
  });

  it("normalises punctuation and spacing", () => {
    assert.equal(compactText("Nimmanhaemin, Chiang Mai"), "nimmanhaeminchiangmai");
    assert.equal(compactText("koh_samui"), "kohsamui");
  });
});

describe("numeric and text filters", () => {
  it("treats empty/any/invalid numbers as no filter", () => {
    assert.equal(parseFilterNumber(""), null);
    assert.equal(parseFilterNumber("any"), null);
    assert.equal(parseFilterNumber("abc"), null);
    assert.equal(parseFilterNumber("1,500,000"), 1500000);
  });

  it("applies price, bedroom, and sale-type bounds", () => {
    const result = filterProperties(sampleProperties, { priceMax: "100000", saleType: "rent", bedrooms: "1" });
    assert.ok(result.length > 0);
    assert.ok(result.every((p) => p.price <= 100000 && p.price_type === "rent" && p.bedrooms >= 1));
  });

  it("trims keywords and ignores whitespace-only searches", () => {
    assert.equal(filterProperties(sampleProperties, { keyword: "   " }).length, sampleProperties.length);
    assert.deepEqual(
      ids(filterProperties(sampleProperties, { keyword: "  bangkok " })),
      ids(filterProperties(sampleProperties, { keyword: "bangkok" })),
    );
  });
});

describe("sortProperties", () => {
  it("sorts by price and by listing date, falling back to created_at", () => {
    const byPrice = sortProperties(sampleProperties, "price-asc");
    for (let i = 1; i < byPrice.length; i += 1) assert.ok(byPrice[i - 1].price <= byPrice[i].price);

    const [first, second] = sampleProperties;
    const undated: Property = { ...first, id: "undated", listedDate: undefined, created_at: "2030-01-01T00:00:00Z" };
    const newest = sortProperties([second, undated], "date-new");
    assert.equal(newest[0].id, "undated");
    assert.equal(sortProperties([second, undated], "date-old")[0].id, second.id);
  });

  it("does not mutate the input", () => {
    const copy = [...sampleProperties];
    sortProperties(sampleProperties, "size-desc");
    assert.deepEqual(sampleProperties, copy);
  });
});

describe("listing display helpers", () => {
  it("shows the Bangkok calendar day regardless of the visitor's time zone", async () => {
    const previous = process.env.TZ;
    process.env.TZ = "America/Los_Angeles";
    try {
      const { formatListingDate } = await import("../lib/utils.ts");
      assert.equal(formatListingDate("2024-01-15T00:00:00Z"), "15/01/2024");
      assert.equal(formatListingDate("2024-01-31"), "31/01/2024");
      assert.equal(formatListingDate("not a date"), "not a date");
      assert.equal(formatListingDate(""), "");
    } finally {
      process.env.TZ = previous;
    }
  });

  it("groups digits without touching decimals or printing exponents", async () => {
    const { groupDigits } = await import("../lib/utils.ts");
    assert.equal(groupDigits(15000000), "15,000,000");
    assert.equal(groupDigits(1234.5678), "1,234.57");
    assert.equal(groupDigits(1e21), "1,000,000,000,000,000,000,000");
    assert.equal(groupDigits(Number.NaN), "—");
  });
});

describe("empty listing results", () => {
  it("returns an empty list when search criteria exclude all properties", () => {
    assert.deepEqual(filterProperties(sampleProperties, { keyword: "no-such-listing-8a59d" }), []);
    assert.deepEqual(filterProperties(sampleProperties, { priceMax: "1" }), []);
    assert.deepEqual(filterProperties([], { location: "bangkok" }), []);
  });

  it("sorts empty results without introducing or mutating entries", () => {
    assert.deepEqual(sortProperties([], "price-asc"), []);
    assert.deepEqual(sortProperties([], "date-new"), []);
  });
});
