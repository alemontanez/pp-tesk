import { useContext, createContext, useState } from 'react'
import { getBoard } from '../services/board'

export const BoardContext = createContext()

export const useBoard = () => {
  const context = useContext(BoardContext)
  if (!context) {
    throw new Error('UseBoard must be used within an BoardProvider')
  }
  return context
}

export const BoardProvider = ({ children }) => {

  const [errors, setErrors] = useState([])

  const fetchBoard = async (projectId, boardId) => {
    try {
      setErrors([])
      const res = await getBoard(projectId, boardId)
      return res.data
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  return (
    <BoardContext.Provider value={{
      fetchBoard,
      errors
    }}>
      {children}
    </BoardContext.Provider>
  )
}