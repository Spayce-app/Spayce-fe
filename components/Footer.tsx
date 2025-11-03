import { Link } from 'lucide-react'
import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="bg-black text-background py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-lg">S</span>
                                </div>
                                <span className="text-xl font-bold">spayce</span>
                            </div>
                            <p className="text-background/80">Find and book the perfect <span/> workspace for your needs.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">For Renters</h4>
                            <ul className="space-y-2 text-background/80">
                                <li>
                                    <Link href="/find-spaces" className="hover:text-primary transition-colors">
                                        Find Spaces
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">For Hosts</h4>
                            <ul className="space-y-2 text-background/80">
                                <li>
                                    <Link href="/list-space" className="hover:text-primary transition-colors">
                                        List Your Space
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Host Resources
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Success Stories
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-background/80">
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
