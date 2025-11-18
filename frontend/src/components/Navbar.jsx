import { Video } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center">
          <div className="flex items-center space-x-2">
            <Video className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Video +18</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
