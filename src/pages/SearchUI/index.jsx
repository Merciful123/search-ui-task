import { useState, useEffect, useRef } from "react";

import { Search, Settings, Loader2 } from "lucide-react";

import {
  availableTabs,
  mockUsers,
  mockFiles,
  mockChats,
} from "../../utils/userData.js";

import SettingsModal from "../../components/SettingModal";

import UserListItem from "../../components/UserListItem";

import FileListItem from "../../components/FileListItem";

import ChatListItem from "../../components/ChatListItem";

import Skeleton from "../../components/Skeleton";

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
  });

  const [hasSearched, setHasSearched] = useState(false);

  const searchInitiated = useRef(false);

  // Handle search input changes

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() && !isExpanded) {
      setIsExpanded(true);
    }

    // Mark that user has started searching

    if (value.trim()) {
      searchInitiated.current = true;
    }
  };

  // Debouncing

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term - only update after 500ms of inactivity

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm.trim()) {
        setHasSearched(true);
      }
    }, 1000);
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

      setTabCounts({
        all: peopleCount + filesCount + chatCount,
        people: peopleCount,
        files: filesCount,
        chat: chatCount,
      });
    } else {
      setTabCounts({
        all: mockUsers.length + mockFiles.length + mockChats.length,
        people: mockUsers.length,
        files: mockFiles.length,
        chat: mockChats.length,
      });
    }
  }, [debouncedSearchTerm]);

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
          default:
            filteredItems = [];
        }

        setAllItems(filteredItems);
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setAllItems([]);
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, activeTab]);

  // Handle clear button

  const handleClear = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setIsExpanded(false);
    setAllItems([]);
    setIsLoading(false);
    setHasSearched(false);
    searchInitiated.current = false;
  };

  // Handle tab toggle in settings - prevent disabling "All" tab

  const handleTabToggle = (tabId) => {
    if (tabId === "all") return; // Prevent toggling the "All" tab

    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === tabId ? { ...tab, enabled: !tab.enabled } : tab
      )
    );
  };

  // Get enabled tabs

  const enabledTabs = tabs.filter((tab) => tab.enabled);

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
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Searching is easier"
                className="w-full py-3 border-none outline-none text-gray-900 placeholder-gray-400 bg-transparent text-lg"
              />
            </div>
            {isExpanded ? (
              <button
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <span className="underline text-gray-800">clear</span>
              </button>
            ) : (
              <div className="flex items-center ml-3">
                <div className="relative">
                  <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs font-medium text-gray-600 bg-white shadow-sm">
                    s
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
                  {enabledTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-150 ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-700 border-b-2 border-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {tab.name} ({tabCounts[tab.id]})
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150"
                  >
                    <Settings size={20} />
                  </button>
                  <SettingsModal
                    isOpen={showSettings}
                    onClose={() => setShowSettings(false)}
                    tabs={tabs}
                    onTabToggle={handleTabToggle}
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex-1 p-4 overflow-y-auto">
              {isLoading ? (
                <Skeleton />
              ) : allItems.length > 0 ? (
                <div className="space-y-1">
                  {allItems.map((item) => {
                    if (item.type === "user" || activeTab === "people") {
                      return (
                        <UserListItem
                          key={item.id}
                          user={item}
                          searchTerm={searchTerm}
                        />
                      );
                    } else if (item.type === "file" || activeTab === "files") {
                      return (
                        <FileListItem
                          key={item.id}
                          file={item}
                          searchTerm={searchTerm}
                        />
                      );
                    } else if (item.type === "chat" || activeTab === "chat") {
                      return (
                        <ChatListItem
                          key={item.id}
                          chat={item}
                          searchTerm={searchTerm}
                        />
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
