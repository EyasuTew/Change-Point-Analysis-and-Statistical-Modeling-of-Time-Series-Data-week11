Here is a clean, professional, and well-structured **README.md** file tailored for your Task 1 submission (interim deliverable for the 10 Academy Week 11 Challenge).

You can copy-paste this content directly into your repository's `README.md` file.

```markdown
# 10 Academy Week 11 – Task 1: Foundation & EDA  
**Change Point Analysis of Brent Oil Prices**  
**Detecting Changes and Associating Causes**

**Interim Submission** — February 08, 2026, 20:00 UTC

## Project Overview

As part of the **Artificial Intelligence Mastery** program (Week 11), this task focuses on laying the groundwork for Bayesian change point detection on historical **Brent crude oil prices** (1987–2022) to understand how major geopolitical, economic, and OPEC-related events influence price regimes.

**Role simulated:** Data Scientist at Birhan Energies  
**Objective of Task 1:** Data preparation, exploratory analysis, event compilation, workflow planning, assumptions & limitations documentation.

## Repository Structure

```
week11-task1/
├── data/
│   ├── BrentOilPrices.csv          # Original dataset (provided)
│   └── brent_cleaned.csv           # Cleaned version with log returns & volatility
├── notebooks/
│   └── task1_eda_and_planning.ipynb  # Main EDA + workflow notebook
├── events.csv                      # 15+ key events table
├── interim_report.md               # 1–2 page summary report (or PDF version)
├── interim_report_task1.html       # HTML version of the report (optional)
└── README.md                       # This file
```

## Key Deliverables (Task 1 – Interim)

- [x] Jupyter notebook: `task1_eda_and_planning.ipynb`  
  - Data loading & cleaning  
  - Feature engineering (log returns, 30-day rolling volatility)  
  - EDA visualizations (price trend, returns, volatility, event annotations)  
  - Stationarity check (ADF test)  

- [x] Events dataset: `events.csv`  
  - 15+ major events (2011–2022)  
  - Columns: Date, Event_Description, Category, Expected_Impact, Notes  

- [x] Interim report  
  - Workflow outline  
  - EDA highlights  
  - Assumptions & limitations (especially correlation vs. causation)  
  - Available as Markdown (`interim_report.md`) and HTML (`interim_report_task1.html`)

- [x] Cleaned dataset ready for Task 2 modeling

## How to Run the Notebook

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd week11-task1
   ```

2. Recommended: use a virtual environment
   ```bash
   python -m venv .venv
   source .venv/bin/activate    # Linux/macOS
   # or
   .venv\Scripts\activate       # Windows
   ```

3. Install dependencies
   ```bash
   pip install pandas numpy matplotlib seaborn statsmodels
   ```

4. Open the notebook
   ```bash
   jupyter notebook notebooks/task1_eda_and_planning.ipynb
   ```

   or use VS Code / JupyterLab

**Important:** Update the `data_path` variable in the notebook if your file location differs.

## Main EDA Visualizations (included in notebook)

- Raw Brent price time series (1987–2022)  
- Daily log returns (volatility clustering visible during crises)  
- 30-day rolling annualized volatility  
- Annotated chart with key events (2014 OPEC decision, 2020 COVID low, 2022 Ukraine invasion)

## Key Insights from Task 1

- **Regime shifts** clearly visible:  
  - 2011–2014 high prices (~$100+)  
  - 2014–2016 collapse (~$30)  
  - 2020 historic low (~$20)  
  - 2022 spike (> $120)

- Log returns appear approximately stationary (ADF p-value << 0.05)  
- Strong volatility clustering during major crises  
- Visual event overlays show good alignment with OPEC decisions, sanctions, conflicts, and demand shocks

## Assumptions & Limitations (summary)

**Assumptions**
- Discrete structural breaks exist  
- Log returns within regimes ≈ Normal  
- Listed events are dominant drivers of large shifts

**Limitations**
- Change point detection shows **statistical breaks**, **not causal proof**  
- Correlation ≠ causation (confounding factors possible)  
- Dataset ends late 2022  
- Event list is selective

## Next Steps (Task 2 Preview)

- Implement Bayesian change point model using **PyMC**  
- Uniform prior on change point τ  
- Switch between regime-specific parameters  
- MCMC sampling & posterior interpretation  
- Match detected change points to events  
- Quantify probabilistic impacts

## Useful Links

- Challenge document: (provided in course materials)  
- PyMC documentation: https://www.pymc.io/  
- Change point detection overview: https://forecastegy.com/posts/change-point-detection-time-series-python/

---

**Prepared for:** 10 Academy – Artificial Intelligence Mastery  
**Slack channel:** #all-week11  
**Office hours:** Mon–Fri, 08:00–15:00 UTC

Good luck with the interim submission!
```

Feel free to customize:

- Add your GitHub repo link
- Insert your name / team name
- Add badges (e.g., Python version, license) if desired
- Include screenshots of the main plots by adding image links (e.g. `![Price Trend](screenshots/price_trend.png)`)

Let me know if you want a shorter version, more technical tone, or inclusion of badges / shields. Good luck with the submission today!







Here are two clean, professional **README.md** files tailored for **Task 2** and **Task 3** of the 10 Academy Week 11 Challenge. You can place them in the appropriate folders or combine them into one main README if your repository structure is flat.

### README for Task 2 (Bayesian Change Point Modeling)

```markdown
# Task 2 – Bayesian Change Point Detection  
**10 Academy Week 11 Challenge – Brent Oil Prices**

