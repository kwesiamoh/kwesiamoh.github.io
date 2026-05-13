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

### ⚡ German Energy Grid & Carbon Intensity Forecasting
**[→ View Repository](https://github.com/kwesiamoh/energy-forecast)**

| | |
|---|---|
| **Challenge** | Germany's power grid requires accurate 24-hour electricity demand and carbon intensity ($\text{gCO}_2\text{eq/kWh}$) forecasts to enable intelligent load-shifting. Traditional autoregressive models compound errors over multi-step horizons, making them unreliable beyond 6–8 hours — forcing grid operators to hold expensive reserve capacity as a buffer. |
| **Solution** | Built a robust end-to-end time-series pipeline (~80k rows) integrating SMARD, OPSD, and Meteostat weather APIs. Engineered physical composite features capturing diurnal and seasonal energy patterns. Benchmarked a tuned **XGBoost** recursive model against **Amazon Chronos-T5**, a zero-shot foundation model requiring no task-specific training data. |
| **Impact** | Demonstrated that zero-shot foundation models stabilize 24-hour forecast horizons where autoregressive models diverge — with direct implications for reducing reserve capacity requirements for grid operators. For academia: validates the emergent temporal generalization capability of time-series foundation models on real-world industrial data. For industry: a pipeline-ready forecasting module deployable without model retraining on new grid configurations. |

**Skills:** Foundation Models · Feature Engineering (Physical Composites) · Zero-Shot Deployment · Data Auditing (X-Ray Heatmaps) · Multi-Horizon Forecasting · Pipeline Robustness

---

### 🔧 Digital Twin Soft-Sensor for Gas Turbine Emission Monitoring
**[→ View Repository](https://github.com/kwesiamoh/gas-turbine-digital-twin)**

| | |
|---|---|
| **Challenge** | Continuous monitoring of CO and NOx emissions from industrial gas turbines typically requires expensive high-temperature sensors operating in extreme environments. These sensors are failure-prone, maintenance-heavy, and provide no uncertainty signal — leaving operators blind to model confidence during abnormal combustion regimes. |
| **Solution** | Developed a **Physics-Informed Neural Network (PINN)** that encodes thermodynamic constraints directly into the training objective. Rather than treating physics as a post-hoc check, the model optimizes a composite loss: $$\mathcal{L} = \mathcal{L}_{\text{data}} + \lambda \, \mathcal{L}_{\text{physics}}$$ where $\mathcal{L}_{\text{physics}}$ penalizes predictions that violate energy balance and combustion stoichiometry. **MC Dropout** was applied at inference time to generate calibrated uncertainty bands, flagging high-risk operating conditions in real time. A fully functional Streamlit dashboard delivers live emission predictions with alarm thresholds and uncertainty visualization. |
| **Impact** | For academia: establishes a physically consistent soft-sensor framework with principled uncertainty quantification — advancing the case for PINNs in safety-critical industrial monitoring. For industry: a deployable virtual sensor that eliminates dependency on physical emission probes, reduces maintenance overhead, and provides confidence-aware predictions that can integrate with existing process control systems. |

**Skills:** PINNs · Physics-Informed ML · Uncertainty Quantification (MC Dropout) · Digital Twins · XGBoost · PyTorch · Real-Time Streamlit Dashboard · Surrogate Modeling · Thermodynamics

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
