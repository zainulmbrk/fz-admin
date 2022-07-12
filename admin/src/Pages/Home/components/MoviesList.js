import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import './MoviesList.css'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


const Loading = () =>{
    // return <div>Loading .....</div>
}


const MoviesList = () =>{
    const [refetch, setRefetch] = useState(false)    
    const [moviesList, setMoviesList] = useState({
        loading: false,
        results: {
            data: []
        }
    });
    const [query, setQuery] = useState({
        title: "",
        sortBy: "",
        orderBy: "",
    })
    useEffect(()=>{
        const { title, sortBy, orderBy } = query
        setMoviesList((prevState) => ({
            ...prevState,
            loading: true
        }))
        axios({
            method: "GET",
            url: `http://localhost:5000/api/v5/movies
            ${title ? `?title=${title}` : ''}
            ${sortBy ? `?sortBy=${sortBy}` : ''}
            ${orderBy ? `&orderBy=${orderBy}` : ''}`,
        }).then((res) => {
            setMoviesList({
                loading: false,
                results: res.data
            })
        }).catch((err)=>{
            console.log(err)
        })
    }, [refetch, query]);

    const dataBefore = (prevData)=>{
        setMoviesList({
            ...prevData,
                release_date: moment(prevData.release_date).format('YYYY-MM-DD')
        })
    }
    Modal.setAppElement('#root');
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false)
    function openModal(){
        setIsOpen(true)
    }
    function closeModal(){
        setIsOpen(false)
    }

    const [modalEditIsOpen, setEditOpen] = useState(false)
    function modalEdit(){
        setEditOpen(true)
    }
    function modalEditClose(){
        setEditOpen(false)
    }

    const [genres, setGenres] = useState([])
    const getGenres = async()=>{
        const result = [{text: 'Choose Genre', value: 0}]
        const data_genre = await fetch("http://localhost:5000/api/v5/genres")
        const value = await data_genre.json()
        value.data.map(item =>{
            result.push({
                text: item.gen_name,
                value: item.genre_id
            })
        })
        setGenres(result)
    }
    useEffect(()=>{
        getGenres()
    }, [])

    const options = [
        {value: '', text: '--Choose an option--'},
      ];

    const [select, setSelect] = useState(options[0].value)

    const handleChange = event => {
        // console.log(event.target.value);

        setSelect(event.target.value);
        setFormAddData(prevState => ({ ...prevState, genre_id: event.target.value }))
    };



      // ADD MOVIES
            
        const [formAddData, setFormAddData] = useState({
            title:'',
            cover:'',
            release_date:'',
            director:'',
            description:'',
            casts:'',
            genre_id: '',
        })

    
        const handleAddMovie = async (e) => {
            e.preventDefault()
            try{
                // console.log(formAddData)
                const result = await axios({
                    method: 'POST',
                    data: formAddData,
                    url: "http://localhost:5000/api/v5/movies"
                })
                if(result.data.status == 200){
                    alert('Successfully added')
                    setRefetch(!refetch)
                }else{
                    alert('Added failed!!!, try again')
                }
            } 
            catch (error){
                alert(error.response.data.message)
            }
        }

        // DELETE MOVIES
        const handleDelete = (movies_id)=>{
            if(window.confirm('Are You Sure?')){
                axios({
                    method: 'DELETE',
                    url: `http://localhost:5000/api/v5/movies/${movies_id}`
                }).then((res)=>{
                    alert(res.data.message)
                    setRefetch(!refetch)
                }).catch((error)=>{
                    alert(error.response.data.message)
                })
            }
        }

        // EDIT MOVIES
        const [formEditData, setFormEditData] = useState({})
        const handleEdit = (prevData) => {
            setFormEditData({
                ...prevData,
                release_date: moment(prevData.release_date).format('YYYY-MM-DD')
                // release_date: new Date(prevData.release_date).toISOString().slice(0, 10)
            })
        }
        const handleUpdateMovie = async (e) => {
            e.preventDefault()
            try {
                const result = await axios({
                    method: 'PATCH',
                    data: formEditData,
                    url: `http://localhost:5000/api/v5/movies/${formEditData.movies_id}`,
                })
                if (result.data.status === 200) {
                    alert('Successfully Updated')
                    setRefetch(!refetch)
                } else {
                    alert('Failed, Try Again')
                }

            } catch (error) {
                alert(error.response.data.message)
                console.log(error)

            }
        }
        console.log(formAddData)
    return(
    
    <>
        <div className='row-container'>
            <div className='modal'>
            <button className='btn-modal' onClick={openModal}>Add Movies</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal">
                    
                <h2>Add Movies</h2>
                
                <form onSubmit={(e) => handleAddMovie(e)} className='form-add-data'>
                <div className='title'>
                <label className='form-label'>Title: </label>
                <input className='input-label' type="text" placeholder='write the title' onChange={(e) => {
                setFormAddData(prevState => ({ ...prevState, title: e.target.value }))}}></input>
                </div>
                <div className='director'>
                <label className='form-label'>Director: </label>
                <input className='input-label' type="text" placeholder='write the director' onChange={(e) => {
                setFormAddData(prevState => ({ ...prevState, director: e.target.value }))}}></input>
                </div>
                <div className='release-date'>
                <label className='form-label'>Release Date: </label>
                <input type="date" className="input-label" placeholder='write the date' onChange={(e) => {
                setFormAddData(prevState => ({ ...prevState, release_date: e.target.value }))}}/>
                </div>
                <div className='casts'>
                <label className='form-label'>Casts: </label>
                <input className='input-label' type="text" placeholder='write the casts' onChange={(e) => {
                setFormAddData(prevState => ({ ...prevState, casts: e.target.value }))}}></input>
                </div>
                <div className='cover'>
                <label className='form-label'>Cover: </label>
                <input className='input-label' type="text" placeholder='write the cover' onChange={(e) => {
                setFormAddData(prevState => ({ ...prevState, cover: e.target.value }))}}></input>
                </div>
                <div className='genre'>
                <label>Genre: </label>
                <select className='select-genres' value={select} onChange={handleChange}>
                {genres.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.text}
                    </option>
                    ))}
                </select>
                {/* <Select options={genres} onChange={(e) => {
                setFormAddData(prevState => ({ ...prevState, genre_id: e.target.value }))}}></Select> */}
                </div>
                <div className='description'>
                <label className='form-label'>Synopsis: </label>
                <textarea className='input-area' onChange={(e) => {
                setFormAddData(prevState => ({ ...prevState, description: e.target.value }))}}></textarea>
                </div>
                <div className='btn-confirm'>
                    <div className='btn-confirm1'>
                    <button className='btn-save' onClick={(e)=> handleAddMovie(e)}>save</button>
                    </div>
                    <div className='btn-confirm2'>
                    <button className='btn-cancel' onClick={closeModal}>cancel</button>
                    </div>
                </div>
                </form>
            </Modal>
            
            
            <div className='modal-delete'>
                {moviesList.results.data.map((movies, index)=>{
                    return(
                        <div className='card-movie-details' key={index}>
                            <img className='cover' 
                            src={`${movies.cover}`} 
                            alt={movies.title} 
                            title={movies.title}/>
                            <div className='btn-action'>
                            <button className='btn-modal-delete' 
                            onClick={()=>handleDelete(movies.movies_id)}>Delete Movies</button>
                            <button className='btn-modal-edit' onClick={modalEdit}>Edit Movies</button>
                            </div>
                            <Modal
                            isOpen={modalEditIsOpen}
                            onRequestClose={modalEditClose}>
                                <h2>Edit Movies</h2>
                
                                <form onSubmit={(e) => handleUpdateMovie(e)} className='form-edit-data'>
                                <div className='movies-id'>
                                <label className='form-label'>Movies Id:</label>                                                            
                                <input className='input-label' type="text" placeholder="write the movie id" onChange={(e) => {
                                setFormEditData(prevState => ({ ...prevState, movies_id: e.target.value }))}}></input>
                                </div>
                                <div className='title'>
                                <label className='form-label'>Title: </label>
                                <input className='input-label' type="text" placeholder='write the title' onChange={(e) => {
                                setFormEditData(prevState => ({ ...prevState, title: e.target.value }))}}></input>
                                </div>
                                <div className='director'>
                                <label className='form-label'>Director: </label>
                                <input className='input-label' type="text" placeholder='write the director' onChange={(e) => {
                                setFormEditData(prevState => ({ ...prevState, director: e.target.value }))}}></input>
                                </div>
                                <div className='release-date'>
                                <label className='form-label'>Release Date: </label>
                                <input type="date" className="input-label" placeholder='write the date' onChange={(e) => {
                                setFormEditData(prevState => ({ ...prevState, release_date: e.target.value }))}}/>
                                </div>
                                <div className='casts'>
                                <label className='form-label'>Casts: </label>
                                <input className='input-label' type="text" placeholder='write the casts' onChange={(e) => {
                                setFormEditData(prevState => ({ ...prevState, casts: e.target.value }))}}></input>
                                </div>
                                <div className='cover'>
                                <label className='form-label'>Cover: </label>
                                <input className='input-label' type="text" placeholder='write the cover' onChange={(e) => {
                                setFormEditData(prevState => ({ ...prevState, cover: e.target.value }))}}></input>
                                </div>
                                <div className='genre'>
                                <label>Genre: </label>
                                <select className='select-genres' value={select} onChange={handleChange}>
                                    {genres.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.text}
                                    </option>
                                ))}
                                </select>
                                </div>
                                <div className='description'>
                                <label className='form-label'>Synopsis: </label>
                                <textarea className='input-area' onChange={(e) => {
                                setFormEditData(prevState => ({ ...prevState, description: e.target.value }))}}></textarea>
                                </div>
                                <div className='btn-confirm'>
                                    <div className='btn-confirm1'>
                                    <button className='btn-save' onClick={(e)=> handleUpdateMovie(e)}>save</button>
                                    </div>
                                    <div className='btn-confirm2'>
                                    <button className='btn-cancel' onClick={modalEditClose}>cancel</button>
                                    </div>
                                </div>
                                </form>

                            </Modal>
                        </div>
                    )
                })}
            
            </div>
            </div>
            <div className='card-movie-details'>
            {!moviesList.length ? (<Loading/>) : moviesList.map((movies, index)=>{
               return(
                <div className='card-inside' key={index}>
                <div className='cover'>
                  <img
                  src={`${movies.cover}`}
                  alt={movies.title}
                  title={movies.title}
                />
                
                </div>
                <div className='title'>
                    <p>Title: {`${movies.title}`} </p>
                </div>
                <div className='genre'>
                    <p>Genre: {`${movies.gen_name}`} </p>
                </div>
                <div className='director'>
                    <p>Director: {`${movies.director}`} </p>
                </div>
                <div className='release-date'>
                    <p>Release Date: {`${movies.release_date}`} </p>
                </div>
                <div className='casts'>
                    <p>Casts: {`${movies.casts}`} </p>
                </div>
                <div className='description'>
                    <p>Description: {`${movies.description}`} </p>
                </div>
                </div>
               
                
               )
            })}
            </div>
            
        </div>   
    </>
    )
    
  
}



export default MoviesList