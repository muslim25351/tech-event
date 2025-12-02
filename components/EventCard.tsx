import Image from "next/image";
import Link from "next/link";
interface Props {
  title: string;
  image: string;
  location?: string;
  time?: string;
  date?: string;
  slug?: string;
}
export default function EventCard({
  title,
  image,
  location,
  time,
  date,
  slug,
}: Props) {
  return (
    <Link href={`/events/${slug}`} className="space-y-2">
      <Image
        src={image}
        id="event-card"
        alt={title}
        width={300}
        height={410}
        className="poster"
      />
      <div className="flex text-xs gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>
      {/* //title */}
      <p className="title">{title}</p>
      {/* //date and time */}
      <div className="datetime flex gap-4">
        <div className="flex gap-1 text-xs">
          <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
          <p>{date}</p>
        </div>
        <div className="flex gap-1 text-xs">
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
}
