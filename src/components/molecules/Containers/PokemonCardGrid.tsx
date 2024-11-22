import React from "react";
import PokemonCard from "../../atoms/Cards/PokemonCard";

interface PokemonCardGridProps {
  cards: {
    id: string;
    name: string;
    image: string;
  }[];
}

const PokemonCardGrid: React.FC<PokemonCardGridProps> = ({ cards }) => {
  return (
    <div style={styles.grid}>
      {cards.map((card) => (
        <PokemonCard
          key={card.id}
          id={card.id}
          name={card.name}
          image={card.image}
        />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
    padding: "16px",
  },
};

export default PokemonCardGrid;
