import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';

import Axios from "axios";
import Modal from "react-modal"

import Search from "../components/Search";

import "./resoults.css"

Modal.setAppElement('#root')

function Resoults() {

  /*----- Axios stored request data -----*/
  const [axiosRequestData, setAxiosRequestData] = useState([])

  /*----- Modal all details -----*/
  const [modalOpen, setModalOpen] = useState(false)

  const [modalPhotoAuthor, setModalPhotoAuthor] = useState("")
  const [modalPhotoDate, setModalPhotoDate] = useState("")
  const [modalPhotoPlace, setModalPhotoPlace] = useState("")
  const [modalPhotoSrc, setModalPhotoSrc] = useState("")

  const data = useLocation();

  /*----- Axios request list of photos -----*/
  useEffect(() => {

    let clientSearchingWord = data.state

    Axios.get("https://api.unsplash.com/search/photos?page=1&query=" + clientSearchingWord + "&per_page=30&client_id=" + process.env.REACT_APP_UNSPLASH_API_KEY)
      .then(response => {
        setAxiosRequestData(response.data.results)
      })
      .catch(err => {
        console.log(err)
      }
    )
  }, [data.state]);

  /*----- Axios request specific photo data -----*/
  const modalPhotoDetails = async (photo_id) => {

    await Axios.get("https://api.unsplash.com/photos/" + photo_id + "?client_id=" + process.env.REACT_APP_UNSPLASH_API_KEY)
      .then(response => {
        setModalPhotoSrc(response.data.urls.small)
        setModalPhotoAuthor(response.data.user.name)
        formatDate(response.data.created_at)
        setModalPhotoPlace(response.data.location.name)
        setModalOpen(true)
      })
      .catch(err => {
        console.log(err)
      }
    )
  }

  /*----- Function for date format -----*/
  const formatDate = (create_at) => {
    const monthNames = [
      "Styczeń", "Luty", "Marzec", "Kwiecień",
      "Maj", "Czerwiec", "Lipiec", "Sierpień",
      "Wrzesień", "Październik", "Listopad", "Grudzień"];

    const [date, time] = create_at.split('T')
    const [year, month, day] = date.split('-')

    const formatDate = monthNames[parseInt(month) - 1] + " " + year
    setModalPhotoDate(formatDate)
  }

  return (
    <>
      <Search />

      <h1 className="resoult_header">{data.state}</h1>
      <div className="photo_container_resoults">

        <Modal isOpen={modalOpen} className="modal_panel">
          <div className="modal_container">
            <div className="modal_header">
              <h1 className="authorPhoto_modal">{modalPhotoAuthor}</h1>
              <p className="createdAt_modal">{modalPhotoDate}</p>
            </div>
            <button className="modal_button" onClick={() => setModalOpen(false)}>X</button>
            <img alt="" className="photo_modal" src={modalPhotoSrc}></img>
            <p className="locationPhoto_modal">{modalPhotoPlace}</p>
          </div>
        </Modal>

        {axiosRequestData.map((photo, index) => {

          return <img alt="" 
          onClick={() => modalPhotoDetails(photo.id)} 
          key={index} photo_id={photo.id} 
          className="photo" 
          src={photo.urls.small}/>

        })}

      </div>
    </>
  )
}
    
export default Resoults;