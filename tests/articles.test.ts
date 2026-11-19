import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { countWords, makeExcerpt, readingMinutes } from "../lib/articles.ts";

describe("article reading time", () => {
  it("counts Thai words even though Thai has no spaces between words", () => {
    const thai = "บ้านหลังนี้สวยมากราคาดีใกล้รถไฟฟ้า ";
    // The old `split(/\s+/)` counted this whole phrase (plus a trailing empty string) as 2 words.
    assert.ok(countWords(thai) >= 6, `expected several words, got ${countWords(thai)}`);
    assert.equal(readingMinutes("บ้านสวย".repeat(150)), 2);
  });

  it("ignores leading/trailing whitespace and never reports zero minutes", () => {
    assert.equal(countWords("  hello world  "), 2);
    assert.equal(readingMinutes(""), 1);
  });
});

describe("article excerpt", () => {
  it("does not append an ellipsis to short content", () => {
    assert.equal(makeExcerpt("Short intro."), "Short intro.");
  });

  it("never splits an emoji or a Thai combining mark at the cut", () => {
    const excerpt = makeExcerpt(`${"a".repeat(149)}👨‍👩‍👧 rest`);
    assert.equal(excerpt, `${"a".repeat(149)}👨‍👩‍👧...`);
    assert.equal(makeExcerpt("ที่ดีมาก", 2), "ที่ดี...");
  });

  it("flattens lone CR and U+2028 line breaks", () => {
    assert.equal(makeExcerpt("one\rtwo three\r\nfour"), "one two three four");
  });
});
