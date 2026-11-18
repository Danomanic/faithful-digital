import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function crawl(page: Page) {
  const seen = new Set<string>(["/"]);
  const queue = ["/"];
  const broken: string[] = [];
  while (queue.length > 0) {
    const path = queue.shift() as string;
    if (/\.(pdf|docx)$/.test(path)) {
      const download = await page.request.get(path);
      if (!download.ok()) broken.push(`${path}: ${download.status()}`);
      continue;
    }
    const response = await page.goto(path);
    if (!response?.ok()) {
      broken.push(`${path}: ${response?.status()}`);
      continue;
    }
    const links = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors.map((anchor) => (anchor as HTMLAnchorElement).href),
    );
    for (const link of links) {
      const url = new URL(link);
      if (url.origin === new URL(page.url()).origin && !seen.has(url.pathname)) {
        seen.add(url.pathname);
        queue.push(url.pathname);
      }
    }
  }
  return { pages: [...seen].filter((path) => !/\.(pdf|docx)$/.test(path)), broken };
}

test("all internal links work, and every page passes axe at desktop and mobile widths", async ({ page }) => {
  test.setTimeout(180_000);
  const { pages, broken } = await crawl(page);
  expect(broken).toEqual([]);
  expect(pages.length).toBeGreaterThanOrEqual(30);

  const violations: string[] = [];
  for (const width of [1280, 320]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of pages) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
      for (const violation of results.violations) {
        violations.push(`${width}px ${path}: ${violation.id} (${violation.nodes.map((n) => n.target.join(" ")).join(", ")})`);
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) violations.push(`${width}px ${path}: page scrolls sideways by ${overflow}px`);
    }
  }
  expect(violations).toEqual([]);
});

test("every page has one h1, a unique title and a main landmark", async ({ page }) => {
  const { pages } = await crawl(page);
  const titles = new Map<string, string>();
  for (const path of pages) {
    await page.goto(path);
    await expect(page.locator("h1"), path).toHaveCount(1);
    await expect(page.locator("main#main-content"), path).toHaveCount(1);
    titles.set(path, await page.title());
  }
  expect(new Set(titles.values()).size, JSON.stringify([...titles])).toBe(pages.length);
});

test("the skip link is the first focusable element and moves to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});

test("the focus ring uses the two-tone style", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const styles = await page.evaluate(() => {
    const computed = getComputedStyle(document.activeElement as Element);
    return { outline: computed.outlineColor, shadow: computed.boxShadow };
  });
  expect(styles.outline).toBe("rgb(242, 183, 5)");
  expect(styles.shadow).toContain("rgb(28, 27, 26)");
});

// Answers the health check with the option at the given position for every question.
async function answerHealthCheck(page: Page, pick: (index: number) => string) {
  for (let index = 0; ; index += 1) {
    const heading = page.getByRole("heading", { level: 1 });
    if ((await heading.textContent()) === "Check your answers") return;
    await page.getByLabel(pick(index), { exact: true }).check();
    await page.getByRole("button", { name: "Continue" }).click();
  }
}

test("the health check handles errors and changes, keeps answers in the browser, and shows results", async ({ page }) => {
  const outgoing: string[] = [];
  await page.goto("/health-check/questions/");
  await page.waitForLoadState("networkidle");
  page.on("request", (request) => {
    if (request.method() !== "GET") outgoing.push(`${request.method()} ${request.url()}`);
    else if (new URL(request.url()).origin !== new URL(page.url()).origin) outgoing.push(request.url());
  });

  // An empty answer shows a focused error summary and an error page title.
  await expect(page.getByText("Question 1 of 11")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "There is a problem" })).toBeVisible();
  await expect(page.locator(".fd-error-summary")).toBeFocused();
  await expect(page).toHaveTitle(/^Error: /);

  // Answering moves focus to the next question's heading.
  await page.getByLabel("Yes", { exact: true }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /stepped down tomorrow/ })).toBeFocused();
  await expect(page.locator(".fd-error-summary")).toHaveCount(0);

  // Going back keeps the answer.
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByLabel("Yes", { exact: true })).toBeChecked();
  await page.getByRole("button", { name: "Continue" }).click();

  // Answer the rest with "Not sure", the last option on most questions.
  await answerHealthCheck(page, () => "Not sure");
  await expect(page.getByRole("heading", { level: 1, name: "Check your answers" })).toBeFocused();

  // Changing an answer returns to check answers.
  await page.getByRole("button", { name: /Change ai rules/ }).click();
  await page.getByLabel("Yes, and it's written down").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Check your answers" })).toBeVisible();
  await expect(page.getByText("Yes, and it's written down")).toBeVisible();

  await page.getByRole("button", { name: "See your results" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Your digital health check results" })).toBeFocused();
  await expect(page.locator("#ai-heading")).toBeVisible();
  await expect(page.locator("section", { has: page.locator("#ai-heading") }).getByText("Good foundations")).toBeVisible();
  await expect(page.locator("section", { has: page.locator("#accounts-heading") }).getByText("Needs attention")).toBeVisible();
  await expect(page.getByRole("link", { name: "Set up accounts and logins" })).toBeVisible();
  expect(outgoing).toEqual([]);

  const axe = await new AxeBuilder({ page }).analyze();
  expect(axe.violations.map((violation) => violation.id)).toEqual([]);
});

