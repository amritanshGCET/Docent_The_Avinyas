import React from 'react'

function Footer({ onOpenHome }) {

    const handleHomeClick = (event) => {
        event.preventDefault()
        onOpenHome?.()
    }

    return (
        <footer className="bg-slate-900 text-slate-100 mt-12">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <h2 className="text-lg font-bold text-white mb-4">Avinyas</h2>
                        <p className="text-sm text-slate-400 mb-4">
                            Discover the best places to visit with real-time crowd data and travel guides.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20v-7.21H5.93v-2.93h2.36V7.79c0-2.33 1.42-3.61 3.52-3.61 1.00 0 1.86.075 2.11.11v2.44h-1.44c-1.13 0-1.35.54-1.35 1.32v1.73h2.71l-.35 2.93h-2.36V20" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37Z" fill="black"></path>
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="black"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" onClick={handleHomeClick} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Home</a></li>
                            <li><a href="#" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Explore Places</a></li>
                            <li><a href="#" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Crowd Analysis</a></li>
                            <li><a href="#" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Route Navigator</a></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Information</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@lucknowexplore.com" className="hover:text-violet-400 transition-colors">
                                    info@Avinyas.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+919876543210" className="hover:text-violet-400 transition-colors">
                                    +91 9803468969
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Greater Noida, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-slate-800"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-slate-400">
                        © 2026 Avinyas. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex gap-6">
                        <a href="#" className="text-xs text-slate-400 hover:text-violet-400 transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-xs text-slate-400 hover:text-violet-400 transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-xs text-slate-400 hover:text-violet-400 transition-colors">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
