const express = require('express')
const router = express.Router()
const {
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  createTicket,
} = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoute')
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)

router
  .route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket)

module.exports = router