test("the health check can be completed using only a keyboard", async ({ page }) => {
  await page.goto("/health-check/questions/");
  await page.waitForLoadState("networkidle");

  async function tabTo(locator: ReturnType<Page["locator"]>) {
    for (let presses = 0; presses < 25; presses += 1) {
      await page.keyboard.press("Tab");
      if (await locator.evaluate((element) => element === document.activeElement)) return;
    }
    throw new Error("Could not reach the control with the Tab key");
  }

  for (let index = 0; index < 11; index += 1) {
    // Tab moves into the radio group once, then the arrow keys choose an option. "Not sure" is always last.
    await tabTo(page.locator("input[type=radio]").first());
    await page.keyboard.press("ArrowUp");
    await expect(page.getByLabel("Not sure", { exact: true })).toBeChecked();
    await tabTo(page.getByRole("button", { name: "Continue" }));
    await page.keyboard.press("Enter");
  }
  await expect(page.getByRole("heading", { level: 1, name: "Check your answers" })).toBeFocused();
  await tabTo(page.getByRole("button", { name: "See your results" }));
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1, name: "Your digital health check results" })).toBeFocused();
});

test("the tool finder suggests only tools that fit, with reasons", async ({ page }) => {
  await page.goto("/tool-finder/questions/");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Websites", { exact: true }).check();
  await page.getByLabel("Church management systems", { exact: true }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Fewer than 100").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Nothing, we need free options").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Yes", { exact: true }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("No", { exact: true }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "See suggested tools" }).click();

  await expect(page.getByRole("heading", { level: 1, name: "Tools that could suit your church" })).toBeVisible();
  const websites = page.locator("section", { has: page.locator("#websites-heading") });
  await expect(websites.getByRole("link", { name: "A Church Near You" })).toBeVisible();
  await expect(websites.getByText("Available to Church of England churches")).toBeVisible();
  await expect(websites.getByRole("link", { name: "Squarespace" })).toHaveCount(0);
  const management = page.locator("section", { has: page.locator("#church-management-heading") });
  await expect(management.getByRole("link", { name: "Planning Center" })).toBeVisible();
  await expect(management.getByRole("link", { name: "ChurchDesk" })).toHaveCount(0);

  const axe = await new AxeBuilder({ page }).analyze();
  expect(axe.violations.map((violation) => violation.id)).toEqual([]);
});

test("the printable health check has every question and a scoring table", async ({ page }) => {
  await page.goto("/health-check/print/");
  await expect(page.locator(".fd-print-question")).toHaveCount(11);
  await expect(page.getByRole("table")).toContainText("Leadership and roles");
  await expect(page.getByRole("table")).toContainText("3 to 4");
});

test("single-column pages line up with the header", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const path of ["/about/", "/privacy/", "/accessibility/", "/how-we-built-this/", "/health-check/questions/"]) {
    await page.goto(path);
    const brand = await page.locator(".fd-header__brand").boundingBox();
    const heading = await page.locator("h1").boundingBox();
    expect(heading?.x, path).toBe(brand?.x);
  }
});

