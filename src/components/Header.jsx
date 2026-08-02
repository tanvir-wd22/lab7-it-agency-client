import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';

const Header = () => {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive ? 'bg-sky-500/10 text-sky-500' : 'text-zinc-500 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 font-bold text-white shadow-lg shadow-sky-500/20">
            L
          </div>

          <div>
            <h1 className="text-base font-semibold tracking-tight text-white">
              Lab<span className="text-sky-500">7</span>
            </h1>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/services" className={navClass}>
            Services
          </NavLink>

          <NavLink to="/aboutUs" className={navClass}>
            About Us
          </NavLink>

          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>

          <NavLink to="/testimonials" className={navClass}>
           Testimonials
          </NavLink>
        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <button className="group inline-flex h-10 items-center gap-2 rounded-md bg-sky-500 px-4 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition-all duration-200 hover:bg-sky-600 hover:shadow-sky-500/30 active:scale-95">
            Get Started
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-zinc-400 transition-colors duration-200 hover:bg-white/5 hover:text-white lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-zinc-950 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 p-4">
          <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/services" className={navClass} onClick={() => setOpen(false)}>
            Services
          </NavLink>

          <NavLink to="/aboutUs" className={navClass} onClick={() => setOpen(false)}>
            About
          </NavLink>

          <NavLink to="/contact" className={navClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          <button className="group mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-sky-500 px-4 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition-all duration-200 hover:bg-sky-600 hover:shadow-sky-500/30 active:scale-95">
            Get Started
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
