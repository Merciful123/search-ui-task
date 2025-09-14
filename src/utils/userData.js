import { FileText, Users, MessageCircle, List } from "lucide-react";

import userImage from "../assets/userPic.jpg";

export const mockUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: userImage,
    isActive: true,
    lastActive: "2 min ago",
    type: "user"
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: userImage,
    isActive: false,
    lastActive: "1 hour ago",
    type: "user"
  },
  {
    id: 3,
    name: "Carol Davis",
    avatar: userImage,
    isActive: true,
    lastActive: "just now",
    type: "user"
  },
];

// Mock file data
export const mockFiles = [
  {
    id: 1,
    name: "Project Report.pdf",
    type: "file",
    size: "2.4 MB",
    lastModified: "2 hours ago"
  },
  {
    id: 2,
    name: "Presentation.pptx",
    type: "file",
    size: "5.1 MB",
    lastModified: "1 day ago"
  },
  {
    id: 3,
    name: "Budget.xlsx",
    type: "file",
    size: "1.2 MB",
    lastModified: "3 days ago"
  },
];

// Mock chat data
export const mockChats = [
  {
    id: 1,
    name: "Design Team",
    type: "chat",
    lastMessage: "Let's schedule a meeting",
    lastActive: "30 min ago"
  },
  {
    id: 2,
    name: "Marketing Group",
    type: "chat",
    lastMessage: "New campaign ideas",
    lastActive: "2 hours ago"
  },
  {
    id: 3,
    name: "Project Discussion",
    type: "chat",
    lastMessage: "Deadline approaching",
    lastActive: "1 day ago"
  },
];

// Mock list data
export const mockLists = [
  {
    id: 1,
    name: "Todo List",
    type: "list",
    itemCount: 5,
    lastModified: "1 hour ago"
  },
  {
    id: 2,
    name: "Shopping List",
    type: "list",
    itemCount: 8,
    lastModified: "2 days ago"
  },
  {
    id: 3,
    name: "Project Tasks",
    type: "list",
    itemCount: 12,
    lastModified: "5 hours ago"
  },
];

// Available tabs (excluding "All" which will always be present)
export const availableTabs = [
  { id: "files", name: "Files", enabled: true, icon: FileText },
  { id: "people", name: "People", enabled: true, icon: Users },
  { id: "chat", name: "Chat", enabled: false, icon: MessageCircle },
  { id: "list", name: "List", enabled: false, icon: List },
];