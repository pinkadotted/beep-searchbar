import React from 'react'

interface FancyItemProps {
    data: any
}

const FancyItem: React.FC<FancyItemProps> = ({data}) => {
  return (
    <div className='flex flex-col justify-start w-full'>
        <div className='flex justify-start'>
            Name: {data.name}
        </div>
        <div className='flex justify-start'>
            Country: {data.currency.code}
        </div>
    </div>
  )
}

export default FancyItem