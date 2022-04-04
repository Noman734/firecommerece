import React from 'react'
function Footer() {
    return (
        <div>
            <footer className="bg-green-700
             text-3xl text-white text-center
             border-t-4 border-red-500
             fixed
             inset-x-0
             bottom-0
             p-4">
                <div className="container mx-auto px-6">
                    <div className="sm:flex sm:mt-8">
                        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-700 uppercase mb-2">Footer header 1</span>
                                <span className="my-2"><p>First paragraph</p></span>
   
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">Footer header 2</span>
                                <span className="my-2"><p>Second paragraph</p></span>
                                
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">Footer header 3</span>
                                <span className="my-2"><p>Third paragraph</p></span>
                           
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6">
                    <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
                        <div className="sm:w-2/3 text-center py-6">
                            <p className="text-sm text-blue-700 font-bold mb-2">
                                © 2022 by Noman Razzaq
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer