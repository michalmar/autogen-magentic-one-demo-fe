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
import { Bot, Plus, Loader2, LogOut, Download, Delete, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

// New imports for the history table.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns'

import { AgentsSetup } from '@/components/agents-setup';
import { MarkdownRenderer } from '@/components/markdown-display';
import { ModeToggle } from '@/components/mode-toggle'
import { LoginCard } from "@/components/login";

import h1 from '@/assets/h1.png';
import lBrain from '@/assets/l-brain.png';
import lPen from '@/assets/l-pen.png';
import lSearch from '@/assets/l-search.png';
import lAi from '@/assets/l-ai.png';
import ag from '@/assets/ag.png';
import aAif from '@/assets/azure-aif.png';

// TODO: FUJ! How to get ENV vars from SWA?
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://autogen-demo-be2.whiteground-dbb1b0b8.eastus.azurecontainerapps.io";
const ALLWAYS_LOGGED_IN =
  import.meta.env.VITE_ALLWAYS_LOGGED_IN === "true" ? true : false;
const ACTIVATION_CODE = import.meta.env.VITE_ACTIVATON_CODE || "0000";

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

export default function PlaygroundHistory() {
  const [sessionID, setSessionID] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(BASE_URL)

  // New state for history items.
  const [historyItems, setHistoryItems] = useState([
    { id: 1, name: 'Item 1', description: 'Description for Item 1', user: 'User 1', runtime: '10s', createdAt: new Date() },
    { id: 2, name: 'Item 2', description: 'Description for Item 2', user: 'User 2', runtime: '20s', createdAt: new Date() },
  ])

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
              <Separator  />
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
                  <CardContent className="flex-1 h-96 overflow-auto">
                    <Separator />
                    <div className="space-y-4">
                      {/* Show history */}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Date &amp; Time</TableHead>
                            <TableHead>Runtime</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {historyItems.map(item => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.id}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.user}</TableCell>
                              <TableCell>{format(item.createdAt, 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                              <TableCell>{item.runtime}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
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
          </SidebarInset>
        </SidebarProvider>
      )}
    </ThemeProvider>
  )
}