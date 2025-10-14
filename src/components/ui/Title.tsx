interface TitleProps {
  text: string;
  splitIndex?: number;
}

export default function Title({ text, splitIndex = 1 }: TitleProps) {
  const words = text.split(" ");

  return (
    <div className="flex items-center gap-1">
      {words.map((word, index) => (
        <h2
          key={index}
          className={`text-2xl font-bold ${index < splitIndex ? "text-secondary" : "text-primary"}`}
        >
          {word}
        </h2>
      ))}
    </div>
  );
}
