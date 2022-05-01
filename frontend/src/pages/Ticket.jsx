import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote, notesReset} from '../features/notes/noteSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { useNavigate, useParams } from 'react-router-dom'

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  )

  const cutomStyle = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%',
      position: 'relative'
    }
  }

  Modal.setAppElement('#root')

  

  const { notes, isLoading :noteIsLoading  } = useSelector(
    (state) => state.note
  )

  const params = useParams()
  const dispatch = useDispatch()
  const { ticketId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    //esling-disable-next-line
  }, [isError, message, ticketId, dispatch])

  // close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  // create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, ticketId}))
    closeModal()
  }
  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if(isLoading || noteIsLoading){
    return <Spinner />
  }

  if(isError){
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h1>Ticket-Item</h1>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {ticket.product}</h3>
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'><FaPlus/> Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={cutomStyle} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea name="" className='form-control' placeholder='NoteText' id='noteText' value={noteText} onChange={e => setNoteText(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button type='submit' className='btn'>Submit</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note}/>
      ))}

      {ticket.state !== 'closded' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close Ticket</button>
      )}
    </div>
  )
}

export default Ticket
