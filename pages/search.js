import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
function search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, guests, endDate } = router.query;

  //const formattedStateDate = format(new Date(startDate), 'dd MMMM yy');
  //const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
  const formattedStateDate = startDate;
  const formattedEndDate = endDate;
  const range = `${formattedStateDate} = ${formattedEndDate}`;
  return (
    <div className="">
      <Header placeholder={`${location} | ${range} | ${guests}`} />
      <div className="flex">
        <section>
          <p className="text-xs">
            300+ Stays - {range} - for {guests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map(({ img, location, title, description, star, price, total }) => (
              <InfoCard key={img} img={img} location={location} title={title} description={description} star={star} price={price} total={total} />
            ))}
          </div>
        </section>
        <section className="hidden xl:flex  flex-grow">
          <Map searchResults={searchResults} />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default search;

export async function getServerSideProps(context) {
  const searchResults = await fetch('https://links.papareact.com/isz').then((res) => res.json());
  return {
    props: {
      searchResults,
    },
  };
}
