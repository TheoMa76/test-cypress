// src/components/pages/PokemonPage.tsx
import React, { useEffect, useState } from "react";
import PokemonCardGrid from "../molecules/Containers/PokemonCardGrid";
import { fetchPokemonCards } from "../../api/pokemon";

interface PokemonCard {
  id: string;
  name: string;
  image: string;
}

const PokemonPage: React.FC = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchPokemonCards();
        const formattedCards = data.cards.map((card: any) => ({
          id: card.id,
          name: card.name,
          image: card.image,
        }));
        setCards(formattedCards);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors de la récupération des cartes.");
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1>Liste des cartes Pokémon</h1>
      <PokemonCardGrid cards={cards} />
    </div>
  );
};

export default PokemonPage;
