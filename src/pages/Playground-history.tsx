import { useState, useEffect } from 'react'
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
import { Bot, LogOut, Download, Delete, Pencil, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { format } from 'date-fns'
import { ModeToggle } from '@/components/mode-toggle'
import { LoginCard } from "@/components/login"


import axios from 'axios'

import h1 from '@/assets/h1.png';
import lBrain from '@/assets/l-brain.png';
import lPen from '@/assets/l-pen.png';
import lSearch from '@/assets/l-search.png';
import lAi from '@/assets/l-ai.png';
import ag from '@/assets/ag.png';
import aAif from '@/assets/azure-aif.png';

// New imports for the dialog UI. Adjust the import path as needed.
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MarkdownRenderer } from '@/components/markdown-display';

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://autogen-demo-be2.whiteground-dbb1b0b8.eastus.azurecontainerapps.io";
const ALLWAYS_LOGGED_IN =
  import.meta.env.VITE_ALLWAYS_LOGGED_IN === "true" ? true : false;
const ACTIVATION_CODE = import.meta.env.VITE_ACTIVATON_CODE || "0000";

export default function PlaygroundHistory() {
  const [isAuthenticated, setIsAuthenticated] = useState(BASE_URL)
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  // New state for dialog display.
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // New function to show details in a dialog for a given session_id.
  const handleShowDetails = (sessionId: string) => {
    setSelectedSessionId(sessionId)
    setDialogOpen(true)
  }
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
  

  useEffect(() => {
    async function fetchHistory() {
      try {
        setIsHistoryLoading(true);
        const response = await axios.post('http://localhost:8000/conversations');
        console.log('Response:', response.data);
        setHistoryItems(response.data);
        setIsHistoryLoading(false);
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    }
    fetchHistory();
  }, []);

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
                <Bot className="h-8 w-8" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        AutoGen &amp; MagenticOne demo
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Playground</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto hidden items-center gap-2 md:flex">
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
              <Separator />
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                {/* Chat Interface */}
                <Card className="md:col-span-2 flex flex-col">
                  <CardHeader>
                    <CardTitle>Agentic Workflows History</CardTitle>
                    <div className="space-x-2 container text-center">
                      <p className="text-sm text-muted-foreground inline">Quick actions:</p>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Delete className="h-4 w-4" />
                        Clear
                      </Button>
                    </div>
                  </CardHeader>
                  {isHistoryLoading ? (
                    <CardContent className="flex-1 h-96 overflow-auto">
                      <Loader2 className="h-12 w-12" />
                    </CardContent> 
                  ) : (
                    <CardContent className="flex-1 h-96 overflow-auto">
                      <Separator />
                      <div className="space-y-4">
                        {/* Show history */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[30%]">ID</TableHead>
                              {/* <TableHead>Name</TableHead> */}
                              <TableHead className="w-[30%]">User</TableHead>
                              <TableHead className="w-[20%]">Date &amp; Time</TableHead>
                              {/* <TableHead>Runtime</TableHead> */}
                              <TableHead className="text-right w-[10%]">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {historyItems.map(item => (
                              <TableRow key={item.session_id}>
                                <TableCell className="font-medium">{item.session_id}</TableCell>
                                {/* <TableCell>{item.name}</TableCell> */}
                                <TableCell>{item.user_id}</TableCell>
                                <TableCell>{item.timestamp}</TableCell>
                                {/* <TableCell>{item.runtime}</TableCell> */}
                                <TableCell className="text-right">
                                  <Button variant="outline" size="sm" onClick={() => handleShowDetails(item.session_id)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  )}
                  <CardFooter className="flex space-x-2" />
                </Card>
              </div>
            </div>
            <footer className="bg-muted mt-8">
              <div className="container mx-auto px-4 py-2 text-center text-sm text-muted-foreground">
                <p className='inline'>&copy; 2025 MagenticOne showcase powered by </p>
                <img src={ag} alt="Logo" className='w-[18px] inline' />
                <p className='inline'>&nbsp;running on </p>
                <img src={aAif} alt="Logo" className='w-[18px] inline' />
                <p className='inline'>&nbsp;ver. 20250206.2</p>
              </div>
            </footer>

                        {/* Dialog for displaying history details */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent  className="max-w-fit">
                <DialogHeader>
                  <DialogTitle>History Details</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[600px] w-[1200px] rounded-md border p-4">
                <div className='w-full sm:w-full  sm:max-w-lg'>
                  Displaying details for session ID: <strong>{selectedSessionId}</strong>
                </div>
                <div className="mt-4">
                  {/* Find the conversation matching the selected session id */}
                  {(() => {
                    const conversation = historyItems.find(item => item.session_id === selectedSessionId);
                    if (!conversation) {
                      return <p>No conversation found.</p>;
                    }
                    if (!conversation.messages || conversation.messages.length === 0) {
                      return <p>No messages available for this conversation.</p>;
                    }
                    return (
                      <div className="space-y-2">
                        {conversation.messages
                          .filter((message: any) => message.source) // only display messages with defined source
                          .map((message: any, index: any) => (
                          
                          <div key={index} className={`flex ${message.source.toLowerCase() === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-2 rounded-lg shadow ${message.source.toLowerCase() === 'user' ? 'group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[70%] bg-primary text-primary-foreground duration-300 animate-in fade-in-0 zoom-in-75 origin-bottom-right' : 'group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[96%] bg-muted text-foreground duration-300 animate-in fade-in-0 zoom-in-75 origin-bottom-left'}`}>
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={getAvatarSrc(message.source)} />
                                <AvatarFallback>{getAvatarFallback(message.source)}</AvatarFallback>
                                {/* <Bot className="ml-autoaspect-square h-full w-full" /> */}
                              </Avatar>
                              <div className="break-all max-w-[100%]">
                                <p className="text-sm font-semibold">{message.source}</p>
                                <MarkdownRenderer markdownText={message.content} />
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
                      </div>
                    );
                  })()}
                </div>
                </ScrollArea>
                <DialogFooter>
                  <Button onClick={() => setDialogOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarInset>
        </SidebarProvider>
      )}
    </ThemeProvider>
  )
}