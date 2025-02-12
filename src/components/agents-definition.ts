export interface Agent { input_key: string; type: string; name: string; system_message: string; description: string; icon: string; index_name: string; }

export const agentsTeam1: Agent[] = [
    {
      input_key: "0001",
      type: "MagenticOne",
      name: "Coder",
      system_message: "",
      description: "",
      icon: "👨‍💻",
      index_name: ""
    },
    {
      input_key: "0002",
      type: "MagenticOne",
      name: "Executor",
      system_message: "",
      description: "",
      icon: "💻",
      index_name: ""
    },
    {
      input_key: "0003",
      type: "MagenticOne",
      name: "FileSurfer",
      system_message: "",
      description: "",
      icon: "📂",
      index_name: ""
    },
    {
      input_key: "0004",
      type: "MagenticOne",
      name: "WebSurfer",
      system_message: "",
      description: "",
      icon: "🏄‍♂️",
      index_name: ""
    }
  ];

export const agentsTeam2: Agent[] = [
      {
        input_key: "0001",
        type: "MagenticOne",
        name: "Coder",
        system_message: "",
        description: "",
        icon: "👨‍💻",
        index_name: ""
      },
      {
        input_key: "0002",
        type: "MagenticOne",
        name: "Executor",
        system_message: "",
        description: "",
        icon: "💻",
        index_name: ""
      },
      // {
      //   input_key: "0003",
      //   type: "MagenticOne",
      //   name: "FileSurfer",
      //   system_message: "",
      //   description: "",
      //   icon: "📂",
      //   index_name: ""
      // },
      // {
      //   input_key: "0004",
      //   type: "MagenticOne",
      //   name: "WebSurfer",
      //   system_message: "",
      //   description: "",
      //   icon: "🏄‍♂️",
      //   index_name: ""
      // },
      {
        input_key:"0005",
        type:"Custom",
        name:"SensorSentinel",
        system_message:`
  You are Sensor Sentinel, the real‑time data guardian for our high‑pressure gas compressor. Your primary responsibility is to continuously monitor sensor streams—including temperature, vibration, pressure, and running hours—and detect subtle trends or anomalies that deviate from the manufacturer’s thresholds as described in Emerson’s Predictive Maintenance Guide. Always validate that your anomaly detection is statistically robust, flag potential issues early, and generate a concise summary of deviations for further review.
  
  Datasets
  
  You are provided with detailed datasets for seven transformers (T1001 to T1007). Your task is to analyze these datasets to determine
  
  ### Dataset 1: Sensor Data for High‑Pressure G
  
  | Timestamp           | EquipmentID | Temperature (°C) | Vibration (mm/s) | Pressure (bar) | RunningHours |  
  |---------------------|-------------|------------------|------------------|----------------|--------------|  
  | 2024-04-01 08:00:00 | COMP-001    | 78.0             | 3.20             | 12.00          | 1500.0       |  
  | 2024-04-01 08:05:00 | COMP-001    | 78.2             | 3.22             | 12.00          | 1500.1       |  
  | 2024-04-01 08:10:00 | COMP-001    | 78.4             | 3.24             | 12.00          | 1500.2       |  
  | 2024-04-01 08:15:00 | COMP-001    | 78.6             | 3.26             | 12.01          | 1500.3       |  
  | 2024-04-01 08:20:00 | COMP-001    | 78.8             | 3.28             | 12.01          | 1500.4       |  
  | 2024-04-01 08:25:00 | COMP-001    | 79.0             | 3.30             | 12.01          | 1500.5       |  
  | 2024-04-01 08:30:00 | COMP-001    | 79.2             | 3.32             | 12.02          | 1500.6       |  
  | 2024-04-01 08:35:00 | COMP-001    | 79.4             | 3.34             | 12.02          | 1500.7       |  
  | 2024-04-01 08:40:00 | COMP-001    | 79.6             | 3.36             | 12.02          | 1500.8       |  
  | 2024-04-01 08:45:00 | COMP-001    | 79.8             | 3.38             | 12.03          | 1500.9       |  
  | 2024-04-01 08:50:00 | COMP-001    | 80.0             | 3.40             | 12.03          | 1501.0       |  
  | 2024-04-01 08:55:00 | COMP-001    | 80.0             | 3.40             | 12.03          | 1501.1       |  
  | 2024-04-01 09:00:00 | COMP-001    | 80.1             | 3.41             | 12.03          | 1501.2       |  
  | 2024-04-01 09:05:00 | COMP-001    | 80.2             | 3.42             | 12.03          | 1501.3       |  
  | 2024-04-01 09:10:00 | COMP-001    | 80.3             | 3.43             | 12.04          | 1501.4       |  
  | 2024-04-01 09:15:00 | COMP-001    | 88.0             | 4.80             | 11.80          | 1501.5       |  
  | 2024-04-01 09:20:00 | COMP-001    | 88.5             | 4.85             | 11.79          | 1501.6       |  
  | 2024-04-01 09:25:00 | COMP-001    | 89.0             | 4.90             | 11.78          | 1501.7       |  
  | 2024-04-01 09:30:00 | COMP-001    | 89.2             | 4.92             | 11.78          | 1501.8       |  
  | 2024-04-01 09:35:00 | COMP-001    | 89.5             | 4.95             | 11.77          | 1501.9       |  
  | 2024-04-01 09:40:00 | COMP-001    | 89.7             | 4.98             | 11.77          | 1502.0       |  
  | 2024-04-01 09:45:00 | COMP-001    | 90.0             | 5.00             | 11.76          | 1502.1       |  
  | 2024-04-01 09:50:00 | COMP-001    | 90.2             | 5.02             | 11.76          | 1502.2       |  
  | 2024-04-01 09:55:00 | COMP-001    | 90.5             | 5.05             | 11.75          | 1502.3       |  
  | 2024-04-01 10:00:00 | COMP-001    | 90.7             | 5.08             | 11.75          | 1502.4       |  
  | 2024-04-01 10:05:00 | COMP-001    | 88.0             | 4.20             | 12.00          | 1502.5       |  
  | 2024-04-01 10:10:00 | COMP-001    | 86.0             | 3.90             | 12.02          | 1502.6       |  
  | 2024-04-01 10:15:00 | COMP-001    | 84.0             | 3.70             | 12.03          | 1502.7       |  
  | 2024-04-01 10:20:00 | COMP-001    | 82.0             | 3.55             | 12.03          | 1502.8       |  
  | 2024-04-01 10:25:00 | COMP-001    | 81.0             | 3.50             | 12.04          | 1502.9       |  
  | 2024-04-01 10:30:00 | COMP-001    | 80.5             | 3.48             | 12.04          | 1503.0       |  
  | 2024-04-01 10:35:00 | COMP-001    | 80.3             | 3.46             | 12.04          | 1503.1       |  
  | 2024-04-01 10:40:00 | COMP-001    | 80.2             | 3.45             | 12.04          | 1503.2       |  
  | 2024-04-01 10:45:00 | COMP-001    | 80.1             | 3.44             | 12.05          | 1503.3       |  
  | 2024-04-01 10:50:00 | COMP-001    | 80.0             | 3.43             | 12.05          | 1503.4       |  
  | 2024-04-01 10:55:00 | COMP-001    | 79.9             | 3.42             | 12.05          | 1503.5       |  
  | 2024-04-01 11:00:00 | COMP-001    | 79.8             | 3.41             | 12.05          | 1503.6       |  
  | 2024-04-01 11:05:00 | COMP-001    | 79.7             | 3.40             | 12.05          | 1503.7       |  
  | 2024-04-01 11:10:00 | COMP-001    | 79.6             | 3.39             | 12.06          | 1503.8       |  
  | 2024-04-01 11:15:00 | COMP-001    | 79.5             | 3.38             | 12.06          | 1503.9       |  
  | 2024-04-01 11:20:00 | COMP-001    | 79.4             | 3.37             | 12.06          | 1504.0       |  
  | 2024-04-01 11:25:00 | COMP-001    | 79.3             | 3.36             | 12.06          | 1504.1       |  
  | 2024-04-01 11:30:00 | COMP-001    | 79.2             | 3.35             | 12.06          | 1504.2       |  
  | 2024-04-01 11:35:00 | COMP-001    | 79.1             | 3.34             | 12.07          | 1504.3       |  
  | 2024-04-01 11:40:00 | COMP-001    | 79.0             | 3.33             | 12.07          | 1504.4       |  
  | 2024-04-01 11:45:00 | COMP-001    | 78.9             | 3.32             | 12.07          | 1504.5       |  
  | 2024-04-01 11:50:00 | COMP-001    | 78.8             | 3.31             | 12.07          | 1504.6       |  
  | 2024-04-01 11:55:00 | COMP-001    | 78.7             | 3.30             | 12.07          | 1504.7       |  
  | 2024-04-01 12:00:00 | COMP-001    | 78.6             | 3.29             | 12.08          | 1504.8       |  
  | 2024-04-01 12:05:00 | COMP-001    | 78.5             | 3.28             | 12.08          | 1504.9       |  
  
  ### Dataset 2: Maintenance Log Data for High‑P
  
  | MaintenanceDate | EquipmentID | MaintenanceType     | Description                                                          | Duration (hrs) | Comments                                              |  
  |-----------------|-------------|---------------------|----------------------------------------------------------------------|----------------|-------------------------------------------------------|  
  | 2024-03-01      | COMP-001    | Preventive Repair    | Replaced compressor bearings and adjusted belt tension               | 3.0            | Noted slight vibration increase pre-repair           |  
  | 2024-03-03      | COMP-001    | Calibration          | Calibrated temperature and pressure sensors per vendor guidelines    | 1.5            | Temperature readings marginally high                  |  
  | 2024-03-05      | COMP-001    | Inspection           | Visual inspection and ultrasonic testing of compressor casing        | 2.0            | Minor wear observed on mounting brackets              |  
  | 2024-03-07      | COMP-001    | Lubrication          | Performed complete lubrication renewal of rotating components        | 1.0            | Lubricant viscosity within specification post-service  |  
  | 2024-03-09      | COMP-001    | Preventive Repair    | Replaced worn-out seals on compressor inlet                          | 2.5            | Leak detected during routine check                    |  
  | 2024-03-11      | COMP-001    | Software Update      | Updated data acquisition software to version 4.2 as per Emerson bulletin | 1.0            | Improved sensor data accuracy observed                 |  
  | 2024-03-13      | COMP-001    | Inspection           | Infrared and vibration analysis of compressor motor                 | 2.0            | Temperature anomaly noted on infrared scan            |  
  | 2024-03-15      | COMP-001    | Calibration          | Recalibrated vibration sensors and verified firmware update         | 1.5            | Minor drift detected in baseline readings             |  
  | 2024-03-17      | COMP-001    | Preventive Repair    | Replaced compressor oil filter and performed oil analysis           | 2.0            | Oil analysis indicated slight contamination            |  
  | 2024-03-19      | COMP-001    | Inspection           | Ultrasonic inspection of compressor drive system                    | 2.5            | No structural issues detected                          |  
  | 2024-03-21      | COMP-001    | Lubrication          | Applied high-performance lubricant to compressor gears              | 1.0            | Lubricant level optimized                              |  
  | 2024-03-23      | COMP-001    | Preventive Repair    | Replaced worn bearing adapter plates                                 | 3.0            | Vibration levels reduced post-repair                  |  
  | 2024-03-25      | COMP-001    | Calibration          | Calibrated pressure transducer on compressor discharge              | 1.5            | Pressure readings now within acceptable range         |  
  | 2024-03-27      | COMP-001    | Inspection           | Visual and thermal inspection of compressor base and mounts         | 2.0            | Minor thermal hotspots observed                        |  
  | 2024-03-29      | COMP-001    | Preventive Repair    | Adjusted compressor belt alignment and tension                      | 2.5            | Post-adjustment vibration levels satisfactory          |  
  | 2024-03-31      | COMP-001    | Software Update      | Updated sensor integration module per Emerson guidelines            | 1.0            | Data acquisition improved                              |  
  | 2024-04-02      | COMP-001    | Inspection           | Comprehensive system diagnostic using vibration and thermal analysis | 2.5            | Anomalies noted; further investigation required         |  
  | 2024-04-04      | COMP-001    | Lubrication          | Replenished compressor hydraulic fluid and checked leak points      | 1.0            | Fluid levels optimal                                   |  
  | 2024-04-06      | COMP-001    | Preventive Repair    | Replaced compressor inlet valve seals due to leak                  | 2.0            | Leak eliminated post-repair                            |  
  | 2024-04-08      | COMP-001    | Calibration          | Recalibrated all sensor arrays on the compressor                   | 1.5            | Baseline reset completed successfully                   |  
  | 2024-04-10      | COMP-001    | Inspection           | Conducted detailed ultrasonic test on compressor casing integrity   | 2.0            | No further corrosion detected                          |  
  | 2024-04-12      | COMP-001    | Preventive Repair    | Replaced aging sensor cables and connectors                         | 1.5            | Intermittent signal drop eliminated                    |  
  | 2024-04-14      | COMP-001    | Software Update      | Installed patch for predictive maintenance algorithm per Emerson guidelines | 1.0            | Algorithm performance improved                         |  
  | 2024-04-16      | COMP-001    | Inspection           | Visual inspection of compressor skid and support structures         | 2.0            | Minor abrasions noted; no immediate risk              |  
  | 2024-04-18      | COMP-001    | Lubrication          | Performed scheduled lubrication of compressor bearings              | 1.0            | No issues post-lubrication                             |  
  | 2024-04-20      | COMP-001    | Preventive Repair    | Replaced compressor drive motor brushes due to wear                | 2.5            | Performance improved post-repair                       |  
  | 2024-04-22      | COMP-001    | Calibration          | Calibrated temperature sensors after repair work                   | 1.5            | Readings now stable                                    |  
  | 2024-04-24      | COMP-001    | Inspection           | Conducted infrared thermography on compressor housing              | 2.0            | Identified cooling inefficiency; flagged for monitoring|  
  | 2024-04-26      | COMP-001    | Preventive Repair    | Adjusted compressor valve timings and replaced worn gaskets        | 3.0            | Performance improved significantly                     |  
  | 2024-04-28      | COMP-001    | Inspection           | Detailed vibration analysis during startup revealed high anomaly   | 2.5            | Anomaly correlates with sensor spike period           |  
  | 2024-04-30      | COMP-001    | Lubrication          | Performed lubrication top-up and oil analysis                     | 1.0            | Oil quality remains within limits                      |  
  | 2024-05-02      | COMP-001    | Preventive Repair    | Replaced damaged components on compressor discharge side           | 2.0            | Pressure stability improved                            |  
  | 2024-05-04      | COMP-001    | Calibration          | Calibrated all measurement devices after routine maintenance       | 1.5            | All sensor readings normalized                         |  
  | 2024-05-06      | COMP-001    | Inspection           | Visual and acoustic inspection during operation                    | 2.0            | No unusual noises detected                             |  
  | 2024-05-08      | COMP-001    | Preventive Repair    | Adjusted cooling system and cleaned heat exchangers               | 2.5            | Cooling performance enhanced                           |  
  | 2024-05-10      | COMP-001    | Software Update      | Implemented Emerson-recommended update for diagnostic software    | 1.0            | Real-time analytics now more precise                  |  
  | 2024-05-12      | COMP-001    | Inspection           | Conducted full operational test with vibration and pressure monitoring | 2.0            | Test results within thresholds                         |  
  | 2024-05-14      | COMP-001    | Lubrication          | Replaced lubricant with high-temperature resistant formula         | 1.0            | Temperature stability slightly improved                |  
  | 2024-05-16      | COMP-001    | Preventive Repair    | Replaced aging compressor seals and gaskets                       | 2.5            | Leakage eliminated post-repair                         |  
  | 2024-05-18      | COMP-001    | Calibration          | Calibrated vibration sensor module after component replacement     | 1.5            | Vibration baseline updated                             |  
  | 2024-05-20      | COMP-001    | Inspection           | Performed detailed ultrasonic inspection of compressor bearings    | 2.0            | Bearing condition marginal; further monitoring required |  
  | 2024-05-22      | COMP-001    | Preventive Repair    | Realigned compressor rotor and adjusted shaft balance              | 3.0            | Vibration levels significantly reduced                 |  
  | 2024-05-24      | COMP-001    | Software Update      | Updated firmware on pressure transducers per new guidelines       | 1.0            | Pressure consistency improved                          |  
  | 2024-05-26      | COMP-001    | Inspection           | Comprehensive diagnostic test on compressor performance            | 2.5            | Minor thermal anomalies noted; recommend continued monitoring |  
  | 2024-05-28      | COMP-001    | Lubrication          | Performed lubrication of compressor drive and rechecked sensor outputs | 1.0            | No further issues detected                             |  
  | 2024-05-30      | COMP-001    | Preventive Repair    | Replaced worn compressor motor components                          | 2.0            | Post-repair performance normal                         |  
  | 2024-06-01      | COMP-001    | Inspection           | Final operational test and certification after series of repairs  | 2.5            | Compressor now meets all performance criteria          |  
  
  Reply "TERMINATE" in the end when everything is done.
  `,
        description:"An agent that monitors sensor streams and detects trends or anomalies for particular device or equipment.",
        icon:"🎻",
        index_name:""
        },
      {
        input_key:"0006",
        type:"RAG",
        name:"MaintanceKBAgent",
        system_message:"",
        description:"An agent that has access to internal index and can handle RAG tasks, call this agent if you are getting questions on Emerson’s Predictive Maintenance Guide.",
        icon:"📖",
        index_name:"ag-demo-pred-maint"
        }
    ];
  
export const agentsTeam3: Agent[] = [
    {
      input_key: "0001",
      type: "MagenticOne",
      name: "Coder",
      system_message: "",
      description: "",
      icon: "👨‍💻",
      index_name: ""
    },
    {
      input_key: "0002",
      type: "MagenticOne",
      name: "Executor",
      system_message: "",
      description: "",
      icon: "💻",
      index_name: ""
    },
    // {
    //   input_key: "0003",
    //   type: "MagenticOne",
    //   name: "FileSurfer",
    //   system_message: "",
    //   description: "",
    //   icon: "📂",
    //   index_name: ""
    // },
    // {
    //   input_key: "0004",
    //   type: "MagenticOne",
    //   name: "WebSurfer",
    //   system_message: "",
    //   description: "",
    //   icon: "🏄‍♂️",
    //   index_name: ""
    // },
    {
      input_key:"0005",
      type:"Custom",
      name:"ComplianceSentinel",
      system_message:`
You are Compliance Sentinel, the watchdog for our incident reporting system at Well Site A-17. Your mission is to rigorously compare internal incident reports against the latest BSEE Incident Reporting & HSE Compliance Guidelines 2024. Check for missing or incomplete fields, delayed report submissions, and discrepancies in incident classifications. Flag any non‑compliance issues and generate a detailed report highlighting areas for improvement to ensure full regulatory adherence.

Datasets

You are provided with detailed datasets. Your task is to analyze these datasets.

### Dataset 1: Internal Incident Reports for Well Site (BSEE Incident Reporting)

| IncidentID | Date       | Location     | IncidentType   | Description                                                           | Outcome                       | Comments                                                   |  
|------------|------------|--------------|----------------|-----------------------------------------------------------------------|-------------------------------|------------------------------------------------------------|  
| IR-1001    | 2024-03-01 | Well Site A-17 | Near Miss      | Operator observed a minor slip on a wet surface near the control panel.| No injury                    | Reported immediately; corrective action taken.             |  
| IR-1002    | 2024-03-02 | Well Site A-17 | Safety         | Temporary loss of lighting during shift change caused disorientation.  | No injury                    | Shift supervisor notified; lights restored within 5 minutes.|  
| IR-1003    | 2024-03-03 | Well Site A-17 | Environmental  | Small oil spill detected near the storage tank.                       | Spill contained               | Clean-up initiated; incident report filed.                 |  
| IR-1004    | 2024-03-04 | Well Site A-17 | Near Miss      | Loose guard rail near processing unit nearly caused a fall.           | No injury                    | Maintenance alerted; guard rail fixed.                      |  
| IR-1005    | 2024-03-05 | Well Site A-17 | Safety         | Worker reported dizziness in high-heat area.                          | No injury                    | Area temperature monitored; cooling improved.               |  
| IR-1006    | 2024-03-06 | Well Site A-17 | Safety         | Equipment guard missing on drilling rig; near miss.                   | No injury                    | Immediate replacement ordered.                              |  
| IR-1007    | 2024-03-07 | Well Site A-17 | Environmental  | Minor gas leak detected from auxiliary valve.                         | Leak repaired                 | Investigation revealed valve corrosion.                     |  
| IR-1008    | 2024-03-08 | Well Site A-17 | Near Miss      | Falling tool incident during rig maintenance.                         | No injury                    | Tool tethering policy reinforced.                           |  
| IR-1009    | 2024-03-09 | Well Site A-17 | Safety         | Operator delayed in reporting malfunctioning alarm.                   | No injury                    | Training session scheduled on prompt reporting.            |  
| IR-1010    | 2024-03-10 | Well Site A-17 | Near Miss      | Slippery walkway due to condensation; near fall observed.             | No injury                    | Surface treatment applied.                                  |  
| IR-1011    | 2024-03-11 | Well Site A-17 | Safety         | Improper PPE observed during routine inspection.                       | No injury                    | Reminder issued; PPE compliance improved.                   |  
| IR-1012    | 2024-03-12 | Well Site A-17 | Environmental  | Minor spill of hydraulic fluid in maintenance bay.                   | Spill contained               | Corrective measures taken; source identified.               |  
| IR-1013    | 2024-03-13 | Well Site A-17 | Near Miss      | Equipment vibration anomaly noted during startup.                     | No injury                    | Data logged; further analysis required.                     |  
| IR-1014    | 2024-03-14 | Well Site A-17 | Safety         | Worker tripped over exposed cable in control room.                   | No injury                    | Cable secured; hazard removed.                              |  
| IR-1015    | 2024-03-15 | Well Site A-17 | Environmental  | Small release of cooling water detected.                              | No environmental impact       | Leak repair completed promptly.                             |  
| IR-1016    | 2024-03-16 | Well Site A-17 | Safety         | Unsecured ladder nearly fell during inspection.                       | No injury                    | Ladder secured; safety briefing held.                       |  
| IR-1017    | 2024-03-17 | Well Site A-17 | Near Miss      | Brief power outage in operating area.                                | No injury                    | Backup system confirmed operational.                        |  
| IR-1018    | 2024-03-18 | Well Site A-17 | Safety         | Worker experienced minor burn from hot equipment.                    | Minor injury                  | First aid administered; investigation ongoing.              |  
| IR-1019    | 2024-03-19 | Well Site A-17 | Environmental  | Unplanned emission spike from vent system.                           | Emission within limits        | Continuous monitoring in place.                             |  
| IR-1020    | 2024-03-20 | Well Site A-17 | Near Miss      | Falling debris near drilling area observed.                          | No injury                    | Inspection conducted; debris removed.                       |  
| IR-1021    | 2024-03-21 | Well Site A-17 | Safety         | Delayed emergency shutdown during a minor fire.                      | No injury                    | Procedure reviewed; training updated.                       |  
| IR-1022    | 2024-03-22 | Well Site A-17 | Environmental  | Leak in chemical storage area detected.                              | Leak contained                | Immediate repair; sensor recalibrated.                      |  
| IR-1023    | 2024-03-23 | Well Site A-17 | Near Miss      | Tool drop from height without injury.                                | No injury                    | Tool safety protocols re-emphasized.                       |  
| IR-1024    | 2024-03-24 | Well Site A-17 | Safety         | Worker lost balance on wet floor.                                    | No injury                    | Floor cleaned and anti-slip mats installed.                |  
| IR-1025    | 2024-03-25 | Well Site A-17 | Environmental  | Minor flare system anomaly recorded.                                  | No environmental impact       | System diagnostics performed.                                |  
| IR-1026    | 2024-03-26 | Well Site A-17 | Safety         | Incorrect labeling on hazardous material container.                   | No injury                    | Labeling corrected; staff retrained.                        |  
| IR-1027    | 2024-03-27 | Well Site A-17 | Near Miss      | Near collision of service vehicle with rig.                          | No injury                    | Traffic routes revised; warning signs installed.            |  
| IR-1028    | 2024-03-28 | Well Site A-17 | Safety         | Improper storage of tools in break area.                             | No injury                    | Storage procedures updated.                                  |  
| IR-1029    | 2024-03-29 | Well Site A-17 | Environmental  | Unexpected odor detected near vent outlet.                           | No environmental impact       | Air quality sensor data reviewed.                            |  
| IR-1030    | 2024-03-30 | Well Site A-17 | Safety         | Worker reported fatigue during long shift.                           | No injury                    | Shift rotation reviewed; rest breaks enforced.              |  
| IR-1031    | 2024-03-31 | Well Site A-17 | Near Miss      | Slippery conditions on loading dock due to rain.                    | No injury                    | Anti-slip coating applied.                                  |  
| IR-1032    | 2024-04-01 | Well Site A-17 | Safety         | Unattended hot surface near control panel.                           | No injury                    | Surface cooled; monitoring increased.                       |  
| IR-1033    | 2024-04-02 | Well Site A-17 | Environmental  | Minor solvent spill in lab area.                                     | Spill contained               | Proper disposal measures followed.                          |  
| IR-1034    | 2024-04-03 | Well Site A-17 | Safety         | Inadequate ventilation in work area observed.                        | No injury                    | Ventilation system checked and improved.                    |  
| IR-1035    | 2024-04-04 | Well Site A-17 | Near Miss      | Unsecured guard rail on elevated platform.                           | No injury                    | Guard rail secured; inspection logged.                      |  
| IR-1036    | 2024-04-05 | Well Site A-17 | Safety         | Worker reported dizziness near fuel pump area.                       | No injury                    | Area ventilated; incident documented.                       |  
| IR-1037    | 2024-04-06 | Well Site A-17 | Environmental  | Small leak from containment sump detected.                           | Leak repaired                 | Sump integrity rechecked.                                   |  
| IR-1038    | 2024-04-07 | Well Site A-17 | Safety         | Delayed reporting of equipment malfunction.                          | No injury                    | Reporting procedure re-emphasized.                          |  
| IR-1039    | 2024-04-08 | Well Site A-17 | Near Miss      | Falling object narrowly missed personnel.                            | No injury                    | Drop zone established; training reiterated.                 |  
| IR-1040    | 2024-04-09 | Well Site A-17 | Safety         | Failure of personal protective equipment noted.                      | No injury                    | PPE inspection increased; replacements ordered.             |  
| IR-1041    | 2024-04-10 | Well Site A-17 | Environmental  | Unexpected emission from flaring unit recorded.                      | Emission within limits        | Continuous monitoring confirmed.                            |  
| IR-1042    | 2024-04-11 | Well Site A-17 | Safety         | Worker tripped over uneven surface in yard.                         | No injury                    | Surface leveled; hazard communicated.                       |  
| IR-1043    | 2024-04-12 | Well Site A-17 | Near Miss      | Brief communication loss in safety system.                           | No injury                    | System check completed; no fault found.                    |  
| IR-1044    | 2024-04-13 | Well Site A-17 | Safety         | Operator fatigue led to delayed reaction during drill startup.       | No injury                    | Rest period enforced; schedule adjusted.                    |  
| IR-1045    | 2024-04-14 | Well Site A-17 | Environmental  | Minor chemical splash during mixing operation.                       | No environmental impact       | Protective measures reinforced.                              |  
| IR-1046    | 2024-04-15 | Well Site A-17 | Safety         | Inadequate signage near hazardous zone observed.                     | No injury                    | Signage updated; additional barriers installed.             |  
| IR-1047    | 2024-04-16 | Well Site A-17 | Near Miss      | Service vehicle nearly collided with equipment.                      | No injury                    | Traffic management revised; incident reviewed.             |  
| IR-1048    | 2024-04-17 | Well Site A-17 | Safety         | Worker experienced mild heat stress.                                 | No injury                    | Cooling protocols reviewed; hydration station added.       |  
| IR-1049    | 2024-04-18 | Well Site A-17 | Environmental  | Minor leak in waste collection area detected.                       | Leak contained                | Waste management protocol updated.                          |  
| IR-1050    | 2024-04-19 | Well Site A-17 | Safety         | Unplanned shutdown due to sensor failure.                            | No injury                    | Sensor maintenance scheduled; root cause analysis initiated.|  




Reply "TERMINATE" in the end when everything is done.
`,
      description:"An Compliance agent that compare internal incident reports (BSEE Incident Reporting) and has access to data for Internal Incident Reports for Well Site.",
      icon:"🎻",
      index_name:""
      },
    {
      input_key:"0006",
      type:"RAG",
      name:"KBAgent",
      system_message:"",
      description:"An agent that has access to internal index and can handle RAG tasks, call this agent if you are getting questions on HSE Compliance Guidelines 2024.",
      icon:"📖",
      index_name:"ag-demo-safety"
      },
      {
        input_key:"0007",
        type:"Custom",
        name:"TrendAnalyzer",
        system_message:`
  You are Incident Trend Analyzer, responsible for scrutinizing historical incident data to identify recurring patterns and underlying causes. Analyze trends in near misses, safety violations, and environmental events. Cross‑validate these trends against the regulatory updates from BSEE and EPA. Your goal is to perform root cause analysis, pinpoint systemic weaknesses, and recommend targeted corrective measures to enhance overall safety performance and prevent future incidents.
  
  Datasets
  
  You are provided with detailed datasets. Your task is to analyze these datasets.
  
  ### Dataset 1: Internal Incident Reports for Well Site
  
  | IncidentID | Date       | Location     | IncidentType   | Description                                                           | Outcome                       | Comments                                                   |  
  |------------|------------|--------------|----------------|-----------------------------------------------------------------------|-------------------------------|------------------------------------------------------------|  
  | IR-1001    | 2024-03-01 | Well Site A-17 | Near Miss      | Operator observed a minor slip on a wet surface near the control panel.| No injury                    | Reported immediately; corrective action taken.             |  
  | IR-1002    | 2024-03-02 | Well Site A-17 | Safety         | Temporary loss of lighting during shift change caused disorientation.  | No injury                    | Shift supervisor notified; lights restored within 5 minutes.|  
  | IR-1003    | 2024-03-03 | Well Site A-17 | Environmental  | Small oil spill detected near the storage tank.                       | Spill contained               | Clean-up initiated; incident report filed.                 |  
  | IR-1004    | 2024-03-04 | Well Site A-17 | Near Miss      | Loose guard rail near processing unit nearly caused a fall.           | No injury                    | Maintenance alerted; guard rail fixed.                      |  
  | IR-1005    | 2024-03-05 | Well Site A-17 | Safety         | Worker reported dizziness in high-heat area.                          | No injury                    | Area temperature monitored; cooling improved.               |  
  | IR-1006    | 2024-03-06 | Well Site A-17 | Safety         | Equipment guard missing on drilling rig; near miss.                   | No injury                    | Immediate replacement ordered.                              |  
  | IR-1007    | 2024-03-07 | Well Site A-17 | Environmental  | Minor gas leak detected from auxiliary valve.                         | Leak repaired                 | Investigation revealed valve corrosion.                     |  
  | IR-1008    | 2024-03-08 | Well Site A-17 | Near Miss      | Falling tool incident during rig maintenance.                         | No injury                    | Tool tethering policy reinforced.                           |  
  | IR-1009    | 2024-03-09 | Well Site A-17 | Safety         | Operator delayed in reporting malfunctioning alarm.                   | No injury                    | Training session scheduled on prompt reporting.            |  
  | IR-1010    | 2024-03-10 | Well Site A-17 | Near Miss      | Slippery walkway due to condensation; near fall observed.             | No injury                    | Surface treatment applied.                                  |  
  | IR-1011    | 2024-03-11 | Well Site A-17 | Safety         | Improper PPE observed during routine inspection.                       | No injury                    | Reminder issued; PPE compliance improved.                   |  
  | IR-1012    | 2024-03-12 | Well Site A-17 | Environmental  | Minor spill of hydraulic fluid in maintenance bay.                   | Spill contained               | Corrective measures taken; source identified.               |  
  | IR-1013    | 2024-03-13 | Well Site A-17 | Near Miss      | Equipment vibration anomaly noted during startup.                     | No injury                    | Data logged; further analysis required.                     |  
  | IR-1014    | 2024-03-14 | Well Site A-17 | Safety         | Worker tripped over exposed cable in control room.                   | No injury                    | Cable secured; hazard removed.                              |  
  | IR-1015    | 2024-03-15 | Well Site A-17 | Environmental  | Small release of cooling water detected.                              | No environmental impact       | Leak repair completed promptly.                             |  
  | IR-1016    | 2024-03-16 | Well Site A-17 | Safety         | Unsecured ladder nearly fell during inspection.                       | No injury                    | Ladder secured; safety briefing held.                       |  
  | IR-1017    | 2024-03-17 | Well Site A-17 | Near Miss      | Brief power outage in operating area.                                | No injury                    | Backup system confirmed operational.                        |  
  | IR-1018    | 2024-03-18 | Well Site A-17 | Safety         | Worker experienced minor burn from hot equipment.                    | Minor injury                  | First aid administered; investigation ongoing.              |  
  | IR-1019    | 2024-03-19 | Well Site A-17 | Environmental  | Unplanned emission spike from vent system.                           | Emission within limits        | Continuous monitoring in place.                             |  
  | IR-1020    | 2024-03-20 | Well Site A-17 | Near Miss      | Falling debris near drilling area observed.                          | No injury                    | Inspection conducted; debris removed.                       |  
  | IR-1021    | 2024-03-21 | Well Site A-17 | Safety         | Delayed emergency shutdown during a minor fire.                      | No injury                    | Procedure reviewed; training updated.                       |  
  | IR-1022    | 2024-03-22 | Well Site A-17 | Environmental  | Leak in chemical storage area detected.                              | Leak contained                | Immediate repair; sensor recalibrated.                      |  
  | IR-1023    | 2024-03-23 | Well Site A-17 | Near Miss      | Tool drop from height without injury.                                | No injury                    | Tool safety protocols re-emphasized.                       |  
  | IR-1024    | 2024-03-24 | Well Site A-17 | Safety         | Worker lost balance on wet floor.                                    | No injury                    | Floor cleaned and anti-slip mats installed.                |  
  | IR-1025    | 2024-03-25 | Well Site A-17 | Environmental  | Minor flare system anomaly recorded.                                  | No environmental impact       | System diagnostics performed.                                |  
  | IR-1026    | 2024-03-26 | Well Site A-17 | Safety         | Incorrect labeling on hazardous material container.                   | No injury                    | Labeling corrected; staff retrained.                        |  
  | IR-1027    | 2024-03-27 | Well Site A-17 | Near Miss      | Near collision of service vehicle with rig.                          | No injury                    | Traffic routes revised; warning signs installed.            |  
  | IR-1028    | 2024-03-28 | Well Site A-17 | Safety         | Improper storage of tools in break area.                             | No injury                    | Storage procedures updated.                                  |  
  | IR-1029    | 2024-03-29 | Well Site A-17 | Environmental  | Unexpected odor detected near vent outlet.                           | No environmental impact       | Air quality sensor data reviewed.                            |  
  | IR-1030    | 2024-03-30 | Well Site A-17 | Safety         | Worker reported fatigue during long shift.                           | No injury                    | Shift rotation reviewed; rest breaks enforced.              |  
  | IR-1031    | 2024-03-31 | Well Site A-17 | Near Miss      | Slippery conditions on loading dock due to rain.                    | No injury                    | Anti-slip coating applied.                                  |  
  | IR-1032    | 2024-04-01 | Well Site A-17 | Safety         | Unattended hot surface near control panel.                           | No injury                    | Surface cooled; monitoring increased.                       |  
  | IR-1033    | 2024-04-02 | Well Site A-17 | Environmental  | Minor solvent spill in lab area.                                     | Spill contained               | Proper disposal measures followed.                          |  
  | IR-1034    | 2024-04-03 | Well Site A-17 | Safety         | Inadequate ventilation in work area observed.                        | No injury                    | Ventilation system checked and improved.                    |  
  | IR-1035    | 2024-04-04 | Well Site A-17 | Near Miss      | Unsecured guard rail on elevated platform.                           | No injury                    | Guard rail secured; inspection logged.                      |  
  | IR-1036    | 2024-04-05 | Well Site A-17 | Safety         | Worker reported dizziness near fuel pump area.                       | No injury                    | Area ventilated; incident documented.                       |  
  | IR-1037    | 2024-04-06 | Well Site A-17 | Environmental  | Small leak from containment sump detected.                           | Leak repaired                 | Sump integrity rechecked.                                   |  
  | IR-1038    | 2024-04-07 | Well Site A-17 | Safety         | Delayed reporting of equipment malfunction.                          | No injury                    | Reporting procedure re-emphasized.                          |  
  | IR-1039    | 2024-04-08 | Well Site A-17 | Near Miss      | Falling object narrowly missed personnel.                            | No injury                    | Drop zone established; training reiterated.                 |  
  | IR-1040    | 2024-04-09 | Well Site A-17 | Safety         | Failure of personal protective equipment noted.                      | No injury                    | PPE inspection increased; replacements ordered.             |  
  | IR-1041    | 2024-04-10 | Well Site A-17 | Environmental  | Unexpected emission from flaring unit recorded.                      | Emission within limits        | Continuous monitoring confirmed.                            |  
  | IR-1042    | 2024-04-11 | Well Site A-17 | Safety         | Worker tripped over uneven surface in yard.                         | No injury                    | Surface leveled; hazard communicated.                       |  
  | IR-1043    | 2024-04-12 | Well Site A-17 | Near Miss      | Brief communication loss in safety system.                           | No injury                    | System check completed; no fault found.                    |  
  | IR-1044    | 2024-04-13 | Well Site A-17 | Safety         | Operator fatigue led to delayed reaction during drill startup.       | No injury                    | Rest period enforced; schedule adjusted.                    |  
  | IR-1045    | 2024-04-14 | Well Site A-17 | Environmental  | Minor chemical splash during mixing operation.                       | No environmental impact       | Protective measures reinforced.                              |  
  | IR-1046    | 2024-04-15 | Well Site A-17 | Safety         | Inadequate signage near hazardous zone observed.                     | No injury                    | Signage updated; additional barriers installed.             |  
  | IR-1047    | 2024-04-16 | Well Site A-17 | Near Miss      | Service vehicle nearly collided with equipment.                      | No injury                    | Traffic management revised; incident reviewed.             |  
  | IR-1048    | 2024-04-17 | Well Site A-17 | Safety         | Worker experienced mild heat stress.                                 | No injury                    | Cooling protocols reviewed; hydration station added.       |  
  | IR-1049    | 2024-04-18 | Well Site A-17 | Environmental  | Minor leak in waste collection area detected.                       | Leak contained                | Waste management protocol updated.                          |  
  | IR-1050    | 2024-04-19 | Well Site A-17 | Safety         | Unplanned shutdown due to sensor failure.                            | No injury                    | Sensor maintenance scheduled; root cause analysis initiated.|  
  
  
  
  ### Dataset 2: Regulatory Updates for Incident Reporting & HSE Compliance
  
  | UpdateID | Date       | Agency | Title                                         | Summary                                                             | Impact                     |  
  |----------|------------|--------|-----------------------------------------------|---------------------------------------------------------------------|----------------------------|  
  | RU-2001  | 2024-03-01 | BSEE   | Expanded Incident Reporting Fields            | New guidelines require additional data fields for incident severity and root cause analysis. | Mandatory from Q2 2024    |  
  | RU-2002  | 2024-03-02 | EPA    | Revised Emission Reporting Requirements       | Lower threshold limits for volatile organic compounds and methane leaks. | Immediate compliance required |  
  | RU-2003  | 2024-03-03 | OSHA   | Updated Worker Safety Protocols               | Enhanced PPE requirements and emergency response training guidelines. | Phased implementation over 6 months |  
  | RU-2004  | 2024-03-04 | BSEE   | Incident Reporting Timeliness                 | Mandates incident report submission within 2 hours of occurrence.   | Effective immediately       |  
  | RU-2005  | 2024-03-05 | EPA    | Hazardous Material Storage Guidelines         | New storage protocols to prevent chemical spills and contamination.  | Mandatory from Q3 2024    |  
  | RU-2006  | 2024-03-06 | OSHA   | Revised Shift Management Standards            | New rules for shift rotations and mandatory rest breaks to reduce fatigue. | Phased over next quarter   |  
  | RU-2007  | 2024-03-07 | BSEE   | Enhanced Near Miss Reporting                  | Requires detailed documentation of near miss events including contributing factors. | Immediate effect           |  
  | RU-2008  | 2024-03-08 | EPA    | Air Quality Monitoring Standards              | Updated standards for continuous monitoring of emissions at production sites. | Compliance due Q3 2024    |  
  | RU-2009  | 2024-03-09 | OSHA   | Updated PPE Compliance Guidelines             | Clarifies PPE standards for high-temperature and hazardous areas.   | Immediate compliance        |  
  | RU-2010  | 2024-03-10 | BSEE   | Mandatory Post-Incident Reviews               | Requires comprehensive reviews and corrective action plans following any incident. | Effective immediately       |  
  | RU-2011  | 2024-03-11 | EPA    | Revised Spill Containment Requirements        | Stricter containment measures for minor spills to prevent environmental impact. | Mandatory from Q2 2024    |  
  | RU-2012  | 2024-03-12 | OSHA   | Updated Training Requirements                 | New training modules for emergency response and incident reporting.  | Phased rollout over 3 months |  
  | RU-2013  | 2024-03-13 | BSEE   | Incident Data Standardization                 | Standardizes incident report formats across all upstream facilities. | Immediate implementation    |  
  | RU-2014  | 2024-03-14 | EPA    | Enhanced Monitoring of Flaring Operations     | New guidelines for monitoring and reporting flaring emissions.      | Compliance due Q4 2024     |  
  | RU-2015  | 2024-03-15 | OSHA   | Revised Equipment Safety Checks               | Mandates regular safety audits for high-risk equipment.             | Immediate effect           |  
  | RU-2016  | 2024-03-16 | BSEE   | Near Miss Data Analytics Requirements         | Requires analytics on near miss incidents to predict potential failures. | Mandatory from Q3 2024    |  
  | RU-2017  | 2024-03-17 | EPA    | Chemical Usage Reporting Improvements         | Enhanced reporting standards for chemical usage in production.      | Immediate compliance        |  
  | RU-2018  | 2024-03-18 | OSHA   | Updated Emergency Shutdown Procedures         | New protocols for emergency shutdown to reduce downtime.            | Effective immediately       |  
  | RU-2019  | 2024-03-19 | BSEE   | Refined HSE Incident Classification           | Improved classification criteria for incidents to aid in trend analysis. | Immediate effect           |  
  | RU-2020  | 2024-03-20 | EPA    | Mandatory Calibration of Emission Sensors     | Requires periodic calibration of all emission monitoring equipment.  | Compliance due Q2 2024     |  
  | RU-2021  | 2024-03-21 | OSHA   | Updated Worker Fatigue Standards              | Introduces limits on overtime to mitigate fatigue risks.            | Phased implementation over 6 months |  
  | RU-2022  | 2024-03-22 | BSEE   | Expanded Root Cause Analysis Requirements     | Mandates root cause analysis for all incidents, including near misses. | Effective immediately       |  
  | RU-2023  | 2024-03-23 | EPA    | Revised Reporting for Minor Spills           | New thresholds for reporting minor chemical spills.                 | Immediate compliance        |  
  | RU-2024  | 2024-03-24 | OSHA   | Enhanced Hazard Communication Standards       | Requires detailed hazard communication for all chemicals used.      | Phased over next quarter   |  
  | RU-2025  | 2024-03-25 | BSEE   | Mandatory Incident Follow-Up Reviews          | Requires a follow-up review for every incident to verify corrective measures. | Immediate effect           |  
  | RU-2026  | 2024-03-26 | EPA    | Updated Guidelines for Waste Management       | New procedures for disposal and documentation of hazardous waste.   | Compliance due Q3 2024     |  
  | RU-2027  | 2024-03-27 | OSHA   | New Standards for Safety Signage              | Mandates clear signage for hazardous areas and emergency exits.     | Effective immediately       |  
  | RU-2028  | 2024-03-28 | BSEE   | Incident Reporting Automation Guidelines       | Encourages the use of automated systems for faster incident reporting. | Immediate implementation    |  
  | RU-2029  | 2024-03-29 | EPA    | Enhanced Water Contamination Protocols        | Stricter reporting requirements for water contamination incidents.   | Compliance due Q4 2024     |  
  | RU-2030  | 2024-03-30 | OSHA   | Updated Protocols for Equipment Malfunction Reporting | New protocols to report equipment malfunctions in real-time.     | Immediate effect           |  
  | RU-2031  | 2024-03-31 | BSEE   | Expanded Data Fields for Incident Reports     | Requires additional details such as operator actions and environmental conditions. | Mandatory from Q2 2024    |  
  | RU-2032  | 2024-04-01 | EPA    | Improved Air Quality Alert Systems            | New requirements for real-time air quality alert notifications.     | Effective immediately       |  
  | RU-2033  | 2024-04-02 | OSHA   | Revised Safety Audit Frequency                | Increases the frequency of mandatory safety audits for high-risk sites. | Phased over next 3 months  |  
  | RU-2034  | 2024-04-03 | BSEE   | Mandatory Safety Drills for Incident Response  | Requires quarterly safety drills and documentation.                | Immediate compliance        |  
  | RU-2035  | 2024-04-04 | EPA    | Updated Guidelines for Ventilation Systems    | New standards for monitoring and maintaining ventilation in production areas. | Compliance due Q3 2024     |  
  | RU-2036  | 2024-04-05 | OSHA   | Revised Incident Reporting Training            | Enhanced training for incident reporting and emergency response.    | Phased rollout over 2 months |  
  | RU-2037  | 2024-04-06 | BSEE   | Enhanced Control of Hazardous Energy         | New protocols for lockout/tagout procedures during maintenance.     | Effective immediately       |  
  | RU-2038  | 2024-04-07 | EPA    | Updated Spill Response Procedures             | Stricter procedures for immediate spill response and reporting.     | Immediate effect           |  
  | RU-2039  | 2024-04-08 | OSHA   | Improved Guidelines for Worker PPE Usage      | Mandates upgraded PPE standards for hazardous operations.           | Effective immediately       |  
  | RU-2040  | 2024-04-09 | BSEE   | Refined Incident Data Analytics Standards     | New analytics requirements to better predict future incidents.     | Mandatory from Q2 2024     |  
  | RU-2041  | 2024-04-10 | EPA    | Updated Chemical Spill Notification Procedures | Requires instant notification for spills exceeding threshold limits. | Immediate compliance        |  
  | RU-2042  | 2024-04-11 | OSHA   | Enhanced Machinery Safety Checks              | Mandates additional checks for high-risk machinery before operation. | Immediate effect           |  
  | RU-2043  | 2024-04-12 | BSEE   | Incident Reporting Quality Assurance Standards | Introduces QA measures for all submitted incident reports.          | Effective immediately       |  
  | RU-2044  | 2024-04-13 | EPA    | Revised Guidelines for Hazardous Air Pollutants | New reporting requirements for hazardous air pollutant emissions.  | Compliance due Q3 2024     |  
  | RU-2045  | 2024-04-14 | OSHA   | Updated Standards for Emergency Equipment     | Mandates regular testing and maintenance of emergency equipment.    | Immediate effect           |  
  | RU-2046  | 2024-04-15 | BSEE   | Enhanced Reporting for Near Misses           | Requires detailed documentation of near miss events with corrective actions. | Mandatory from Q2 2024    |  
  | RU-2047  | 2024-04-16 | EPA    | Revised Water Quality Monitoring Guidelines   | Updated protocols for monitoring and reporting water quality near production sites. | Compliance due Q4 2024     |  
  | RU-2048  | 2024-04-17 | OSHA   | New Standards for Contractor Safety Training  | Mandates specific safety training for all contractors on site.     | Immediate implementation    |  
  | RU-2049  | 2024-04-18 | BSEE   | Expanded Environmental Incident Documentation  | Requires comprehensive documentation of environmental incidents.    | Effective immediately       |  
  | RU-2050  | 2024-04-19 | EPA    | Updated Hazardous Waste Disposal Guidelines   | New guidelines for proper disposal and documentation of hazardous waste. | Compliance due Q2 2024     |  
  
  
  Reply "TERMINATE" in the end when everything is done.
  `,
        description:"An agent that Analyze trends in near misses, safety violations, and environmental events and has access to data for Internal Incident Reports for Well Site and  Regulatory Updates for BSEE, EPA and OSHA.",
        icon:"🎻",
        index_name:""
        },
  ];


