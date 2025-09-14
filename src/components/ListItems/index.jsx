import { useState } from 'react';

import { ExternalLink, Link, List } from 'lucide-react';


const ListItems = ({ list, searchTerm }) => {

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  const handleCopyLink = () => {
    const link = `https://example.com/list/${list?.id}`;
    navigator.clipboard.writeText(link);
    setTooltipText('Link copied!');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const handleOpenInNewTab = () => {
    const link = `https://example.com/list/${list?.id}`;
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
          <List size={32} className="text-gray-500" />
        </div>
        <div>
          <div className="font-medium text-gray-900">
            {highlightMatch(list?.name, searchTerm)}
          </div>
          <div className="text-sm text-gray-500">
            {list?.itemCount} items • {list?.lastModified}
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

export default ListItems;