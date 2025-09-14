import { useState } from 'react';

import {ExternalLink, Link} from 'lucide-react';


const UserListItem = ({ user, searchTerm }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  const handleCopyLink = () => {
    const link = `https://example.com/user/${user?.id}`;
    navigator.clipboard.writeText(link);
    setTooltipText('Link copied!');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const handleOpenInNewTab = () => {
    const link = `https://example.com/user/${user?.id}`;
    window.open(link, '_blank');
  };

  // Highlight matching text

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text?.split(regex);
    return parts?.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 font-medium">{part}</span> : 
        part
    );
  };

  return (
    <div className="group flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors duration-150">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img 
            src={user?.avatar} 
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
            user?.isActive ? 'bg-green-400' : 'bg-gray-300'
          }`}></div>
        </div>
        <div>
          <div className="font-medium text-gray-900">
            {highlightMatch(user?.name, searchTerm)}
          </div>
          <div className="text-sm text-gray-500">
            {user?.isActive ? 'Active' : `Last seen ${user?.lastActive}`}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="relative">
          <button
            onClick={handleCopyLink}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150"
            title="Copy link"
          >
            <Link size={16} />
          </button>
          {showTooltip && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {tooltipText}
            </div>
          )}
        </div>
        <button
          onClick={handleOpenInNewTab}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150"
          title="Open in new tab"
        >
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};


export default UserListItem;