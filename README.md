# ⚡ PowerCast — AI Electricity Load Forecasting for Pakistan's National Grid

> Predicting Pakistan's electricity demand using time-series machine learning to address the chronic load-shedding crisis.

[![Kaggle](https://img.shields.io/badge/Kaggle-Notebook-20BEFF?style=flat&logo=kaggle)](https://www.kaggle.com/code/jotilohana/powercast-ai-electricity-forecasting-pakistan)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat&logo=python)](https://python.org)
[![ARIMA](https://img.shields.io/badge/Model-ARIMA-orange?style=flat)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)]()

---

## 📌 Overview

Pakistan faces one of the world's most severe load-shedding crises — with outages lasting 10–12 hours daily in rural areas, costing the economy an estimated **$4–6 billion annually**. The core issue is not just supply deficit, but **poor demand forecasting** — grid operators react to outages after they happen, not before.

**PowerCast** is an AI-powered electricity load forecasting system that:
- Analyzes **30+ years** of Pakistan electricity data (1991–2022)
- Benchmarks **Linear Regression vs ARIMA** models head-to-head
- Produces a **6-year demand forecast** (2025–2030) with confidence bands
- Maps zone-wise demand across **10 Pakistan DISCOs**
- Delivers a **data-driven policy brief** for grid planners

---

## 🚀 Live Notebook

▶️ **[View on Kaggle](https://www.kaggle.com/code/jotilohana/powercast-ai-electricity-forecasting-pakistan)**

---

## 📊 Key Results

| Metric | Value |
|---|---|
| Best model | ARIMA (1,1,1) |
| RMSE improvement over Linear Regression | **18%** |
| Peak demand year | 2021 — 116,816 GWh |
| Average annual growth | 3.5% since 1991 |
| 2030 demand forecast | ~122,800 GWh |
| DISCO zones mapped | 10 |

---

## 🗂️ Project Structure
PowerCast/
├── index.html          # Website — Home, About, Project, Results pages
├── style.css           # Website styling
├── script.js           # Charts + animations
└── README.md           # This file

---

## 🔬 Methodology

### Dataset
- **Source:** World Energy Consumption dataset (Our World in Data via Kaggle)
- **Country:** Pakistan slice — 1991 to 2022
- **Validation:** Cross-checked against NEPRA State of Industry Report 2022-23 ✅

### Pipeline

| Step | Description |
|---|---|
| 1 | Data loading & Pakistan filter |
| 2 | Cleaning & linear interpolation |
| 3 | Feature engineering — lag features, rolling averages, YoY growth |
| 4 | ADF stationarity test — determines ARIMA differencing order |
| 5 | Train-test split (80/20) — 1991–2016 train, 2017–2022 test |
| 6 | Linear Regression — baseline model |
| 7 | ARIMA (1,1,1) — time-series model |
| 8 | Model benchmarking — RMSE, MAE, R² |
| 9 | 2025–2030 forecast with ±10% confidence band |
| 10 | Zone-wise DISCO heatmap + policy brief |

### What makes PowerCast different

- 🇵🇰 **Pakistan-specific** — targets real load-shedding crisis, not a generic dataset
- ⚖️ **Dual benchmarking** — two models rigorously compared, not just accuracy printed
- 🧪 **ADF stationarity test** — proper statistical testing before ARIMA, not blindly applied
- ✅ **NEPRA validated** — data cross-checked against official government annual report
- 🔮 **2030 forecast** — 6-year ahead prediction with uncertainty band
- 📋 **Policy brief** — findings converted to actionable recommendations

---

## 🛠️ Technologies
Python 3.12 · Pandas · NumPy · Scikit-learn
Statsmodels · ARIMA · ADF Test
Matplotlib · Seaborn · Kaggle Notebooks

---

## 📍 Zone-wise DISCO Analysis

| DISCO | Region | Load Share |
|---|---|---|
| LESCO | Lahore | 22% |
| MEPCO | Multan | 14% |
| FESCO | Faisalabad | 13% |
| IESCO | Islamabad | 12% |
| PESCO | Peshawar | 10% |
| GEPCO | Gujranwala | 10% |
| HESCO | Hyderabad | 7% |
| SEPCO | Sukkur | 5% |
| QESCO | Quetta | 4% |
| TESCO | Tribal Areas | 3% |

---

## 📋 Policy Findings

1. **3.5% annual demand growth** since 1991 — 2030 requires immediate generation expansion
2. **LESCO + MEPCO = 36% of national load** — highest priority zones for grid investment
3. **Renewables need 3× increase by 2030** — current share insufficient to meet demand
4. **AI forecasting enables proactive scheduling** — reducing outages before they occur
5. **Industrial demand management** in FESCO/GEPCO zones can cut peak load 10–15%

---

## 📄 License

MIT License — free to use with attribution.
