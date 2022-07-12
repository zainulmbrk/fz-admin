import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css'
import './FormMovies.css'



const Loading = () =>{
    return <div>Loading .....</div>
}

const FormMovies = () =>{

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
            url: `http://localhost:9511/api/v5/movies?page=1&limit=10
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

    // const dataBefore = (prevData)=>{
    //     setMoviesList({
    //         ...prevData,
    //             release_date: moment(prevData.release_date).format('YYYY-MM-DD')
    //     })
    // }
    const [genres, setGenres] = useState([])
    const getGenres = async()=>{
        const result = [{text: 'Choose Genre', value: 0}]
        const data_genre = await fetch("http://localhost:9511/api/v5/genres")
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
                console.log(formAddData)
                const result = await axios({
                    method: 'POST',
                    data: formAddData,
                    url: "http://localhost:9511/api/v5/movies",
                    body: file
                })
                if(result.data.status == 200){
                    alert('Successfully added')
                    setRefetch(!refetch)
                }else{
                    alert('Added failed!!!, try again')
                }
            } 
            catch (error){
                alert(error)
            }
        }

         // DELETE MOVIES
         const handleDelete = (movies_id)=>{
            if(window.confirm('Are You Sure?')){
                axios({
                    method: 'DELETE',
                    url: `http://localhost:9511/api/v5/movies/${movies_id}`
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
            })
        }
        console.log(formEditData)
        const handleUpdateMovie = async (e) => {
            e.preventDefault()
            try {
                const result = await axios({
                    method: 'PATCH',
                    data: formEditData,
                    url: `http://localhost:9511/api/v5/movies/${formEditData.movies_id}`,
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

    Modal.setAppElement('#root');
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false)
    // function openModal(){
    //     setIsOpen(true)
    // }
    // function closeModal(){
    //     setIsOpen(false)
    // }

    const [modalEditIsOpen, setEditOpen] = useState(false)
    function modalEdit(){
        setEditOpen(true)
    }
    
    function modalEditClose(){
        setEditOpen(false)
    }
    return(<>
        <div className="row-form">
            <div className='header-form'>
            <h3>Form Movie</h3>
            </div>
            <div className="card-form">
                <form onSubmit={(e) => handleAddMovie(e)} className="form-add-data" encType='multipart/form-data' method='post'>
                    <div className="top">
                        <div className="left-side">
                            <div className="file-cover">
                                <label className="myfile">Cover</label>
                                <input type="file" name="imagefile" onChange={(e) => {
                    setFormAddData(prevState => ({ ...prevState, cover: e.target.value }))}}></input>
                            </div>
                        </div>
                        <div className="center">
                            <div className="title">
                                <label className="title">Movie Name</label>
                                <input type="text" placeholder="write the title" onChange={(e) => {
                    setFormAddData(prevState => ({ ...prevState, title: e.target.value }))}}></input>
                            </div>
                            <div className="director">
                                <label className="director">Director</label>
                                <input type="text" placeholder="write the director" onChange={(e) => {
                    setFormAddData(prevState => ({ ...prevState, director: e.target.value }))}}></input>
                            </div>
                            <div className="release-date">
                                <label className="release-date">Release Date</label>
                                <input type="date" placeholder="yyyy-mm-dd" onChange={(e) => {
                    setFormAddData(prevState => ({ ...prevState, release_date: e.target.value }))}}></input>
                            </div>
                        </div>
                        <div className="right-side">
                            <label className="genre">Genre</label>
                            <select className='select-genres' value={select} onChange={handleChange}>
                                {genres.map(option => (
                                <option key={option.value} value={option.value}>
                                {option.text}
                                </option>))}
                            </select>
                            <label className="casts">Casts</label>
                            <input type="text" placeholder="write the casts" onChange={(e) => {
                    setFormAddData(prevState => ({ ...prevState, casts: e.target.value }))}}></input>
                            {/* <div className="duration">
                                <div className="hour">
                                    <label for="hour">Duration Hour</label>
                                    <input type="text" placeholder="write the hour"/>
                                </div>
                                <div className="minutes">
                                    <label for="minutes">Duration Minutes</label>
                                    <input type="text" placeholder="write the minutes"/>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="bottom">
                        <label className="synopsis">Synopsis</label>
                        <textarea name="synopsis" id="synopsis" onChange={(e) => {
                    setFormAddData(prevState => ({ ...prevState, description: e.target.value }))}}></textarea>
                    </div>
                    <div className='btn-confirm'>
                        <div className='btn-confirm1'>
                        <button className='btn-save' onClick={(e)=> handleAddMovie(e)}>Submit</button>
                        </div>
                        <div className='btn-confirm2'>
                        <button className='btn-cancel' type='reset' value="Reset">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='header-data-movie'>
                <div className='title'>
                    <h3>Data Movie</h3>
                </div>
                <div className='filter'>
                    <div className='sort'>
                        {/* <select name='sort'>
                            <option value="" selected disabled hidden>Sort</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select> */}
                    </div>
                    <div className='search'>
                        <input placeholder="Search Movie Name"></input>
                    </div>
                </div>
            </div>
            <div className='modal'>
            
            <div className='card-details'>
                {moviesList.results.data.map((movies, index)=>{
                    return(
                        <div className='card-movie-details' key={index}>
                            <div className='card-details-info'>
                                <div className='details-info'>    
                                    <img className='cover' 
                                    src={`${movies.cover}`} 
                                    alt={movies.title} 
                                    title={movies.title}/>
                                    <h5>{`${movies.title}`}</h5>
                                    <p>{`${movies.gen_name}`}</p>
                                    <div className='btn-action'>
                                    <button className='btn-modal-edit' onClick={() => modalEdit(handleEdit(movies))}>Edit Movies</button>
                                    <button className='btn-modal-delete' onClick={()=>handleDelete(movies.movies_id)}>Delete Movies</button>
                                    </div>
                                </div>
                            </div>
                            <Modal
                            isOpen={modalEditIsOpen}
                            onRequestClose={modalEditClose}>
                                <h2>Edit Movies</h2>
                
                                <form onSubmit={(e) => handleUpdateMovie(e)} className='form-edit-data'>
                                {/* <div className='movies-id'>
                                <label className='form-label'>Movies Id:</label>                                                            
                                <input className='input-label' type="text" placeholder="write the movie id" onChange={(e) => {
                                setFormEditData(prevState => ({ ...prevState, movies_id: e.target.value }))}}></input>
                                </div> */}
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
                                    <button className='btn-cancel' type='reset' value="Reset">cancel</button>
                                    </div>
                                </div>
                                </form>

                            </Modal>
                        </div>
                    )
                })}
            
            </div>
            </div>
        </div>

    </>)
}   

export default FormMovies


{/* <div className='card-movie-details'>
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
            </div> */}