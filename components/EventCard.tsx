import Image from "next/image";
import Link from "next/link";
interface Props {
  title: string;
  image: string;
}
export default function EventCard({ title, image }: Props) {
  return (
    <Link href={"/event"}>
      <Image
        src={image}
        id="event-card"
        alt={image}
        width={300}
        height={410}
        className="poster"
      />

      <p className="title">{title}</p>
    </Link>
  );
}
