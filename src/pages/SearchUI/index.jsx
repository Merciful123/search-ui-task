import { useState, useEffect, useRef, useCallback } from "react";

import {
  Search,
  Settings,
  Loader2,
  Users,
  FileText,
  MessageCircle,
  List,
  Grid,
} from "lucide-react";

import {
  availableTabs,
  mockUsers,
  mockFiles,
  mockChats,
  mockLists,
} from "../../utils/userData.js";

import SettingsModal from "../../components/SettingModal";

import UserListItem from "../../components/UserListItem";

import FileListItem from "../../components/FileListItem";

import ChatListItem from "../../components/ChatListItem";

import ListItems from "../../components/ListItems";

import Skeleton from "../../components/Skeleton";

// Icon mapping for tabs

const tabIcons = {
  all: Grid,
  files: FileText,
  people: Users,
  chat: MessageCircle,
  list: List,
};


const SearchUI = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [allItems, setAllItems] = useState([]);

  const [activeTab, setActiveTab] = useState("all");

  const [tabs, setTabs] = useState(availableTabs);

  const [showSettings, setShowSettings] = useState(false);

  const [tabCounts, setTabCounts] = useState({
    all: 0,
    files: 0,
    people: 0,
    chat: 0,
    list: 0,
  });

  const [hasSearched, setHasSearched] = useState(false);

  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);

  const searchInitiated = useRef(false);

  const inputRef = useRef(null);

  const resultsRef = useRef(null);

  // Handle search input changes

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFocusedItemIndex(-1); // Reset focus when typing

    if (value.trim() && !isExpanded) {
      setIsExpanded(true);
    }

    // Mark that user has started searching
    if (value.trim()) {
      searchInitiated.current = true;
    }
  };

  const [showResults, setShowResults] = useState(false); // Control when to show results

  
  // Debouncing

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  
  // Debounce search term - only update after 800ms of inactivity
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm.trim()) {
        setHasSearched(true);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  
  
  // Calculate counts for each tab
  
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      const peopleCount = mockUsers.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ).length;

      const filesCount = mockFiles.filter((file) =>
        file.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ).length;

      const chatCount = mockChats.filter((chat) =>
        chat.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ).length;

      const listCount = mockLists.filter((list) =>
        list.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ).length;

      setTabCounts({
        all: peopleCount + filesCount + chatCount + listCount,
        people: peopleCount,
        files: filesCount,
        chat: chatCount,
        list: listCount,
      });
    } else {
      // Calculate counts for all items when no search term
      setTabCounts({
        all:
          mockUsers.length +
          mockFiles.length +
          mockChats.length +
          mockLists.length,
        people: mockUsers.length,
        files: mockFiles.length,
        chat: mockChats.length,
        list: mockLists.length,
      });
    }
  }, [debouncedSearchTerm]);

  
  
  // Delay showing results until expansion is complete
  
  useEffect(() => {
    let timer;
    if (isExpanded) {
      timer = setTimeout(() => {
        setShowResults(true);
      }, 1000); // Wait for half of the expansion animation
    } else {
      setShowResults(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isExpanded]);

  
  
  // Filter items based on search term and active tab
  
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        let filteredItems = [];

        // Filter based on active tab
        switch (activeTab) {
          case "all":
            filteredItems = [
              ...mockUsers.filter((user) =>
                user.name
                  .toLowerCase()
                  .includes(debouncedSearchTerm.toLowerCase())
              ),
              ...mockFiles.filter((file) =>
                file.name
                  .toLowerCase()
                  .includes(debouncedSearchTerm.toLowerCase())
              ),
              ...mockChats.filter((chat) =>
                chat.name
                  .toLowerCase()
                  .includes(debouncedSearchTerm.toLowerCase())
              ),
              ...mockLists.filter((list) =>
                list.name
                  .toLowerCase()
                  .includes(debouncedSearchTerm.toLowerCase())
              ),
            ];
            break;
          case "people":
            filteredItems = mockUsers.filter((user) =>
              user.name
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase())
            );
            break;
          case "files":
            filteredItems = mockFiles.filter((file) =>
              file.name
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase())
            );
            break;
          case "chat":
            filteredItems = mockChats.filter((chat) =>
              chat.name
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase())
            );
            break;
          case "list":
            filteredItems = mockLists.filter((list) =>
              list.name
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase())
            );
            break;
          default:
            filteredItems = [];
        }

        setAllItems(filteredItems);
        setIsLoading(false);
        setFocusedItemIndex(-1); // Reset focus when new results come in
      }, 800);

      return () => clearTimeout(timer);
    } else {
      // When search is empty, show all items of the active tab type
      let items = [];
      switch (activeTab) {
        case "all":
          items = [...mockUsers, ...mockFiles, ...mockChats, ...mockLists];
          break;
        case "people":
          items = mockUsers;
          break;
        case "files":
          items = mockFiles;
          break;
        case "chat":
          items = mockChats;
          break;
        case "list":
          items = mockLists;
          break;
        default:
          items = [];
      }
      setAllItems(items);
      setIsLoading(false);
      setFocusedItemIndex(-1);
    }
  }, [debouncedSearchTerm, activeTab]);

 
 
  // Handle clear button
 
  const handleClear = useCallback(() => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setIsExpanded(false);
    setAllItems([]);
    setIsLoading(false);
    setHasSearched(false);
    setFocusedItemIndex(-1);
    searchInitiated.current = false;

    // Return focus to input after clear
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, []);

 
 
  // Handle tab toggle in settings - prevent disabling "All" tab
 
  const handleTabToggle = (tabId) => {
    // Don't allow toggling the "All" tab
    if (tabId === "all") return;

    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === tabId ? { ...tab, enabled: !tab.enabled } : tab
      )
    );
  };

  
  // Keyboard navigation
  
  const handleKeyDown = useCallback(
    (e) => {
      // Focus search when pressing 's' key
      if (e.key === "/" && !isExpanded) {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }

      // Handle escape key
      if (e.key === "Escape") {
        if (isExpanded) {
          handleClear();
        }
      }

      // Handle arrow keys for navigation (only when results are shown)
      
      if (isExpanded && allItems.length > 0 && !isLoading) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setFocusedItemIndex((prev) =>
            prev < allItems.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setFocusedItemIndex((prev) =>
            prev > 0 ? prev - 1 : allItems.length - 1
          );
        } else if (e.key === "Enter" && focusedItemIndex >= 0) {
          e.preventDefault();
          // Simulate clicking on the focused item
          const focusedItem = allItems[focusedItemIndex];
          console.log("Selected item:", focusedItem);
          // You could add logic here to handle the selection
        }
      }
    },
    [isExpanded, allItems, isLoading, focusedItemIndex, handleClear]
  );

 
  // Add global keyboard event listeners
 
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

 
  // Scroll focused item into view
 
  useEffect(() => {
    if (focusedItemIndex >= 0 && resultsRef.current) {
      const focusedElement = resultsRef.current.children[focusedItemIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [focusedItemIndex]);

 
  // Get enabled tabs (always include "All" tab)
 
  const enabledTabs = [
    { id: "all", name: "All", enabled: true, icon: Grid }, // Always include All tab
    ...tabs
      .filter((tab) => tab.enabled && tab.id !== "all")
      .map((tab) => ({
        ...tab,
        icon: tabIcons[tab.id],
      })), // Include other enabled tabs with icons
  ];

  return (
    <div className="min-h-screen bg-neutral-300 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-lg w-full max-w-2xl transition-all duration-1000 ease-out ${
          isExpanded ? "h-120" : "h-16"
        }`}
      >
        <div
          className={`px-3 py-2 ${
            isExpanded ? "border-b border-gray-100" : ""
          }`}
        >
          <div className="flex items-center">
            <div className="flex items-center gap-2 justify-between flex-1">
              {isLoading ? (
                <Loader2 className="text-gray-400 animate-spin" size={20} />
              ) : (
                <Search className="text-gray-400" size={20} />
              )}
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (searchTerm.trim() && !isExpanded) {
                    setIsExpanded(true);
                  }
                }}
                placeholder="Searching is easier"
                className="w-full py-3 border-none outline-none text-gray-900 placeholder-gray-400 bg-transparent text-lg"
              />
            </div>
            {isExpanded ? (
              <button
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                aria-label="Clear search"
              >
                <span className="underline text-gray-800 cursor-pointer">clear</span>
              </button>
            ) : (
              <div className="flex items-center ml-3">
                <div className="relative">
                  <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs font-medium text-gray-600 bg-white shadow-sm">
                    /
                  </div>
                  <div className="absolute top-0 left-0 w-6 h-6 border-2 border-transparent border-b-gray-400 rounded"></div>
                </div>
                <span className="text-sm text-gray-500 ml-2">quick access</span>
              </div>
            )}
          </div>
        </div>
        {/* Expanded Content */}
        {isExpanded && (
          <div className="flex flex-col h-80">
            {/* Tabs Section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1 overflow-x-auto">
                  {enabledTabs.map((tab) => {
                    const IconComponent = tab.icon || Grid;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setFocusedItemIndex(-1); // Reset focus when changing tabs
                        }}
                        className={`cursor-pointer px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-150 flex items-center gap-1 ${
                          activeTab === tab.id
                            ? "bg-gray-100 text-blue-700 border-b-2 border-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <IconComponent size={16} />
                        {tab.name}{" "}
                        <span className="px-2 py-1 bg-gray-100 rounded-md ml-1">
                          {tabCounts[tab.id]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="cursor-pointer p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150"
                    aria-label="Open settings"
                  >
                    <Settings size={20} />
                  </button>
                  <SettingsModal
                    isOpen={showSettings}
                    onClose={() => setShowSettings(false)}
                    tabs={tabs
                      .map((tab) => ({
                        ...tab,
                        icon: tabIcons[tab.id],
                      }))
                      .filter((tab) => tab.id !== "all")} // Hide "All" tab from settings
                    onTabToggle={handleTabToggle}
                  />
                </div>
              </div>
            </div>
            {/* Results Section */}
            <div className="flex-1 p-4 overflow-y-auto" ref={resultsRef}>
              {!showResults ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="animate-spin text-gray-400" size={24} />
                </div>
              ) : isLoading ? (
                <Skeleton />
              ) : allItems.length > 0 ? (
                <div className="space-y-1">
                  {allItems.map((item, index) => {
                    const isFocused = index === focusedItemIndex;
                    const itemProps = {
                      [item.type]: item,
                      searchTerm: searchTerm,
                      className: isFocused
                        ? "bg-blue-50 ring-2 ring-blue-500"
                        : "",
                    };

                    // Only show items that match the active tab
                    if (activeTab === "all") {
                      // For "All" tab, show all item types
                      if (item.type === "user") {
                        return (
                          <UserListItem
                            key={`user-${item.id}`}
                            {...itemProps}
                          />
                        );
                      } else if (item.type === "file") {
                        return (
                          <FileListItem
                            key={`file-${item.id}`}
                            {...itemProps}
                          />
                        );
                      } else if (item.type === "chat") {
                        return (
                          <ChatListItem
                            key={`chat-${item.id}`}
                            {...itemProps}
                          />
                        );
                      } else if (item.type === "list") {
                        return (
                          <ListItems key={`list-${item.id}`} {...itemProps} />
                        );
                      }
                    } else if (activeTab === "people" && item.type === "user") {
                      return (
                        <UserListItem key={`user-${item.id}`} {...itemProps} />
                      );
                    } else if (activeTab === "files" && item.type === "file") {
                      return (
                        <FileListItem key={`file-${item.id}`} {...itemProps} />
                      );
                    } else if (activeTab === "chat" && item.type === "chat") {
                      return (
                        <ChatListItem key={`chat-${item.id}`} {...itemProps} />
                      );
                    } else if (activeTab === "list" && item.type === "list") {
                      return (
                        <ListItems key={`list-${item.id}`} {...itemProps} />
                      );
                    }

                    return null;
                  })}
                </div>
              ) : hasSearched && debouncedSearchTerm.trim() ? (
                <div className="text-center py-8 text-gray-500">
                  <Search size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No items found for "{searchTerm}"</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Search size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Start typing to search...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close settings */}
      {showSettings && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSettings(false)}
        ></div>
      )}
    </div>
  );
};

export default SearchUI;