//   const sampleMarkdown = `
// # Sample Markdown Document

// ## Headers

// This is a sample document to demonstrate the Markdown rendering with syntax highlighting and copy-to-clipboard functionality.

// ### Subheader

// Here is a simple Python code snippet:

// \`\`\`python
// def hello_world():
//     print("Hello, world!")
// \`\`\`  

// ## Lists

// ### Unordered List

// - Item 1
// - Item 2
// - Item 3

// ### Ordered List

// 1. First item
// 2. Second item
// 3. Third item
//  


  // const debugMessages: ChatMessage[] = [
  //   {
  //     user: 'MagenticOneOrchestrator',
  //     message: "Hello! How can I help you today?",
  //     time: new Date().toISOString(),
  //     // content: response.data.content,
  //     source: 'MagenticOneOrchestrator',
  //     session_id: 'dummy-generated-session-id',
  //   },
  //   {
  //     user: 'User',
  //     message: "Create a Python script that calculates the Fibonacci series below 1000",
  //     time: new Date().toISOString(),
  //     // content: response.data.content,
  //     source: 'User',
  //     session_id: 'dummy-generated-session-id',
  //   },
  //   {
  //     user: 'Coder',
  //     message: sampleMarkdown,
  //     time: new Date().toISOString(),
  //     // content: response.data.content,
  //     source: 'Coder',
  //     session_id: 'dummy-generated-session-id',
  //   },
  //   {
  //     user: 'MagenticOneOrchestrator',
  //     message: "# Heading 2\n\n- List item 1\n  - List item 2\n\n**Bold text**\n\n```python\nprint(\"Hello, World!\")\n```",
  //     time: new Date().toISOString(),
  //     // content: response.data.content,
  //     source: 'MagenticOneOrchestrator',
  //     session_id: 'dummy-generated-session-id', 
  //   },
  //   {
  //     user: 'User',
  //     message: "When and where is the next game of Arsenal, print a link for purchase",
  //     time: new Date().toISOString(),
  //     // content: response.data.content,
  //     source: 'User',
  //     session_id: 'dummy-generated-session-id',
  //   },
  //   {
  //     user: 'WebSurfer',
  //     message: "```python\nprint(\"Hello, World!\")\nprint(\"Hello, World!\")\nprint(\"Hello, World!\")\nprint(\"Hello, World!\")\nprint(\"Hello, World!\")\nprint(\"Hello, World!\")\nprint(\"Hello, World!\")\nprint(\"Hello, World!\")\nprint(\"Hello, World!\")\n```",
  //     time: new Date().toISOString(),
  //     // content: response.data.content,
  //     source: 'WebSurfer',
  //     session_id: 'dummy-generated-session-id',
  //   },
  //   {
  //     user: 'MagenticOneOrchestrator',
  //     message: "This is a Python script that prints 'Hello, World!' 10 times. Instead of printing, I can execute this script for you. Do you want me to execute it?",
  //     time: new Date().toISOString(),
  //     // content: response.data.content,
  //     source: 'MagenticOneOrchestrator',
  //     session_id: 'dummy-generated-session-id',
  //   },
  //   {
  //     user: 'MagenticOneOrchestrator',
  //     message: "I found 3 restaurants for you. Here are the top 2:",
  //     time: new Date().toISOString(),
  //     // content: response.data.content,
  //     source: 'MagenticOneOrchestrator',
  //     session_id: 'dummy-generated-session-id',
  //   },
  // ];
