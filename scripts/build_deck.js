// scripts/build_deck.js
// Auto-generates a capstone PPTX from exported Tableau dashboard PNGs.

const fs = require("fs");
const path = require("path");
const PptxGen = require("pptxgenjs");

function mustExist(p) {
  if (!fs.existsSync(p)) {
    throw new Error(`Missing file: ${p}`);
  }
}

function firstExisting(paths) {
  for (const p of paths) if (fs.existsSync(p)) return p;
  return null;
}

const repoRoot = process.cwd();
const imgDir = path.join(repoRoot, "exports", "dashboard_png");

// Dashboard 1 filename in your repo might be d2_funnel_overview.png (as per your commit log),
// but we also check d1_funnel_overview.png just in case.
const d1 = firstExisting([
  path.join(imgDir, "d1_funnel_overview.png"),
  path.join(imgDir, "d2_funnel_overview.png"),
]);
const d2 = path.join(imgDir, "d2_category_revenue.png");
const d3 = path.join(imgDir, "d3_timing_patterns.png");

if (!d1) throw new Error("Could not find Dashboard 1 image (d1_funnel_overview.png or d2_funnel_overview.png).");
mustExist(d2);
mustExist(d3);

const outDir = path.join(repoRoot, "exports", "slides");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "capstone_clickstream_deck.pptx");

const pptx = new PptxGen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Jordan";
pptx.company = "Google Data Analytics Capstone";
pptx.subject = "E-Commerce Clickstream Funnel Analysis";

const W = 13.333;
const H = 7.5;

function addTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.75, y: 0.55, w: W - 1.5, h: 0.8,
    fontFace: "Calibri", fontSize: 34, bold: true, color: "1F2937",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.75, y: 1.25, w: W - 1.5, h: 0.6,
      fontFace: "Calibri", fontSize: 16, color: "374151",
    });
  }
}

function addBullets(slide, title, bullets) {
  slide.addText(title, {
    x: 0.75, y: 1.3, w: W - 1.5, h: 0.5,
    fontFace: "Calibri", fontSize: 22, bold: true, color: "111827",
  });

  slide.addText(bullets.map(b => `• ${b}`).join("\n"), {
    x: 1.05, y: 1.9, w: W - 2.1, h: H - 2.6,
    fontFace: "Calibri", fontSize: 16, color: "111827",
    lineSpacingMultiple: 1.2,
  });
}

function addDashboardSlide(title, subtitle, imgPath) {
  const slide = pptx.addSlide();
  addTitle(slide, title, subtitle);
  // Image area
  slide.addImage({
    path: imgPath,
    x: 0.6, y: 1.8, w: W - 1.2, h: H - 2.4,
  });
}

// Slide 1: Title
{
  const slide = pptx.addSlide();
  addTitle(
    slide,
    "Optimizing E-Commerce Conversion Through Clickstream Funnel Analysis",
    "Capstone case study • Kaggle multi-category store (Nov 2019) • Owner: Jordan"
  );
  slide.addText("Dashboards: Funnel • Category/Revenue • Timing", {
    x: 0.75, y: 2.15, w: W - 1.5, h: 0.6,
    fontFace: "Calibri", fontSize: 18, color: "374151",
  });
  slide.addText("Method: descriptive + diagnostic analytics (no ML)", {
    x: 0.75, y: 2.65, w: W - 1.5, h: 0.6,
    fontFace: "Calibri", fontSize: 18, color: "374151",
  });
}

// Slide 2: Ask & Scope
{
  const slide = pptx.addSlide();
  addBullets(slide, "Ask & Scope", [
    "Business task: identify funnel drop-offs and diagnose drivers of conversion and revenue",
    "Scope: Nov 2019 only; event-level funnel (view → cart → purchase)",
    "Constraints: no session stitching; conversion rates are event-based proxies",
    "Deliverables: 3 dashboards + recommendations"
  ]);
}

// Slide 3: Dataset & Assumptions
{
  const slide = pptx.addSlide();
  addBullets(slide, "Dataset & Key Assumptions", [
    "Source: Kaggle “Ecommerce Behavior Data from Multi-Category Store”",
    "Fields used: event_type, event_time, category_code, price, user identifiers",
    "Revenue proxy: sum(price) on purchase events",
    "Conversion proxy: purchases/views, carts/views, purchases/carts (not session-based)"
  ]);
}

// Slide 4: Dashboard 1 (Funnel)
addDashboardSlide(
  "Dashboard 1 — Funnel Overview",
  "What’s happening across the funnel (volume, proxy conversion, daily trend)",
  d1
);

// Slide 5: Funnel insights
{
  const slide = pptx.addSlide();
  addBullets(slide, "Key Funnel Insights", [
    "Primary friction point is View → Cart (largest drop-off)",
    "Cart → Purchase is relatively strong (high intent once carted)",
    "Mid-month spike suggests promotion/tracking anomaly worth annotating in reporting",
    "Recommendation focus: improve add-to-cart drivers (PDP clarity, trust, shipping/returns visibility)"
  ]);
}

// Slide 6: Dashboard 2 (Category/Revenue)
addDashboardSlide(
  "Dashboard 2 — Category & Revenue Performance",
  "Which categories drive revenue and how conversion varies across high-traffic categories",
  d2
);

// Slide 7: Category insights
{
  const slide = pptx.addSlide();
  addBullets(slide, "Key Category Insights", [
    "Revenue is highly concentrated in the top categories (Top 5 share is very high)",
    "Protect and optimize the highest-revenue categories (availability, pricing, merchandising)",
    "Target high-view / lower-conversion categories for PDP + offer experiments",
    "Monitor concentration risk and diversify revenue drivers over time"
  ]);
}

// Slide 8: Dashboard 3 (Timing)
addDashboardSlide(
  "Dashboard 3 — Timing Patterns",
  "When purchases and revenue occur (hour-of-day × day-of-week)",
  d3
);

// Slide 9: Timing insights
{
  const slide = pptx.addSlide();
  addBullets(slide, "Key Timing Insights", [
    "Purchases and revenue peak in morning-to-midday hours (strongest window around ~9–11)",
    "Weekends show stronger midday intensity versus weekdays",
    "Execution: time promos, email, and paid spend to match high-intent windows",
    "Ops: ensure inventory/service readiness during peak windows"
  ]);
}

// Slide 10: Recommendations & measurement
{
  const slide = pptx.addSlide();
  addBullets(slide, "Recommendations & Measurement Plan", [
    "Improve View → Cart: PDP/CTA clarity, trust signals, shipping/returns transparency, better filters/search",
    "Category focus: scale top revenue categories; optimize high-traffic low-conversion categories",
    "Timing execution: schedule campaigns around peak hours and weekends",
    "Track weekly: proxy conversion rates, revenue by category + top-5 share, purchases/revenue by hour/day"
  ]);
}

pptx.writeFile({ fileName: outPath });
console.log(`Wrote PPTX: ${outPath}`);