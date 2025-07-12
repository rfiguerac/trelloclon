// Card.tsx
import { useDrag } from "react-dnd";

interface CardProps {
  id: string;
  title: string;
}

export const Card = ({ id, title }: CardProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(node) => {
        if (node) drag(node);
      }}
      className={`p-4 mb-2 bg-base-100 rounded shadow cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}>
      {title}
    </div>
  );
};
