// import userImage from "../assets/userPic.jpg";

// // Mock user data

// export const mockUsers = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     avatar: { userImage },
//     isActive: true,
//     lastActive: "2 min ago",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     avatar: { userImage },
//     isActive: false,
//     lastActive: "1 hour ago",
//   },
//   {
//     id: 3,
//     name: "Carol Davis",
//     avatar: { userImage },
//     isActive: true,
//     lastActive: "just now",
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     avatar: { userImage },
//     isActive: false,
//     lastActive: "3 hours ago",
//   },
//   {
//     id: 5,
//     name: "Emma Brown",
//     avatar: { userImage },
//     isActive: true,
//     lastActive: "5 min ago",
//   },
// ];

// // Available tabs
// export const availableTabs = [
//   { id: "all", name: "All", enabled: true },
//   { id: "users", name: "Users", enabled: true },
//   { id: "groups", name: "Groups", enabled: false },
//   { id: "files", name: "Files", enabled: false },
// ];




// userData.js
import userImage from "../assets/userPic.jpg";

// Mock user data
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

// Available tabs
export const availableTabs = [
  { id: "all", name: "All", enabled: true },
  { id: "files", name: "Files", enabled: true },
  { id: "people", name: "People", enabled: true },
  { id: "chat", name: "Chat", enabled: false },
];