'use client'

const NextPrevButtons = ({
  prevFunction,
  nextFunction,
}: {
  [key: string]: () => void
}) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row my-2.5 lg:my-0">
        <button
          type="button"
          className="max-h-[40px] bg-gray-800 text-white rounded lg:rounded-none lg:rounded-l-md sm:border-b lg:border-0 lg:border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3 mx-3 lg:mx-0"
          onClick={prevFunction}
        >
          <div className="flex flex-row align-middle">
            <svg
              className="w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="ml-2">Prev</p>
          </div>
        </button>
        <button
          type="button"
          className="max-h-[40px] bg-gray-800 text-white rounded lg:rounded-none lg:rounded-r-md py-2 sm:border-t lg:border-0 lg:border-l border-gray-200 hover:bg-red-700 hover:text-white px-3 mx-3 lg:mx-0"
          onClick={nextFunction}
        >
          <div className="flex flex-row align-middle">
            <span className="mr-2">Next</span>
            <svg
              className="w-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

export default NextPrevButtons
