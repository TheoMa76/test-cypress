import Input from './components/atoms/Inputs/Input'
import PokemonPage from './components/pages/PokemonPage'

function App() {
  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchInput = document.getElementById('search-input') as HTMLInputElement
    console.log(searchInput.value)
  }
  return (
    <>
    <Input placeholder='Rechercher...' id="search-input" onSubmit={search}></Input>
      <PokemonPage></PokemonPage>
    </>
  )
}

export default App
