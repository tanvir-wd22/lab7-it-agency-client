import { FaFacebookF, FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 lg:flex-row lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 font-bold text-white shadow-lg shadow-sky-500/20">
            L
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-white">
              Lab<span className="text-sky-500">7</span>
            </h3>

            <p className="text-xs text-zinc-500">Building modern digital experiences</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Lab7. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-white/5 hover:text-sky-500"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="#"
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-white/5 hover:text-sky-500"
            aria-label="Twitter"
          >
            <FaXTwitter size={18} />
          </a>

          <a
            href="#"
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-white/5 hover:text-sky-500"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>

          <a
            href="#"
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-white/5 hover:text-sky-500"
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
