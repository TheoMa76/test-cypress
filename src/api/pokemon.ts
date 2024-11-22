interface SimplifiedPokemonCard {
  id: string;
  name: string;
  image: string;
}

interface PokemonApiResponse {
  totalCount: number;
  count: number;
  pageSize: number;
  page: number;
  cards: SimplifiedPokemonCard[];
}

export async function fetchPokemonCards(
  findName = "",
): Promise<PokemonApiResponse> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const pageSize = import.meta.env.VITE_API_LIMIT ?? 10;

  if (!apiUrl || !apiKey) {
    throw new Error(
      "API URL or API Key is not defined in the environment variables.",
    );
  }

  const url = new URL(`${apiUrl}/v2/cards`);
  if (findName != "") {
    url.searchParams.append("q", `name:${findName}`);
  }
  url.searchParams.append("pageSize", pageSize.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon cards: ${response.statusText}`);
  }

  const data = await response.json();

  const defaultImage = "https://via.placeholder.com/300x400?text=No+Image";
  return {
    totalCount: data.totalCount,
    count: data.count,
    pageSize: data.pageSize,
    page: data.page,
    cards: data.data.map((card: { id: string; name: string; images?: { small: string } }) => ({
      id: card.id,
      name: card.name,
      image: card.images?.small ?? defaultImage,
    })),
  };
}
