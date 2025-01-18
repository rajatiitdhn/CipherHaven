import React from 'react'

const Button = ({ name, setSelectedTab, selectedTab }) => {
    return (

        <button
            className={`w-full py-2 text-left px-4 rounded-lg mt-2 ${selectedTab === 'aes' ? 'bg-[#16a34a] text-white' : 'bg-gray-700'}`}
            onClick={() => setSelectedTab('aes')}
        >
            {name}
        </button>
    )
}

export default Button