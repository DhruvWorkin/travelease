import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, Settings, MapPin } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Navbar = ({
  isAuthenticated = false,
  userName = "Guest User",
  userAvatar = "",
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">
                TravelEase
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary font-medium"
            >
              Home
            </Link>
            <Link
              to="/tours"
              className="text-gray-700 hover:text-primary font-medium"
            >
              Tours
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Authentication buttons or User menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{userName}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="cursor-pointer w-full flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="cursor-pointer w-full flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn("md:hidden bg-white", isMenuOpen ? "block" : "hidden")}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/tours"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            onClick={toggleMenu}
          >
            Tours
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {userName}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 px-5">
              <Button
                variant="outline"
                asChild
                className="w-full justify-center"
              >
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
              </Button>
              <Button asChild className="w-full justify-center">
                <Link to="/signup" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