**Final Submission** — February 10, 2026

## Objective

Apply Bayesian change point analysis using PyMC to detect structural breaks in Brent oil log returns and associate them with major geopolitical, OPEC, and economic events.

## Key Files

```
task2/
├── notebooks/
│   └── task2_change_point_model.ipynb      # Main analysis + PyMC model
├── data/
│   └── brent_cleaned.csv                   # Input from Task 1
├── outputs/
│   ├── change_points.json                  # Exported detected shifts (for Task 3)
│   └── posterior_plots/                    # Saved figures (optional)
└── README.md                               # This file
```

## How to Run

1. **Prerequisites**

   ```bash
   pip install pymc arviz pandas numpy matplotlib seaborn
   ```

2. **Run the notebook**

   ```bash
   jupyter notebook notebooks/task2_change_point_model.ipynb
   ```

   - Adjust `data_path` if needed
   - Sampling may take 5–60 minutes depending on hardware and subsample choice

## Main Components Implemented

- **Data**: Daily log returns (more stationary than raw prices)
- **Model**: Single change point with DiscreteUniform prior on τ  
  - Regime means μ₁, μ₂ (Normal priors)  
  - Shared σ (HalfNormal)  
  - Likelihood: Normal with switched mean
- **Sampling**: NUTS (default) or Metropolis hybrid / subsampled data for speed
- **Diagnostics**: R-hat, trace plots, effective sample size (ESS)
- **Visualization**:
  - Posterior of τ (change point location)
  - Posterior distributions of μ₁, μ₂, difference
  - Annotated log returns with detected change date
- **Interpretation**:
  - Most probable change date + credible interval
  - Probabilistic statements (e.g. "92% prob. mean log return increased after shift")
  - Association with events (2014 OPEC, 2020 COVID, 2022 Ukraine war)
  - Quantitative impact example (mean shift + % change)

## Key Results Summary (example – adapt to your run)

- Detected regime shift around **2022-02/03**  
  - Mean daily log return: -0.0005 → +0.0015  
  - Probability of increase: ~92%  
  - Likely linked to Russia-Ukraine invasion & sanctions

- Earlier shift ~**2014-11** aligns with OPEC no-cut decision (collapse regime)

## Limitations & Extensions

- Single change point only (multiple points computationally expensive)
- Log returns modeled (not raw prices)
- **Future work**:
  - Multiple change points (sequential construction)
  - Student-t likelihood (fat tails)
  - Volatility regime changes (separate σ₁/σ₂)
  - Exogenous variables (VAR-style)

## Outputs for Task 3

- `change_points.json` – ready for dashboard (dates, means, probabilities, descriptions)

Good luck with the final submission!
```

### README for Task 3 (Interactive Dashboard)

```markdown
# Task 3 – Interactive Brent Oil Dashboard  
**10 Academy Week 11 Challenge – Final Submission**

**Date:** February 10, 2026

## Objective

Build a full-stack dashboard to let stakeholders explore Brent oil prices, detected change points, and associated events interactively.

## Technology Stack

- **Backend**: Flask (simple REST API)
- **Frontend**: React + Recharts (interactive charts)
- **Data**: CSV/JSON from Tasks 1 & 2

## Project Structure

```
dashboard/
├── backend/
│   ├── app.py
│   ├── data/
│   │   ├── brent_cleaned.csv
│   │   ├── events.csv
│   │   └── change_points.json
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   ├── public/
│   └── package.json
└── README.md
```

## Features Implemented

- Date range filter (start/end date inputs)
- Interactive price time series (Recharts LineChart)
- Event vertical reference lines with click-to-highlight
- Tooltip showing date, price, and event description
- Clickable event list (highlight corresponding marker on chart)
- Display of detected change points with quantitative impact
- Responsive layout (works on desktop + mobile)

## Setup Instructions

### 1. Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

→ API runs on http://localhost:5000

Endpoints:
- `/api/prices?start=YYYY-MM-DD&end=YYYY-MM-DD`
- `/api/events`
- `/api/change-points`

### 2. Frontend (React)

```bash
cd frontend
npm install
npm start
```

→ Opens at http://localhost:3000

Make sure backend is running first.

## Screenshots (include these in your submission)

1. Full dashboard view with default date range
2. Zoomed range + event highlight (click on event in list)
3. Tooltip showing price + event description
4. Change point summary section

(Place actual screenshots in a `/screenshots/` folder or embed links in final report)

## Notes & Limitations

- Assumes backend on port 5000 (CORS enabled)
- Data files must be present in `backend/data/`
- No authentication / deployment (local development only)
- Can be extended with: volatility overlay, more filters, export CSV, authentication

## Deployment (optional – not required)

```bash
# Backend (e.g. Render, Railway, Heroku)
# Frontend (Vercel, Netlify – set proxy or env var for API base URL)
```
```


