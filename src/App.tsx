import { ReactNode, useEffect, useState } from 'react';

function App(): ReactNode {
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_GEOGRAPHY_LIVE_API);
  const [countryDetails, setCountryDetails] = useState<Record<
    string,
    any
  > | null>(null);
  const [copyText, setCopyText] = useState('[COPY]');

  useEffect(() => {
    async function fetchCountryDetails() {
      setCountryDetails(null);
      const rawResponse = await fetch(apiUrl);
      const response = await rawResponse.json();

      if (rawResponse.ok) {
        setCountryDetails(response.details);
      }
    }

    fetchCountryDetails();
  }, [apiUrl]);

  useEffect(() => {
    if (copyText !== '[COPY]')
      setTimeout(() => {
        setCopyText('[COPY]');
      }, 1000);
  }, [copyText]);

  return (
    <>
      <section className='bg-orange-600 font-roboto h-32 lg:h-40 flex items-center justify-center text-center'>
        <h1 className='text-4xl lg:text-6xl font-extrabold text-white'>
          APIPOOL EXAMPLES
        </h1>
      </section>

      <section className='container mx-auto font-roboto m-3'>
        <p className='px-2 text-xs lg:text-base font-semibold underline underline-offset-4'>
          {' '}
          <i className='ri-home-3-line text-amber-500'></i> APIPOOL EXAMPLE /
          GEOGRAPHY APIS
        </p>

        <p className='px-2 mt-1 text-justify'>
          <span className='text-2xl font-bold'>T</span>his section list all the
          apis that are related to geographical information like country name,
          state name and cities name etc. Every api has two environment or types
          i.e., <code className='bg-zinc-200 p-1 rounded-md'>PRODUCTION</code>{' '}
          and <code className='bg-zinc-200 p-1 rounded-md'>DEVELOPMENT</code>.
          Whenever, any change is committed, it is first made available to
          development environment. However, production environment is the
          default environment.
        </p>
      </section>

      <section className='container mx-auto min-h-96 my-2 font-roboto'>
        <div className='flex text-xl px-1 text-blue-700 font-extrabold'>
          <i className='ri-global-line mr-1'></i>
          <h1 className='underline underline-offset-4'>
            1. COUNTRY API EXAMPLE
          </h1>
        </div>

        <p className='my-2 px-2 w-full text-justify'>
          Following table lists all the countries of the world.
        </p>

        <div className='p-2 max-w-sm lg:max-w-xl min-h-20 border border-dotted border-zinc-500 mx-2 lg:mx-auto my-4 rounded-md shadow-md ring-1 ring-offset-2 ring-zinc-800 shadow-zinc-950'>
          <p className='mb-1'>
            {' '}
            <b>API URL :</b> <code className='p-1 break-words'>{apiUrl}</code>{' '}
            <span className='text-blue-700 underline cursor-pointer'>
              <a
                onClick={async event => {
                  event.preventDefault();
                  await window.navigator?.clipboard?.writeText(apiUrl);
                  setCopyText('[COPIED]');
                }}
              >
                {copyText}
              </a>
            </span>
          </p>

          <p>
            {' '}
            <b>HTTP VERB :</b> <code className='p-1 break-words'>GET</code>
          </p>
        </div>

        <div className='flex justify-end items-center mx-2'>
          <select
            className='text-lg font-bold p-2 bg-transparent border border-dashed rounded-md border-orange-300 outline-none text-orange-700 ring-1 ring-offset-2 ring-orange-400'
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;
              if (value === 'dev')
                setApiUrl(import.meta.env.VITE_GEOGRAPHY_DEV_API);
              else setApiUrl(import.meta.env.VITE_GEOGRAPHY_LIVE_API);
            }}
          >
            <option value='live'>PRODUCTION</option>
            <option value='dev'>DEVELOPMENT</option>
          </select>
        </div>

        {!countryDetails ? (
          <table className='w-full my-4 border-collapse border text-xl overflow-x-auto'>
            <thead className='h-10'>
              <tr>
                <th className='border'>Sr. No</th>
                <th className='border'>Country Name</th>
                <th className='border'>Country Code</th>
                <th className='border'>Country Flag</th>
                <th className='border'>Country Dial Code</th>
              </tr>
            </thead>

            <tbody>
              <tr className='text-center text-lg'>
                <td
                  className='p-2 text-center text-xl font-extrabold'
                  colSpan={5}
                >
                  <i className='ri-progress-5-line'></i> Loading...
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className='w-full overflow-auto'>
            <table className='w-full my-4 border-collapse border text-xl mx-1 lg:mx-0'>
              <thead className='h-10'>
                <tr>
                  <th className='border p-2 border-gray-700 w-5'>Sr. No</th>
                  <th className='border p-2 border-gray-700 w-20'>
                    Country Name
                  </th>
                  <th className='border p-2 border-gray-700 w-14'>
                    Country Code
                  </th>
                  <th className='border p-2 border-gray-700 w-14'>
                    Country Flag
                  </th>
                  <th className='border p-2 border-gray-700 w-12'>
                    Country Dial Code
                  </th>
                </tr>
              </thead>

              <tbody>
                {countryDetails.map(
                  (detail: Record<string, any>, index: number) => (
                    <tr className='text-center text-lg' key={index}>
                      <td className='border p-2 border-gray-700 w-5'>
                        {index + 1}
                      </td>
                      <td className='border p-2 border-gray-700 w-20'>
                        {detail.name}
                      </td>
                      <td className='border p-2 border-gray-700 w-10'>
                        {detail.code}
                      </td>
                      <td className='border p-2 border-gray-700 w-10'>
                        {detail.emoji}
                      </td>
                      <td className='border p-2 border-gray-700 w-12'>
                        {detail.dial_code}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
