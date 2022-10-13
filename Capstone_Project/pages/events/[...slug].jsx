import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";
import useSwr from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSwr(
    "https://nextjs-course-168de-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    const events = [];

    for (const key in data) {
      events.push(data[key]);
    }

    setLoadedEvents(events);
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events." />
    </Head>
  );

  if (!loadedEvents || !filterData) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const [filterYear, filterMonth] = filterData;
  const year = +filterYear;
  const month = +filterMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${month}/${year}`} />
    </Head>
  );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export const getServerSideProps = async ({ params }) => {
//   const { slug } = params;

//   const [filterYear, filterMonth] = slug;
//   const year = +filterYear;
//   const month = +filterMonth;

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({ year, month });

//   if (!filteredEvents || filteredEvents.length === 0) {
//     return {
//       props: {
//         noEvent: true,
//       },
//     };
//   }

//   const date = new Date(year, month - 1);

//   return {
//     props: {
//       filteredEvents,
//       date: JSON.stringify(date),
//     },
//   };
// };

export default FilteredEventsPage;
