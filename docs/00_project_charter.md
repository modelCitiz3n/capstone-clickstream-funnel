# Project Charter (ASK)
**Project:** E-Commerce Clickstream Funnel Analysis (Capstone)  
**Case Study Title:** Optimizing E-Commerce Conversion Through Clickstream Funnel Analysis  
**Owner:** Jordan  
**Date:** 2026-02-20  
**Status:** Draft (baseline)

---

## Business task statement
Use clickstream events (view, cart, purchase) to quantify funnel conversion rates, identify the largest drop-offs, and isolate revenue drivers by category and price band to recommend practical actions that improve conversion and revenue.

## Stakeholders + audience
- **Primary stakeholder:** BI/Analytics Manager (sponsor)
- **Secondary stakeholders:** E-commerce Manager, Product/Merchandising Lead, Marketing Lead
- **Audience:** non-technical business stakeholders (decision-makers) with analyst-ready rigor in notes

## Project objectives
- Establish baseline funnel performance (view → cart → purchase) overall and by key segments
- Pinpoint where drop-off is highest and which segments contribute most
- Identify revenue concentration by category and price band (mix)
- Produce 3 dashboards + a concise story that leads to clear, defensible recommendations

## Key questions (max 5)
1) Where do users drop off in the funnel (view → cart → purchase)?  
2) Which categories are best/worst on conversion and revenue?  
3) How do price bands relate to conversion and revenue mix?  
4) What are the top revenue drivers (category × price band)?  
5) Are there timing patterns (hour/day) that suggest optimization opportunities?

## Success metrics (conversion + revenue)
- **Overall conversion rate:** Purchases / Views (baseline + segmented)
- **View → Cart rate:** Carts / Views
- **Cart → Purchase rate:** Purchases / Carts
- **Total revenue:** SUM(price) for purchase events
- **Revenue concentration:** % of revenue from top categories and top price bands
- **AOV proxy:** reported only as a proxy (see Prepare notes) depending on session/grouping quality

## Scope controls
- **Chosen scope control:** single-month time slice to keep the project finishable in a couple hours  
- Category deep-dives limited to top categories by views within that month

## Risks / limitations
- Session/order logic may be unreliable; basket/AOV are approximations unless grouping is defensible
- Dataset is not first-party for a specific company; insights are directional and period-specific
- Limited context fields assumed (no channel/device/geo); recommendations will focus on onsite levers

## Final deliverables
- **3 Tableau dashboards**
  - Dashboard 1: Funnel Overview (baseline + segments)
  - Dashboard 2: Revenue & Category Performance
  - Dashboard 3: Behavioral & Timing Insights
- **10–12 slide deck** (executive narrative + recommendations)
- **Case study write-up** aligned to Ask → Prepare → Process → Analyze → Share → Act