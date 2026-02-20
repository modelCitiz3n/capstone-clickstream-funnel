import os
import pandas as pd

IN_PATH = "data/raw/2019-Nov.csv"
OUT_DIR = "exports/tableau_inputs"
os.makedirs(OUT_DIR, exist_ok=True)

USECOLS = ["event_time", "event_type", "category_code", "price"]
CHUNK_SIZE = 2_000_000

funnel_daily = {}          # date -> {view, cart, purchase, revenue}
category_perf = {}         # category -> {view, cart, purchase, revenue}
timing_perf = {}           # (day_of_week, hour) -> {view, cart, purchase, revenue}

def bump(d, key, field, inc):
    if key not in d:
        d[key] = {"view": 0, "cart": 0, "purchase": 0, "revenue": 0.0}
    d[key][field] += inc

def safe_category(x):
    if pd.isna(x) or str(x).strip() == "":
        return "unknown"
    return str(x)

for chunk in pd.read_csv(IN_PATH, usecols=USECOLS, chunksize=CHUNK_SIZE):
    chunk["event_time"] = pd.to_datetime(chunk["event_time"], errors="coerce", utc=True)
    chunk = chunk.dropna(subset=["event_time", "event_type"])

    chunk["category"] = chunk["category_code"].map(safe_category)
    chunk["price"] = pd.to_numeric(chunk["price"], errors="coerce")

    chunk["event_date"] = chunk["event_time"].dt.date
    chunk["event_hour"] = chunk["event_time"].dt.hour
    chunk["day_of_week"] = chunk["event_time"].dt.day_name()

    chunk["revenue"] = chunk["price"].where(chunk["event_type"].eq("purchase"), 0.0).fillna(0.0)

    # Funnel daily
    g = chunk.groupby(["event_date", "event_type"], observed=True).size().unstack(fill_value=0)
    for col in ["view", "cart", "purchase"]:
        if col not in g.columns:
            g[col] = 0
    rev = chunk.groupby("event_date", observed=True)["revenue"].sum()

    for dt, row in g.iterrows():
        bump(funnel_daily, dt, "view", int(row["view"]))
        bump(funnel_daily, dt, "cart", int(row["cart"]))
        bump(funnel_daily, dt, "purchase", int(row["purchase"]))
    for dt, r in rev.items():
        bump(funnel_daily, dt, "revenue", float(r))

    # Category perf
    g2 = chunk.groupby(["category", "event_type"], observed=True).size().unstack(fill_value=0)
    for col in ["view", "cart", "purchase"]:
        if col not in g2.columns:
            g2[col] = 0
    rev2 = chunk.groupby("category", observed=True)["revenue"].sum()

    for cat, row in g2.iterrows():
        bump(category_perf, cat, "view", int(row["view"]))
        bump(category_perf, cat, "cart", int(row["cart"]))
        bump(category_perf, cat, "purchase", int(row["purchase"]))
    for cat, r in rev2.items():
        bump(category_perf, cat, "revenue", float(r))

    # Timing perf
    g3 = chunk.groupby(["day_of_week", "event_hour", "event_type"], observed=True).size().unstack(fill_value=0)
    for col in ["view", "cart", "purchase"]:
        if col not in g3.columns:
            g3[col] = 0
    rev3 = chunk.groupby(["day_of_week", "event_hour"], observed=True)["revenue"].sum()

    for (dow, hr), row in g3.iterrows():
        bump(timing_perf, (dow, int(hr)), "view", int(row["view"]))
        bump(timing_perf, (dow, int(hr)), "cart", int(row["cart"]))
        bump(timing_perf, (dow, int(hr)), "purchase", int(row["purchase"]))
    for (dow, hr), r in rev3.items():
        bump(timing_perf, (dow, int(hr)), "revenue", float(r))

# Write outputs
funnel_df = pd.DataFrame(
    [{"event_date": k, **v} for k, v in sorted(funnel_daily.items(), key=lambda x: x[0])]
)
funnel_df["view_to_cart_rate"] = funnel_df["cart"] / funnel_df["view"].replace({0: pd.NA})
funnel_df["cart_to_purchase_rate"] = funnel_df["purchase"] / funnel_df["cart"].replace({0: pd.NA})
funnel_df["view_to_purchase_rate"] = funnel_df["purchase"] / funnel_df["view"].replace({0: pd.NA})
funnel_df.to_csv(os.path.join(OUT_DIR, "tableau_funnel_daily.csv"), index=False)

cat_df = pd.DataFrame(
    [{"category": k, **v} for k, v in category_perf.items()]
)
cat_df["view_to_purchase_rate"] = cat_df["purchase"] / cat_df["view"].replace({0: pd.NA})
cat_df["cart_to_purchase_rate"] = cat_df["purchase"] / cat_df["cart"].replace({0: pd.NA})
cat_df = cat_df.sort_values("revenue", ascending=False)
cat_df.to_csv(os.path.join(OUT_DIR, "tableau_category_perf.csv"), index=False)

time_df = pd.DataFrame(
    [{"day_of_week": k[0], "event_hour": k[1], **v} for k, v in timing_perf.items()]
)
time_df.to_csv(os.path.join(OUT_DIR, "tableau_timing_perf.csv"), index=False)

print("Done. Wrote outputs to:", OUT_DIR)
