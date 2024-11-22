import React, { FormEvent, useEffect, useState } from "react";
import PokemonCardGrid from "../molecules/Containers/PokemonCardGrid";
import { fetchPokemonCards } from "../../api/pokemon";
import Input from "../atoms/Inputs/Input";

interface PokemonCard {
  id: string;
  name: string;
  image: string;
}

const PokemonPage: React.FC = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchPokemonCards();
        const formattedCards = data.cards.map(
          (card: { id: string; name: string; image: string }) => ({
            id: card.id,
            name: card.name,
            image: card.image,
          }),
        );
        setCards(formattedCards);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        } else {
          console.error("An unknown error occurred");
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  const search = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Recherche en cours... avec ", query);
    if (query) {
      try {
        const data = await fetchPokemonCards(query);
        const formattedCards = data.cards.map(
          (card: { id: string; name: string; image: string }) => ({
            id: card.id,
            name: card.name,
            image: card.image,
          }),
        );
        setCards(formattedCards);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        } else {
          console.error("An unknown error occurred");
          setError("An unknown error occurred");
        }
      }
    } else {
      const data = await fetchPokemonCards();
      const formattedCards = data.cards.map(
        (card: { id: string; name: string; image: string }) => ({
          id: card.id,
          name: card.name,
          image: card.image,
        }),
      );
      setCards(formattedCards);
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1>Liste des cartes Pokémon</h1>
      <div>
        <Input
          onChange={(e) => setQuery(e.target.value)}
          ide="search-input"
          placeholder="Rechercher..."
          value={query}
          onSubmit={search}
        />
      </div>
      <PokemonCardGrid cards={cards} />
    </div>
  );
};

export default PokemonPage;
