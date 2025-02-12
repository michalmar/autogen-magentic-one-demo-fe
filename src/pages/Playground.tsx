import { useState } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Dot, Loader2, LogOut} from "lucide-react"
import { Button } from "@/components/ui/button"

// import remarkBreaks from 'remark-breaks'
import { Textarea } from "@/components/ui/textarea"

import { AgentsSetup } from '@/components/agents-setup';
import { MarkdownRenderer } from '@/components/markdown-display';
import { ModeToggle } from '@/components/mode-toggle'
import { LoginCard } from "@/components/login";

import axios from 'axios';

import h1 from '@/assets/h1.png';
import lBrain from '@/assets/l-brain.png';
import lPen from '@/assets/l-pen.png';
import lSearch from '@/assets/l-search.png';
import lAi from '@/assets/l-ai.png';
import ag from '@/assets/ag.png';
import aAif from '@/assets/azure-aif.png';


// TODO: FUJ! How to get ENV vars from SWA?
// Define environment variables with default values
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://autogen-demo-be2.whiteground-dbb1b0b8.eastus.azurecontainerapps.io";
// const BASE_URL = "http://localhost:8000";
const ALLWAYS_LOGGED_IN =
  import.meta.env.VITE_ALLWAYS_LOGGED_IN === "true" ? true : false;
const ACTIVATION_CODE = import.meta.env.VITE_ACTIVATON_CODE || "0000";

// console.log('VITE_BASE_URL:', BASE_URL);
// console.log('VITE_ALLWAYS_LOGGED_IN:', ALLWAYS_LOGGED_IN);
// console.log('VITE_ACTIVATON_CODE:', ACTIVATION_CODE);


interface ChatMessage {
  user: string;
  message: string;
  time?: string;
  type?: string;
  source?: string;
  content?: string;
  stop_reason?: string;
  models_usage?: string;
  content_image?: string;
  session_id?: string;
}

interface Agent {
  input_key: string;
  type: string;
  name: string;
  system_message: string;
  description: string;
  icon: string;
  index_name: string;
}


