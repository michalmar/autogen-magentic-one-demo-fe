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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { agentsTeam1, agentsTeam2, agentsTeam3 } from '@/components/agents-definition';
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

interface Team {
  teamId: string;
  name: string;
  agents: Agent[];
}


export default function App() {

  const wellcomeMessage: ChatMessage = {
    user: 'MagenticOneOrchestrator',
    message: "My team is ready to assist you. Please type your task below to start.",
    // message: sampleMarkdown,
    time: new Date().toISOString(),
    // content: response.data.content,
    source: 'MagenticOneOrchestrator',
    session_id: 'dummy-generated-session-id',
  };

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
  const [agents, setAgents] = useState<Agent[]>(agentsTeam1);

  // New states for teams and selected team
  const [teams] = useState<Team[]>([
    {
      teamId: 'team-1',
      name: 'MagenticOne Team',
      agents: agentsTeam1
    },
    {
      teamId: 'team-2',
      name: 'Team Predictive Maintenance',
      agents: agentsTeam2
    },
    {
      teamId: 'team-3',
      name: 'Team Safety & Incident Reporting',
      agents: agentsTeam3
    }
  ]);
  const [selectedTeamId, setSelectedTeamId] = useState('team-1');

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

    // Use team agents if found, otherwise fall back to global agents
    const currentTeam = teams.find(team => team.teamId === selectedTeamId);
    const selectedAgents = currentTeam ? currentTeam.agents : agents;
    console.log('Selected team:', currentTeam);
    console.log('Selected agents:', selectedAgents);

    try {
      const response = await axios.post(`${BASE_URL}/start`, { 
        content: userMessage, 
        agents: JSON.stringify(selectedAgents)
      });
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

  // Handler for team selection change
  const handleTeamValueChange = (value: string) => {
    setSelectedTeamId(value);
    const selectedTeam = teams.find(team => team.teamId === value);
    if (selectedTeam) {
      setAgents(selectedTeam.agents);
    }
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
        {/* New UI for team selection */}
        <div className="p-4">
          <label htmlFor="teamSelect" className="mr-2 text-sm text-muted-foreground">Select Team:</label>
          <Select value={selectedTeamId} onValueChange={(value) => handleTeamValueChange(value)}>
            <SelectTrigger id="teamSelect" className="p-1 border rounded">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.teamId} value={team.teamId}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                <Button variant={"outline"} onClick={() => setUserMessage("Analyze the internal incident reports for the upstream oil and gas facility (Asset: Well Site A-17) to detect compliance gaps. Using real‑time incident data (including near misses, safety violations, and environmental events) along with historical incident outcomes, correlate these findings with the updated BSEE Incident Reporting & HSE Compliance Guidelines 2024. Identify missing data fields or delayed reporting that do not meet the new regulatory requirements and generate a prioritized set of corrective recommendations to enhance incident reporting and overall safety compliance. Your output should include detailed observations on which aspects of the incident logs (e.g., incomplete descriptions, inconsistent outcome classifications) need improvement.​")}>Safety...</Button>
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
          <p className='inline'>&nbsp;ver. 20250212.1</p>
        </div>
      </footer>
      </SidebarInset>
    </SidebarProvider>
    )}
    </ThemeProvider>
  )
}
