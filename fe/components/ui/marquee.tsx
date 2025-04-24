export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border text-foreground font-base bg-transparent">
      <div className="animate-marquee whitespace-nowrap py-9">
        {items.map((item) => {
          return (
            <span key={item} className="mx-24 text-3xl">
              {item}
            </span>
          );
        })}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-9">
        {items.map((item) => {
          return (
            <span key={item} className="mx-24 text-3xl">
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
