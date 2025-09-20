import React from 'react'

const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full bg-slate-800 text-white text-center p-4 sm:p-6">
            {/* Logo */}
            <div className="text-lg sm:text-xl font-bold flex justify-center gap-3 ">
                <div className="flex justify-center gap-0 items-center">

                <span className="text-green-700">&lt;</span>
                Pass
                <span className="text-green-700">OP/&gt;</span>
                </div>

            {/* Tagline */}
            <div className="text-sm sm:text-base mt-0.5">
                Created with ❤️ with reference
            </div>
            </div>
        </div>
    )
}

export default Footer
