import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"


const apiKey="41f5a43ec0b94d50d0d04df19c17c489"
const url="https://api.themoviedb.org/3"
const imgUrl='https://image.tmdb.org/t/p/original'


const Card = ({ img }) => (
  <img className="card" src={img} alt="cover" />
)

const Row = ({ title, arr = [{
  img: "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg"
}] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {
        arr.map((item,index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))
      }
    </div>
  </div>
)

const Home = () => {

  const [popularMovies,setPopularMovies]=useState([]);
  const [nowPlaying,setNowPlaying]=useState([]);
  const [popularTv,setPopularTv]=useState([]);
  const [upcoming,setUpcoming]=useState([]);
  const [toprated,setTopRated]=useState([]);
  

  useEffect(()=>{
    const fetchPopular=async()=>{
      const {data:{results}}= await axios.get(`${url}/movie/popular?api_key=${apiKey}&language=en-US&page=1#`)
      setPopularMovies(results);
    };
    const fetchNowPlaying=async()=>{
      const {data:{results}}= await axios.get(`${url}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1#`)
      setNowPlaying(results);
    };
    const fetchTvPopular=async()=>{
      const {data:{results}}= await axios.get(`${url}/tv/popular?api_key=${apiKey}&language=en-US&page=1#`)
      setPopularTv(results);
    };
    const fetchUpcoming=async()=>{
      const {data:{results}}= await axios.get(`${url}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1#`)
      setUpcoming(results);
    };

    const fetchTopRated=async()=>{
      const {data:{results}}= await axios.get(`${url}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1#`)
      setTopRated(results);
    };

    

    fetchPopular();
    fetchNowPlaying();
    fetchTvPopular();
    fetchUpcoming();
    fetchTopRated();
    
  },[])

  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`:"none"
      }}>
       {popularMovies[0] && <h1>{popularMovies[0].title}</h1>}
       {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
      <div>
       <button><BiPlay/>Play</button>
       <button>My List<AiOutlinePlus/></button>
       </div>
        
      </div>
      <Row title={'Popular on Netflix'} arr={popularMovies} />
      <Row title={'Upcoming'} arr={upcoming} />
      <Row title={'Top Rated'} arr={toprated}/>
      <Row title={'Now Playing'}  arr={nowPlaying}/>
      <Row title={'Popular On Tv'} arr={popularTv}/>
      

    </section>
  )
}

export default Home