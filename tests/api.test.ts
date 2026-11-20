import { describe, expect, it } from "vitest";
import { GET as articles } from "@/app/api/articles/route";
import { GET as properties } from "@/app/api/properties/route";
import { getAllArticles, getAllTags, getArticleBySlug, getArticlesByTag, getPublishedArticles } from "@/lib/articles";
import { sampleProperties } from "@/lib/sampleData";

describe("JSON routes", () => {
  it("serves the sample properties", async () => {
    const response = await properties();
    expect(await response.json()).toHaveLength(sampleProperties.length);
  });

  it("serves only published articles: the draft guide is not public", async () => {
    expect(getAllArticles().every((article) => !article.published)).toBe(true);
    const response = await articles();
    expect(await response.json()).toEqual([]);
    expect(getPublishedArticles()).toEqual([]);
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
