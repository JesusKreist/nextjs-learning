import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";

const FilteredEventsPage = ({ hasError, noEvent, date, filteredEvents }) => {
  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (noEvent) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={JSON.parse(date)} />
      <EventList items={filteredEvents} />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  const [filterYear, filterMonth] = slug;
  const year = +filterYear;
  const month = +filterMonth;

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props: {
        noEvent: true,
      },
    };
  }

  const date = new Date(year, month - 1);

  return {
    props: {
      filteredEvents,
      date: JSON.stringify(date),
    },
  };
};

export default FilteredEventsPage;
