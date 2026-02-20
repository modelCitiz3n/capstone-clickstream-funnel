# Optimizing E-Commerce Conversion Through Clickstream Funnel Analysis
**Google Data Analytics Capstone — Clickstream Funnel Case Study**  
**Owner:** Jordan

## Executive Summary
This project uses clickstream event data from a multi-category e-commerce store to understand **where users drop off in the funnel**, **what drives revenue**, and **when purchase behavior is most likely to occur**. The outcome is a focused, business-oriented set of dashboards and recommendations designed to improve **conversion rate** and **revenue efficiency**.

**What I delivered**
- **3 Tableau dashboards** (Funnel, Category & Revenue, Timing Patterns)
- **Slide deck** summarizing insights + recommendations
- Supporting documentation: **project charter, metrics dictionary, decisions log**, and dataset prep notes

---

## Business Problem
E-commerce growth depends on two core levers:
1) **Conversion:** getting more users from browsing to purchasing  
2) **Revenue efficiency:** understanding which categories and price bands actually contribute to revenue

This analysis answers:
- Where do users drop off in the funnel (view → cart → purchase)?
- Which categories and price ranges drive revenue vs. just traffic?
- Are there clear timing patterns that could inform promotions or spend?

---

## Dataset
**Source:** Kaggle — *Ecommerce Behavior Data from Multi-Category Store*  
**Core fields used:**
- `event_type` (view, cart, purchase)
- `product_id`
- `category`
- `price`
- `user_id`
- `event_time`

> The raw dataset is not stored in this repo.

---

## Constraints (kept intentionally small)
This is an academic capstone and designed to be finishable quickly:
- Descriptive + diagnostic analytics only (**no ML/predictive modeling**)
- No scraping, no external APIs, no engineering build-out
- Max **3 dashboards** and ~**10–12 slides**
- Structured process: Ask → Prepare → Process → Analyze → Share → Act

---

## Repo Map
- `/docs` — project charter, dataset prep, metrics dictionary, storyboard, decisions log
- `/tableau` — Tableau workbook(s) and notes
- `/exports` — dashboard exports (PNG/PDF)
- `/slides` — slide storyboard + final deck assets
- `/scripts` — lightweight helper scripts used to generate Tableau inputs (if applicable)

---

## Deliverables
### Dashboards (Tableau)
All dashboard exports live in: **`/exports`**
- Funnel Overview
- Category & Revenue Performance
- Timing Patterns

### Slide Deck
Presentation materials live in: **`/slides`**

### Documentation
Supporting docs live in: **`/docs`**
- Metrics dictionary (definitions for conversion and revenue metrics)
- Dataset preparation notes (how raw data was shaped for analysis)
- Decisions log (scope guardrails + key choices)
- Dashboard storyboard (what each dashboard is meant to answer)

---

## Results (Dashboards + Key Takeaways)

> **To enable README image previews**, export your dashboards as PNG into `/exports` and use these filenames:
> - `exports/dashboard_1_funnel_overview.png`
> - `exports/dashboard_2_category_revenue.png`
> - `exports/dashboard_3_timing_patterns.png`
>
> If your filenames differ, update the 3 image links below.

### 1) Funnel Overview (View → Cart → Purchase)
![Funnel Overview](exports/dashboard_1_funnel_overview.png)

**What this dashboard shows**
- Total events by stage (views, carts, purchases)
- Conversion rates between stages
- Where the largest drop-off occurs

**Key insights (high level)**
- The funnel highlights a clear point of friction where users stop progressing.
- This suggests the biggest opportunity is improving the **step immediately before the largest drop** (product experience, pricing clarity, trust signals, etc.).
- Purchase behavior is meaningfully smaller than browse behavior, reinforcing the importance of funnel optimization over pure traffic growth.

---

### 2) Category & Revenue Performance
![Category & Revenue](exports/dashboard_2_category_revenue.png)

**What this dashboard shows**
- Category mix by engagement and purchases
- Revenue concentration by category
- Price-band contribution (revenue vs. volume)

**Key insights (high level)**
- Revenue is typically concentrated in a smaller set of categories compared with browsing activity.
- Some categories drive attention but do not convert proportionally, implying mismatch in **product-market fit**, **pricing**, or **merchandising**.
- Price-band analysis clarifies whether revenue is driven by **high volume/low price** or **lower volume/higher price** behavior.

---

### 3) Timing Patterns (When users buy)
![Timing Patterns](exports/dashboard_3_timing_patterns.png)

**What this dashboard shows**
- Purchases by time of day / day of week (or comparable time buckets)
- Differences between browsing and purchase timing

**Key insights (high level)**
- Purchases cluster into specific time windows, which can inform marketing cadence.
- The “browse vs buy” timing gap suggests opportunities for:
  - Retargeting
  - Timed offers
  - Email/push scheduling aligned to purchase-intent periods

---

## Recommendations (Actionable)
These recommendations map directly to the three dashboards.

1) **Fix the biggest funnel drop-off first**
   - Improve the step before the largest drop (typically product detail → add-to-cart).
   - Focus on clarity: pricing, shipping expectations, return policy, trust signals, and product info completeness.

2) **Prioritize categories that drive revenue, not just traffic**
   - Invest marketing and merchandising effort into categories that demonstrate strong purchase behavior.
   - For high-traffic/low-conversion categories, test improvements (bundles, pricing strategy, better discovery filters).

3) **Use timing patterns to schedule promotions and messaging**
   - Align retargeting windows and campaigns to observed purchase peaks.
   - Run time-boxed experiments (same offer at different times) to validate timing sensitivity.

4) **Introduce targeted experiments rather than broad changes**
   - A/B test 1–2 changes at a time:
     - product page layout
     - shipping/returns positioning
     - recommended products
     - category landing page structure

---

## How to Reproduce (Minimal + Clear)
1) Download the dataset from Kaggle: *Ecommerce Behavior Data from Multi-Category Store*
2) Open the Tableau workbook in **`/tableau`**
3) Update the dataset connection to point at your local downloaded file
4) Refresh extracts (if used)
5) Validate calculated metrics using the definitions in **`/docs`**
6) Export dashboards to **`/exports`** (PNG preferred for GitHub previews)
7) Review the slide deck materials in **`/slides`**

---

## Metrics (Definitions)
All metric definitions and calculation notes are documented in: **`/docs`**  
Examples of metrics used:
- Stage counts: views, carts, purchases
- Funnel conversion rates (stage-to-stage)
- Revenue by category
- Revenue by price band
- Purchase timing distributions

---

## Limitations
- This is clickstream behavioral data; it does not include full context such as marketing channel attribution or customer demographics.
- Results are descriptive/diagnostic and intended to guide **next-step experiments**, not provide causal proof.
- Dataset represents one multi-category store context; findings may not generalize to all industries without validation.

---

## Tools
- **Tableau** (primary dashboards)
- Light preprocessing via scripts/spreadsheets as needed for Tableau inputs