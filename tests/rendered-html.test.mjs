import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Amal Engulatov — AI Software Engineer<\/title>/i);
  assert.match(html, /© Amal Engulatov/);
  assert.match(html, /href="\/work"/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/contact"/);
});

for (const [pathname, title] of [
  ["/work", "Projects"],
  ["/about", "About"],
  ["/contact", "Contact"],
]) {
  test(`server-renders the minimal ${title} page`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);

    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title} — Amal Engulatov<\\/title>`, "i"));
    assert.match(html, new RegExp(`<h1[^>]*>[\\s\\S]*${title}[\\s\\S]*<\\/h1>`, "i"));
    assert.match(html, /class="placeholder-page/);
  });
}
