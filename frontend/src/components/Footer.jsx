

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-200 py-2">
      {/* Main Footer Content */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 px-4">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-white">Socially</h1>
          <p className="text-sm text-gray-400 mt-2">Connect. Share. Inspire.</p>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-right">
          <nav className="space-x-4">
            <a href="/about" className="text-gray-400 hover:text-white transition">
              About Us
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
          </nav>
        </div>
      </div>

    
    </footer>
  );
};

export default Footer;
