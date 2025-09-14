const SettingsModal = ({ isOpen, onClose, tabs, onTabToggle }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-50 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-1">
        <div className="">
          {tabs.map((tab) => (
            <div key={tab.id} className="flex items-center justify-between hover:bg-gray-100 p-3">
              <label className="text-sm text-gray-700">{tab.name}</label>
              <button
                onClick={() => onTabToggle(tab.id)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  tab.enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    tab.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;