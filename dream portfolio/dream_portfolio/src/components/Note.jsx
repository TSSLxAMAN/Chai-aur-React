import React, { memo } from 'react'

const Note = memo(() => {
    return (
        <div className='overflow-hidden rounded-xl border border-green-700 shadow-lg p-6'>

            <p className="font-semibold text-green-800 text-xl"> Important Info:</p>
            <p className='text-sm text-green-700'>
                The stock is <strong>bought</strong> at the <span className="font-bold">open price</span> on the buying date and <strong>sold</strong> at the <span className="font-bold">closing price</span> on the selling date.
            </p>

        </div>
    )
});

export default Note     