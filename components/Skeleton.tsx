import React from 'react'

const Skeleton = () => {
  return (
    <div className='w-full h-28 bg-white rounded-sm shadow flex'>
        <div className='p-4 grid w-full gap-2'>
            <p className='capitalize p-1 bg-gray-100 animate-pulse rounded-md'></p>
            <div className='flex gap-3 w-full'>
                <p className='font-medium p-1 bg-gray-100 w-full animate-pulse rounded-md'></p>
                <p className='line-through p-1 bg-gray-100 w-full animate-pulse rounded-md'></p>
            </div>
        </div>
    </div>
  )
}

export default Skeleton