import { describe, expect, it } from "vitest";
import { GET as articles } from "@/app/api/articles/route";
import { GET as properties } from "@/app/api/properties/route";
import { getAllArticles, getAllTags, getArticleBySlug, getArticlesByTag } from "@/lib/articles";
import { sampleProperties } from "@/lib/sampleData";

describe("JSON routes", () => {
  it("serves the sample properties", async () => {
    const response = await properties();
    expect(await response.json()).toHaveLength(sampleProperties.length);
  });

  it("serves the article files", async () => {
    const response = await articles();
    expect(Array.isArray(await response.json())).toBe(true);
  });
});

describe("article loader", () => {
  it("reads every MDX file, finds one by slug and returns null for a missing one", () => {
    const all = getAllArticles();
    expect(all.length).toBeGreaterThan(0);
    expect(getArticleBySlug(all[0].slug)?.slug).toBe(all[0].slug);
    expect(getArticleBySlug("does-not-exist")).toBeNull();
    expect(Array.isArray(getAllTags())).toBe(true);
    expect(getArticlesByTag("no-such-tag")).toEqual([]);
  });
});
