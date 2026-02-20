# Tableau Workbooks

Primary workbook:
- clickstream_funnel_v1.twbx (preferred) or .twb

Export outputs:
- /exports/dashboard_png
- /exports/dashboard_pdf

## Data approach (storage-safe)
- Raw Kaggle CSV lives in Codespaces only (ignored by git)
- Tableau connects to small aggregate CSVs generated at: `exports/tableau_inputs/`
- Generator script: `scripts/make_tableau_inputs.py`