test("tabs work with arrow keys", async ({ page }) => {
  await page.goto("/guidance/trustee-responsibilities/");
  const scotland = page.getByRole("tab", { name: "Scotland" });
  await page.getByRole("tab", { name: "England and Wales" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(scotland).toBeFocused();
  await expect(scotland).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("OSCR");
});

test("headings in guidance have anchors that other pages can link to", async ({ page }) => {
  await page.goto("/guidance/trustee-responsibilities/#getting-charity-discounts");
  await expect(page.locator("h2#getting-charity-discounts")).toHaveText("Getting charity discounts");
  await page.goto("/guidance/safeguarding-online/");
  await expect(page.locator("h2#livestreams-and-recordings")).toBeVisible();
});

test("the printable blueprint includes every guidance page and the roadmap, with no hidden content", async ({ page }) => {
  await page.goto("/guidance/");
  const titles = await page.locator("main section li a").allTextContents();
  expect(titles.length).toBeGreaterThanOrEqual(20);
  await page.goto("/paper/");
  for (const title of [...titles, "A 12-month digital roadmap"]) {
    await expect(page.getByRole("heading", { level: 2, name: title, exact: true })).toBeVisible();
  }
  await expect(page.locator("main details, main [role=tablist]")).toHaveCount(0);
  await expect(page.getByText("Charities in Northern Ireland").first()).toBeVisible();
  const internal = await page.locator("main a[href^='/guidance/'], main a[href='/roadmap/']").count();
  expect(internal, "links in the printable blueprint should point within the document").toBe(0);
});

test("the PDF blueprint is available", async ({ request }) => {
  const response = await request.get("/faithful-digital-blueprint.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toBe("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("each comparison lists its tools, explains gaps and shows when facts were checked", async ({ page }) => {
  await page.goto("/compare/");
  const categories = await page.locator("main h2 a").evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).pathname));
  expect(categories.length).toBe(5);
  for (const path of categories) {
    await page.goto(path);
    await expect(page.getByText("don't give overall scores")).toBeVisible();
    const rows = page.locator("table tbody tr");
    expect(await rows.count(), path).toBeGreaterThanOrEqual(2);
    expect(await page.locator("section.fd-tool[id]").count(), path).toBe(await rows.count());
    await expect(page.locator("section.fd-tool[id]").first().getByText(/^Last checked \d/)).toBeVisible();
    await expect(page.locator("table tbody td").filter({ hasText: /\.\s\S/ }), `${path}: glance cells should be short`).toHaveCount(0);
  }
  await page.goto("/compare/accounting/");
  await expect(page.getByRole("heading", { name: "Not checked yet" })).toBeVisible();
  await expect(page.locator("table").getByText("Sage Accounting")).toHaveCount(0);
  await page.goto("/compare/websites/");
  await expect(page.locator("#a-church-near-you").getByText("For Church of England churches only")).toBeVisible();
});

test("every template page offers a Word download that works", async ({ page, request }) => {
  await page.goto("/templates/");
  const links = await page.locator("main h2 a").evaluateAll((anchors) => anchors.map((a) => (a as HTMLAnchorElement).pathname));
  expect(links).toHaveLength(6);
  for (const path of links) {
    await page.goto(path);
    const download = page.getByRole("link", { name: /^Download the .* template$/ });
    await expect(download).toBeVisible();
    await expect(page.getByText(/\(Word document, \d+ KB\)/)).toBeVisible();
    const href = await download.getAttribute("href");
    const response = await request.get(href as string);
    expect(response.ok(), href as string).toBe(true);
    expect(response.headers()["content-type"]).toContain("wordprocessingml");
    expect((await response.body()).subarray(0, 2).toString()).toBe("PK");
  }
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("guidance can be read, and details and tabs still show their content", async ({ page }) => {
    await page.goto("/guidance/accounts-and-logins/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Set up accounts and logins");
    await expect(page.getByText("Don't share logins.")).toBeVisible();
    await page.getByText("What to do if a service only allows one login").click();
    await expect(page.getByText("Keep the login in a password manager")).toBeVisible();

    await page.goto("/guidance/trustee-responsibilities/");
    await expect(page.getByText("The Scottish Charity Regulator (OSCR) regulates charities in Scotland")).toBeVisible();
    await expect(page.getByText("The Charity Commission for Northern Ireland (CCNI) regulates")).toBeVisible();

    await page.goto("/health-check/questions/");
    await expect(page.getByRole("link", { name: "use the printable health check" })).toBeVisible();
  });
});
