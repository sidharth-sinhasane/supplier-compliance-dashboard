const NavButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-gray-700 hover:text-blue-500 focus:outline-none"
  >
    {children}
  </button>
);
export const TopBar = ({ setCurrentPage }) => {
    return (
        <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <NavButton onClick={() => setCurrentPage('home')}>
                Home
              </NavButton>
              <NavButton onClick={() => setCurrentPage('suppliers-view')}>
                View suppliers
              </NavButton>
              <NavButton onClick={() => setCurrentPage('upload-compliance')}>
                Upload Compliance
              </NavButton>
            </div>
          </div>
        </div>
      </nav>
    );
  };
