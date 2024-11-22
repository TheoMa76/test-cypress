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
        const formattedCards = data.cards.map((card: any) => ({
          id: card.id,
          name: card.name,
          image: card.image,
        }));
        setCards(formattedCards);
      } catch (err: any) {
        setError(
          err.message ||
            "Une erreur est survenue lors de la récupération des cartes.",
        );
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
        const formattedCards = data.cards.map((card: any) => ({
          id: card.id,
          name: card.name,
          image: card.image,
        }));
        setCards(formattedCards);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la recherche.");
      }
    } else {
      const data = await fetchPokemonCards();
      const formattedCards = data.cards.map((card: any) => ({
        id: card.id,
        name: card.name,
        image: card.image,
      }));
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
