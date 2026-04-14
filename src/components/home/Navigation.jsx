import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Navbar = () => {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    )
    gsap.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'back.out(1.7)',
      },
    )
    gsap.fromTo(
      linksRef.current.filter(Boolean),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.6,
        ease: 'power2.out',
      },
    )
  }, [])

  const menuLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Articles', path: '/articles' },
    { name: 'Savings', path: '/savings' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
// correct
{ name: 'Contact', path: '/home?scrollTo=contact' },]
  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-[#003366] h-14 sm:h-16 md:h-20 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-12 shadow-md"
    >
      {/* Logo */}
      <Link to="/home" ref={logoRef}>
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 transition-all duration-300"
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
        {menuLinks.map((item, i) => (
          <li key={item.name} ref={(el) => (linksRef.current[i] = el)}>
            <Link
              to={item.path}
              className="relative text-white text-sm lg:text-base xl:text-lg font-medium hover:text-[#FFB300]
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#FFB300]
              after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          </li>
        ))}

        {/* CTA */}
        <li ref={(el) => (linksRef.current[4] = el)}>
          <Link
            to="/auth?mode=signup"
            className="bg-[#FFB300] text-[#003366] px-3 sm:px-4 xl:px-6 py-1.5 sm:py-2 rounded-md font-bold hover:scale-105 transition-transform text-xs sm:text-sm lg:text-base"
          >
            Sign Up
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-white p-1.5 sm:p-2"
      >
        {isMenuOpen ? '✖' : '☰'}
      </button>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-14 sm:top-16 left-0 right-0 bg-[#003366] shadow-lg transition-all duration-300 ${isMenuOpen
          ? 'opacity-100 max-h-screen'
          : 'opacity-0 max-h-0 overflow-hidden'
          }`}
      >
        <ul className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
          {menuLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white text-base sm:text-lg font-medium hover:text-[#FFB300] py-2 border-b border-white/10"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/auth?mode=signup"
              onClick={() => setIsMenuOpen(false)}
              className="w-full block bg-[#FFB300] text-[#003366] px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-bold hover:scale-105 transition-transform text-center text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
