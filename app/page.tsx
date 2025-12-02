import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import events from "@/lib/constants";

export default function Page() {
  return (
    <section>
      <h1 className="text-center">
        The hub for every tech <br /> Event you can't miss!
      </h1>
      <p className="text-center mt-5">
        Hackathon, Meetup and Conference, All in one place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7  px-[5px] sm:px-[10px]">
        <h3> Featured Events</h3>
        <ul className="events ">
          {events.map((event) => (
            <li key={event.slug}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
