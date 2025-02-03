import React, { useState, FormEvent } from "react";


interface ImageResult {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
  links: {
    html: string;
  };
}

const App: React.FC = () => {
  const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
  const [inputData, setInputData] = useState<string>("");
  const [results, setResults] = useState<ImageResult[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showMore, setShowMore] = useState<boolean>(false);

  const searchImages = async () => {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      setResults(data.results);
    } else {
      setResults((prevResults) => [...prevResults, ...data.results]);
    }

    setPage((prevPage) => prevPage + 1);
    setShowMore(page > 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setResults([]); 
    searchImages();
  };

  const handleShowMore = () => {
    searchImages();
  };

  return (
    <div className='flex items-center justify-center pt-10 font-sans'>
      <div className='w-[80%] flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>Image Search App</h1>
        <form onSubmit={handleSubmit} className='mt-10 flex text-xl w-full'>
          <input
            className='border rounded-l-md px-4 py-1 w-full'
            type="text"
            placeholder='Search for images...'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button className='rounded-r-md text-white bg-blue-400 hover:bg-blue-600 duration-200 ease-in-out px-3 py-1' type="submit">
            Search
          </button>
        </form>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
          {results.map((result) => (
            <a href={result.links.html} target="_blank" rel="noopener noreferrer" key={result.id} className='group search-result cursor-pointer hover:shadow-md'>
              <img src={result.urls.small} alt={result.alt_description} className="rounded w-[100%] h-[200px] overflow-hidden object-cover" />
              <span className="text-[14px] text-gray-600">
                {result.alt_description}
              </span>
            </a>
          ))}
        </div>

        {showMore ? (
          <button
            id="show-more-button"
            className='mt-4 text-blue-500 mb-5 hover:text-blue-700 hover:border-b-2 border-blue-700'
            onClick={handleShowMore}
          >
            Show More
          </button>
        ) : ''}
      </div>
    </div>
  );
};

export default App;