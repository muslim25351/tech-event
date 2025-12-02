import ExploreBtn from "@/components/ExploreBtn";

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

      <div className="mt-20 space-y-7">
        <h3> Featured Events</h3>
        {[1, 2, 3, 4, 5].map((event) => (
          <li key={event}>Events {event}</li>
        ))}
      </div>
    </section>
  );
}
