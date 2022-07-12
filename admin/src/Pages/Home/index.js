import React from "react";
import Navbar from "../../components/Navbar";
import MoviesList from "./components/MoviesList";
import FormMovies from "./components/FormMovies";
import Footer from "../../components/Footer"



const Home = () => {
  return (
    <>
      <Navbar />
      {/* <MoviesList/> */}
      <FormMovies/>
      <Footer/>

    </>
  );
};

export default Home;
