import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { scrubEvent, sentryOptions } from "../lib/sentry.ts";

// SPEC-001 AC-03/AC-04: Sentry reports errors only and never ships visitor data.
describe("sentryOptions", () => {
  it("stays disabled when no DSN is configured", () => {
    assert.equal(sentryOptions(undefined).enabled, false);
    assert.equal(sentryOptions("").enabled, false);
  });

  it("reports errors only: no PII, tracing, trace headers, breadcrumbs or transactions", () => {
    const options = sentryOptions("https://key@o0.ingest.sentry.io/1");
    assert.equal(options.enabled, true);
    assert.equal(options.sendDefaultPii, false);
    assert.equal(options.tracesSampleRate, undefined);
    assert.deepEqual(options.tracePropagationTargets, []);
    assert.equal(options.maxBreadcrumbs, 0);
    assert.equal(options.beforeSendTransaction(), null);
    assert.equal(options.beforeSend, scrubEvent);
  });
});

describe("scrubEvent", () => {
  it("drops request data, user, breadcrumbs and extra context but keeps the error", () => {
    const event = scrubEvent({
      message: "boom",
      request: { url: "https://agencyrenting.bookchaowalit.com/en/contact?email=a@b.c", headers: { cookie: "a=b" } },
      user: { ip_address: "1.2.3.4", email: "x@example.com" },
      breadcrumbs: [{ message: "typed phone number" }],
      extra: { body: "name=Somchai&phone=0812345678" },
    });
    assert.equal(event.message, "boom");
    for (const key of ["request", "user", "breadcrumbs", "extra"]) assert.equal(key in event, false, key);
  });

  it("drops the request path that captureRequestError adds and strips query strings", () => {
    const event = scrubEvent({
      transaction: "GET /en/listings?location=private&maxPrice=1",
      tags: { url: "https://agencyrenting.bookchaowalit.com/en/listings?location=private", route: "/en/listings?location=private" },
      contexts: {
        nextjs: { request_path: "/en/listings?location=private", router_kind: "App Router", route_type: "render" },
        trace: { trace_id: "t" },
        runtime: { name: "node" },
      },
    });
    assert.equal(event.transaction, "GET /en/listings");
    assert.deepEqual(event.tags, { route: "/en/listings" });
    assert.deepEqual(event.contexts, { runtime: { name: "node" } });
    assert.equal(JSON.stringify(event).includes("private"), false);
  });

  it("removes local variables from every stack frame", () => {
    const event = scrubEvent({
      exception: {
        values: [
          { stacktrace: { frames: [{ function: "submit", vars: { phone: "0812345678" } }, { function: "g", vars: { q: "x" } }] } },
          {},
        ],
      },
    });
    const frames = event.exception?.values?.[0]?.stacktrace?.frames ?? [];
    assert.equal(frames.length, 2);
    assert.ok(frames.every((frame) => !("vars" in frame)));
  });
});
