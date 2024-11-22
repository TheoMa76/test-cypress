import React from "react";

interface PokemonCardProps {
  id: string;
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image }) => {
  return (
    <div style={styles.card} key={id}>
      <img src={image} alt={name} />
    </div>
  );
};

const styles = {};

export default PokemonCard;
