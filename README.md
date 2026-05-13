# 🌍 Ernest Amoh | Environmental & Process Engineering  
**Master’s Candidate at the University of Stuttgart** | Bridging Process Physics with AI & Foundation Models.

---

## 💡 Professional Summary
I am a Process & Environmental Engineer specializing in the digitalization of industrial systems. My work focuses on leveraging **Computational Fluid Dynamics (CFD)**, **Process Simulation**, and **Machine Learning** to optimize energy efficiency and decarbonize infrastructure. Currently, I support industrial-scale CO₂ capture and syngas research at the **Institute of Energy Process Engineering (IED)**. My main interest lies in bridging physical systems with AI, especially in areas such as energy systems, decarbonization, and digital twins. I am particularly interested in roles where engineering knowledge and data-driven methods are combined to solve real-world problems.

---

## 🛠 Technical Stack

| Category | Tools & Technologies |
|----------|-------------------|
| **Data Science & ML** | Python (Pandas, NumPy), XGBoost, **Amazon Chronos (Foundation Models)**, R, SQL |
| **Process Engineering** | **Aspen Plus**, **OpenFOAM (CFD)**, MATLAB, Thermo- & Fluid Dynamics |
| **Data Engineering** | Time-Series , API Integration, Data Auditing |
| **Visualization** | Matplotlib, Seaborn, QGIS|

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-2980B9?style=for-the-badge&logo=XGBoost&logoColor=white)
![AspenPlus](https://img.shields.io/badge/Aspen_Plus-0076A8?style=for-the-badge&logo=astronomy&logoColor=white)
![OpenFOAM](https://img.shields.io/badge/OpenFOAM-009933?style=for-the-badge&logo=openfoam&logoColor=white)
![R](https://img.shields.io/badge/R-276DC3?style=for-the-badge&logo=r&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![MATLAB](https://img.shields.io/badge/MATLAB-FF6F00?style=for-the-badge&logo=mathworks&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-11557C?style=for-the-badge&logo=plotly&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Amazon Chronos](https://img.shields.io/badge/Chronos--T5-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)
![DigitalTwin](https://img.shields.io/badge/Digital_Twin-0A192F?style=for-the-badge&logo=databricks&logoColor=white)
![Thermodynamics](https://img.shields.io/badge/Thermodynamics-006699?style=for-the-badge)
![PhysicsInformedAI](https://img.shields.io/badge/Physics--Informed_AI-5C2D91?style=for-the-badge)

---
# 🌟 Featured Projects
### ⚡ German Energy Grid & Carbon Intensity Forecasting
**[→ View Repository](https://github.com/kwesiamoh/energy-forecast)**

| | |
|---|---|
| **Problem Context** | Electricity demand on the German grid rises and falls with weather, industrial activity, and human behavior. Forecasting those fluctuations accurately, alongside real-time carbon intensity ($\text{gCO}_2\text{eq/kWh}$), is essential for intelligent load-shifting and lower-emission energy consumption. The main difficulty is temporal drift. Traditional recursive forecasting models accumulate error with every prediction step, causing forecast stability to deteriorate rapidly beyond short horizons. |
| **Approach** | Built an end-to-end forecasting pipeline integrating SMARD, OPSD, and Meteostat weather data (~80k rows). Engineered physically meaningful composite features capturing temperature-driven demand shifts, weekday consumption cycles, and seasonal generation patterns. Benchmarked a tuned **XGBoost** recursive forecaster against **Amazon Chronos-T5**, evaluating how a zero-shot time-series foundation model behaves under real grid dynamics without task-specific retraining. |
| **Key Insight** | The comparison revealed a structural difference between the models. Recursive XGBoost forecasts gradually diverged over longer horizons, while Chronos-T5 maintained smoother and more stable 24-hour trajectories. The results suggest that foundation models may encode broader temporal representations that generalize more effectively under changing operating conditions, particularly in systems where weather and human behavior interact nonlinearly. |
| **Engineering Outcome** | Produced a modular forecasting workflow capable of integrating heterogeneous energy and weather streams into a deployable prediction pipeline. The framework can be adapted to new regions or grid configurations with minimal re-engineering, making it relevant for both operational forecasting and future research into foundation-model-based energy systems. |
---

### 🔧 Digital Twin Soft-Sensor for Gas Turbine Emission Monitoring
**[→ View Repository](https://github.com/kwesiamoh/gas-turbine-digital-twin)**

| | |
|---|---|
| **Problem Context** | Industrial gas turbines operate under extreme thermal conditions where direct measurement of CO and NOx emissions is difficult, expensive, and operationally fragile. Physical emission probes degrade over time, require frequent calibration, and provide little insight into how trustworthy a reading actually is during unstable combustion events. |
| **Approach** | Developed a Digital Twin soft-sensor using a **Physics-Informed Neural Network (PINN)** trained on operational turbine data and thermodynamic feature representations. Instead of relying purely on statistical fitting, the model incorporates combustion and energy-balance constraints directly into the optimization objective: $\mathcal{L} = \mathcal{L}_{\text{data}} + \lambda \mathcal{L}_{\text{physics}}$. This allows the network to learn emission behavior while remaining anchored to physically plausible turbine dynamics. To quantify prediction reliability, **MC Dropout** was applied during inference, producing uncertainty intervals alongside every emission estimate. |
| **Key Insight** | The residual and calibration analyses exposed an important operational pattern. The model remained highly stable during normal low-emission operation, but uncertainty expanded significantly during high-emission combustion regimes. Rather than hiding this behavior, the system surfaces it explicitly, turning uncertainty itself into an operational signal for identifying unstable turbine states. |
| **Engineering Outcome** | Built a fully interactive **Streamlit** dashboard that streams live predictions, uncertainty bands, and alarm thresholds in real time. The result is a deployable virtual sensing framework capable of supplementing or partially replacing physical emission instrumentation while giving operators visibility into both predicted emissions and model confidence. |
---

## 🚀 Other Selected Projects

### 🧪 CFD Fundamentals in MATLAB
[View Repository](https://github.com/kwesiamoh/cfd-fundamentals-matlab)  
Numerical simulations exploring fundamental fluid dynamics principles.

### 📈 Environmental & Energy Data Analysis
[View Repository](https://github.com/kwesiamoh/Data-Analysis)  
Statistical analysis of environmental datasets to extract actionable operational insights.

---

## 🔭 Current Focus & Interests
- **⚙️ Digital Twins:** Coupling Aspen Plus and OpenFOAM with ML surrogate models.
- **⚡ Decarbonization:** Real-time carbon intensity forecasting for industrial load-shifting.
- **🛡 Process Safety:** Using data-driven monitoring to reduce unplanned downtime and incident frequency.
- **🤖 Time-Series AI:** Scaling Foundation Models for critical infrastructure.

---

## 📫 Connect with Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ernestamoh/)  
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:amohernest@gmail.com)
