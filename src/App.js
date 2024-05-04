import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb'
import Header from './Components/Header'
import MovieRow from './Components/MovieRow'
import FeaturedMovie from './Components/FeaturedMovie'
import loading from '../src/Assets/loading.gif'

import './App.css'

function App() {

  const [movieList, setMovieList] = useState([])
  const [FeaturedData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      // Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className='page'>

      <Header black={blackHeader} />

      {FeaturedData &&
        <FeaturedMovie item={FeaturedData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p>Feito com <span role='img' aria-label='coração'>❤️</span> por <a href="https://github.com/LucasBondeDeSouza" target='_blank'>Lucas Bonde</a></p>
        <p>Direitos de imagem para Netflix</p>
        <p>Dados pegos do site Themoviedb.org</p>
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src={loading} alt="Carregando" />
        </div>
      }
    </div>
  )
}

export default App