export default function App() {
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
//   `

  const wellcomeMessage: ChatMessage = {
    user: 'MagenticOneOrchestrator',
    message: "My team is ready to assist you. Please type your task below to start.",
    // message: sampleMarkdown,
    time: new Date().toISOString(),
    // content: response.data.content,
    source: 'MagenticOneOrchestrator',
    session_id: 'dummy-generated-session-id',
  };
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

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([wellcomeMessage]);
  // const [chatHistory, setChatHistory] = useState<ChatMessage[]>(debugMessages);

  const [sessionID, setSessionID] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [sessionTime, setSessionTime] = useState('')
  // const [files, setFiles] = useState<{ name: string, size: number, date: string }[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  // const [fileUpload, setFileUpload] = useState<File | null>(null)
  // const [isFileCardVisible, setIsFileCardVisible] = useState(false)
  // const [isSettingsCardVisible, setIsSettingsCardVisible] = useState(false)
  const [isTyping, setIsTyping] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([
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
  ]);

  const stopSession = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/stop?session_id=${encodeURIComponent(sessionID)}`);
      console.log('Stop session response:', response.data);
      setIsTyping(false);
      setSessionID('');
      setSessionTime('');
      // reload the page
      window.location.reload(); 
      // return response
    } catch (error) {
      console.error('Stop session error:', error);
    }
  };
  
  const addAgent = (name: string, description: string, systemMessage: string) => {
    const newAgent = {
      input_key: (agents.length + 1).toString().padStart(4, '0'),
      type: "MagenticOne",
      name,
      system_message: systemMessage,
      description,
      icon: "🤖",
      index_name: ""
    };
    setAgents([...agents, newAgent]);
  };

  const addRAGAgent = (name: string, description: string, indexName: string) => {
    const newAgent = {
      input_key: (agents.length + 1).toString().padStart(4, '0'),
      type: "RAG",
      name,
      system_message: "",
      description,
      icon: "🤖",
      index_name: indexName
    };
    setAgents([...agents, newAgent]);
  };

  const removeAgent = (inputKey: string) => {
    setAgents(agents.filter((agent) => agent.input_key !== inputKey));
  };
  
  // Helper functions to get avatar source and fallback
  const getAvatarSrc = (user: string) => {
    switch (user.toLowerCase()) {
      case 'user':
        return h1;
      case 'magenticoneorchestrator':
        return lBrain;
      case 'coder':
        return lPen;
      case 'filesurfer':
        return lSearch;
      case 'websurfer':
        return lSearch;
      case 'ragagent':
        return lSearch;
      case 'executor':
        return lPen;
      case 'taskresult':
        return lAi;
      default:
        return 'https://example.com/default.png';
    }
  };
  const getAvatarFallback = (user: string) => {
    switch (user.toLowerCase()) {
      case 'user':
        return 'U';
      case 'magenticoneorchestrator':
        return 'O';
      case 'coder':
        return 'C';
      case 'filesurfer':
        return 'F';
      case 'websurfer':
        return 'W';
      case 'ragagent':
        return 'R';
      case 'executor':
        return 'E';
      case 'ai':
        return 'AI';
      default:
        return 'D';
    }
  };


  // const handleSendMessage = async () => {
  //   if (userMessage.trim()) {
  //     // const newMessage = { user: 'User', message: userMessage };
  //     const newMessage: ChatMessage = {
  //       user: 'User',
  //       message: userMessage,
  //       time: new Date().toISOString(),
  //       // content: response.data.content,
  //       source: 'User',
  //     };
  //     setChatHistory((prev) => [...prev, newMessage]);
  
  //     try {
        
  //       const response = await axios.post('http://localhost:8000/chat', { content: userMessage, agents: JSON.stringify(agents)});
  //       console.log('Response:', response.data);
  //       const aiMessage: ChatMessage = {
  //         user: response.data.source,
  //         message: response.data.content,
  //         time: response.data.time,
  //         // content: response.data.content,
  //         source: response.data.source,
  //         stop_reason: response.data.stop_reason,
  //         models_usage: response.data.models_usage,
  //         content_image: response.data.content_image,
  //       };
  //       console.log('New message:', aiMessage);
  //       // const aiMessage = { user: 'MagenticOneOrchestrator', message: String(newMessage.content).replace(/\n$/, '') };
  //       setChatHistory((prev) => [...prev, aiMessage]);
  //     } catch (error) {
  //       console.error('Chat error:', error);
  //     }
  //     setUserMessage('');
  //   }
  // };

  const handleSendStreamingMessage = async () => {
    if (!userMessage.trim()) return;
    setIsTyping(true);
    const newMessage = { user: 'User', message: userMessage };
    setChatHistory([...chatHistory, newMessage]);
    // Start timer
    const startTime = Date.now();

    try {
      const response = await axios.post(`${BASE_URL}/start`, { content: userMessage, agents: JSON.stringify(agents) });
      const sessionId = response.data.response;  // Get the session ID from the response
      setSessionID(sessionId);
      const eventSource = new EventSource(`${BASE_URL}/chat-stream?session_id=${encodeURIComponent(sessionId)}`);
      eventSource.onmessage = (event) => {
        // console.log('EventSource message:', event.data);
        const data = JSON.parse(event.data);
        if (data.stop_reason) {
          setIsTyping(false);
          // Measure elapsed time and set sessionTime (assumes sessionTime state exists)
          const elapsedTime = Date.now() - startTime;
          const minutes = Math.floor(elapsedTime / 60000);
          const seconds = Math.floor((elapsedTime % 60000) / 1000);
          setSessionTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
          // eventSource.close();
        }


        const aiMessage: ChatMessage = {
          user: data.source,
          message: data.content,
          time: data.time,
          // content: data.content,
          source: data.source,
          stop_reason: data.stop_reason,
          models_usage: data.models_usage,
          content_image: data.content_image,
        };
  
        setChatHistory((prev) => [...prev, aiMessage]);
      };
  
      eventSource.onerror = (error) => {
        setIsTyping(false);
        console.error('EventSource error:', error);
        eventSource.close();
      };
    } catch (error) {
      console.error('Chat error:', error);
    }
    setUserMessage('');
  };
  
  /// TODO: better login -> MS EntraID
  const handleLogin = (email: string, password: string) => {
    console.log('Logging in with:', email)
    if (password === ACTIVATION_CODE || ALLWAYS_LOGGED_IN) {
      setIsAuthenticated(true)
    } else {
      console.log('Invalid activation code')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    {!isAuthenticated ? (
      <LoginCard handleLogin={handleLogin} />
    ) : (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-12 shrink-0 items-center gap-2 border-b px-4 z-10 shadow">
          <div className="flex items-center gap-2 px-4 w-full">
            {/* <SidebarTrigger />   */}
            <Bot className="h-8 w-8" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    AutoGen & MagenticOne demo
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Playground</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto hidden items-center gap-2 md:flex">
            {/* if session is running display loader */}
            {/* if the session end display elapsed time */}
            {sessionTime && !isTyping ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <p className='text-sm text-muted-foreground'>Session {sessionID} completed in {sessionTime}s.</p>
                <Button variant="secondary" onClick={() => stopSession()}>
                  Run new
                </Button>
              </div>
            ) : null}
            {isTyping ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <p className='text-sm text-muted-foreground'>Running {sessionID} session...</p>
                <Loader2 className="lucide lucide-loader2 mr-2 h-4 animate-spin loader-green" />
                {/* button to stop the session */}
                <Button variant="destructive" onClick={() => stopSession()}>Stop</Button>
              </div>
            ) : <p className='text-sm text-muted-foreground loader-green'>  ready</p>}
   
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ModeToggle />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout}>
                <LogOut />Log out
              </Button>
            ) : null}
                
            </div>
          </div>
        </header>
        {/* Main content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Separator  />
          {/* Agents setup */}
          <AgentsSetup
              agents={agents}
              removeAgent={removeAgent}
              addAgent={addAgent}
              addRAGAgent={addRAGAgent}
              getAvatarSrc={getAvatarSrc}
            />
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {/* Chat Interface */}
            <Card className={`md:col-span-2 h-full flex flex-col`}>
              <CardHeader>
                <CardTitle>AutoGen Chat</CardTitle>
                <div className="space-x-2 container text-center"><p className="text-sm text-muted-foreground inline">Quick actions:</p>
                <Button variant="outline" onClick={() => setUserMessage("Find me a French restaurant in Dubai with 2 Michelin stars?")} className="text-sm">Find restaurant...</Button>
                <Button variant="outline" onClick={() => setUserMessage("When and where is the next game of Arsenal, print a link for purchase")}>Check football game...</Button>
                <Button variant="outline" onClick={() => setUserMessage("Generate a python script and execute Fibonacci series below 1000")}>Generate script...</Button>
                <Button variant="outline" onClick={() => setUserMessage("Use advanced financial modelling, scenario analysis, geopolitical forecasting, and risk quantification to produce a comprehensive, data-driven assessment of current market forecasts, commodity price trends, and OPEC announcements. In this process, identify and deeply evaluate the relative growth potential of various upstream investment areas—ranging from unconventional reservoirs to deepwater projects and advanced EOR techniques—across Africa, the Middle East, and Central Europe. Based on publicly available data (e.g., IEA, EIA, and OPEC bulletins), synthesize your findings into specific, country-level recommendations that incorporate ROI calculations, scenario-based risk assessments, and robust justifications reflecting both market and geopolitical considerations. Present the final deliverable as a well-structured table​")} className="text-sm">Market assessment...</Button>
                <Button variant={"outline"} onClick={() => setUserMessage("Analyze the sensor data and historical maintenance logs for the high‑pressure gas compressor (EquipmentID: COMP-001). Using real‑time measurements of temperature, vibration, and pressure, along with the asset’s running hours, detect any early signs of mechanical degradation. Correlate these findings with the vendor’s guidelines (downloaded from Emerson’s Predictive Maintenance Guide for Gas Compressors) and the maintenance history. In particular, determine if rising vibration amplitudes, combined with temperature excursions and delayed calibrations, suggest that the compressor is trending toward failure. Based on this analysis, generate a detailed maintenance alert including a prioritized repair schedule and recommended corrective actions to mitigate downtime.")}>Predictive Maintenance...</Button>
                <Button variant={"outline"} onClick={() => setUserMessage("What is  Optimization of compressor energy consumption based on Emerson’s Predictive Maintenance Guide for Gas Compressor?")}>TEST...</Button>
              </div>
              </CardHeader>
              <CardContent className="flex-1 h-96">
                <Separator />
                <div className="space-y-4">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.user === 'User' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-2 rounded-lg shadow ${message.user === 'User' ? 'group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[70%] bg-primary text-primary-foreground duration-300 animate-in fade-in-0 zoom-in-75 origin-bottom-right' : 'group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[96%] bg-muted text-foreground duration-300 animate-in fade-in-0 zoom-in-75 origin-bottom-left'}`}>
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={getAvatarSrc(message.user)} />
                            <AvatarFallback>{getAvatarFallback(message.user)}</AvatarFallback>
                            {/* <Bot className="ml-autoaspect-square h-full w-full" /> */}
                          </Avatar>
                          <div className="break-all max-w-[100%]">
                            <p className="text-sm font-semibold">{message.user}</p>
                            <MarkdownRenderer markdownText={message.message} />
                            {/* Display image if available */}
                            {message.content_image && (
                              <img src={`${message.content_image}`} alt="content" className="mt-2 max-w-[625px]" />
                            )}
                            {/* <MarkdownRenderer>{message.message}</MarkdownRenderer> */}
                          </div>
                        </div>
                      </div>
                     {/* <div className='inline'>
                      <time className=" mt-1 block px-1 text-xs opacity-50 duration-500 animate-in fade-in-0">
                        {message.time && new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </time>
                     </div> */}
                    </div>
                  ))}

                  
                  {isTyping ? (
                    <div className="justify-left flex space-x-1">
                      <div className="rounded-lg bg-muted p-3 shadow">
                        <div className="flex -space-x-2.5">
                        <Dot className='lucide lucide-dot h-5 w-5 animate-typing-dot-bounce' />
                        <Dot className='lucide lucide-dot h-5 w-5 animate-typing-dot-bounce [animation-delay:90ms]' />
                        <Dot className='lucide lucide-dot h-5 w-5 animate-typing-dot-bounce [animation-delay:180ms]' />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
              <CardFooter className="flex space-x-2">
                <Textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendStreamingMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="z-10 w-full grow resize-none rounded-xl border border-input bg-background p-3 pr-24 text-sm ring-offset-background transition-[border] placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isTyping}
                />
                <Button onClick={handleSendStreamingMessage} disabled={isTyping}>Send</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        {/* Footer */}
      <footer className="bg-muted mt-8">
        <div className="container mx-auto px-4 py-2 text-center text-sm text-muted-foreground">
          <p className='inline'>&copy; 2025 MagenticOne showcase powered by </p>
          <img src={ag} alt="Logo" className='w-[18px] inline'/>
          <p className='inline'>&nbsp;running on </p>
          <img src={aAif} alt="Logo" className='w-[18px] inline'/>
          <p className='inline'>&nbsp;ver. 20250206.2</p>
        </div>
      </footer>
      </SidebarInset>
    </SidebarProvider>
    )}
    </ThemeProvider>
  )
}
