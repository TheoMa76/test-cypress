import React from "react";

interface PokemonCardProps {
  id: string;
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image }) => {
    console.log(id,name,image);
  return (
    <div style={styles.card} key={id}>
      <img src={image} alt={name} style={styles.image} />
      <h3 style={styles.title}>{name}</h3>
    </div>
  );
};

const styles = {
};

export default PokemonCard;
