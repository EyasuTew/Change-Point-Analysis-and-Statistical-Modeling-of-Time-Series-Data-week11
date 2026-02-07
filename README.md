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