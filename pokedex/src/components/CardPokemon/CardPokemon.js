import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {MainContainer, Card} from './styled'
import {toDetails} from '../../router/Coordinator'
import { GlobalContext } from '../../global/GlobalContext';

export const CardPokemon = (props) => {
  const navigate = useNavigate()
  const [ pokemon, setPokemon] = useState([]);
  const [ imagem, setImage] = useState([])
  const  {states, setter, requests}  = useContext(GlobalContext);
  const {listPokemon, setListPokemon} = requests
  //  const  {setter}  = useContext(GlobalContext);
   const pokedex = states.pokedex
   const setPokedex = setter.setPokedex


  const listDetailsPokemon = async() => { 
    await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${props.pokeName}`)
    .then((res) => {
      setPokemon(res.data);
      setImage(res.data.sprites.other["official-artwork"].front_default)
    })
    .catch((err) => {
      alert("Houve um erro, tenta novamente!")
    });
  }

useEffect(() => {
  listDetailsPokemon()
}, []);

const addPokedex = (pokemon) => {
  const hasPokemonInPokedex = pokedex.find((item)=> item.name === pokemon.name)
  if(hasPokemonInPokedex) {
    const newPokedex = pokedex.filter((item) => {
      return (
        item.name != pokemon.name
      )
    })
    setPokedex(newPokedex)
    setListPokemon([...listPokemon, pokemon])
    return
  }
  //  Colocando o código abaixo dentro do else faz a mesma coisa do return!!!
  setPokedex([...pokedex, pokemon])
  const newPokemonList = listPokemon.filter((item) => {
    return (
      item.name != pokemon.name
    )
  })  
  setListPokemon(newPokemonList)
 
}


return (
  <MainContainer>
    <Card>
      <img src={imagem} alt={`Foto do pokemon ${pokemon.name}`} />
      <div>
        <button onClick={() => addPokedex(pokemon, imagem)} >{props.button}</button>
        <button onClick={()=> toDetails(navigate, pokemon.name)}>Ver detalhes</button>
      </div>
    </Card>
  </MainContainer>
);
}

