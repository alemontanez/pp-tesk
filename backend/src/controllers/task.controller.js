import { fetchTask, fetchTasks, createTaskService, updateTaskService, deleteTaskService } from '../services/task.service.js'

export const getTasks = async (req, res) => {
  const userId = req.user.id
  const { projectId, boardId } = req.params
  try {
    const tasks = await fetchTasks(userId, projectId, boardId)
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Board not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const getTask = async (req, res) => {
  const userId = req.user.id
  const { projectId, boardId, taskId } = req.params
  try {
    const task = await fetchTask(userId, projectId, boardId, taskId)
    res.json(task)
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Task not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const createTask = async (req, res) => {
  const userId = req.user.id
  const { projectId, boardId } = req.params
  const { title, description, dueDate, priorityId } = req.body
  try {
    const task = await createTaskService(userId, projectId, boardId, title, description, dueDate, priorityId)
    res.status(201).json({
      message: 'Task created successfully',
      task
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Board not found' || error.message === 'Priority not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateTask = async (req, res) => {
  const userId = req.user.id
  const { projectId, boardId, taskId } = req.params
  const { title, description, assignedTo, dueDate, priorityId, labelId } = req.body
  try {
    const task = await updateTaskService(userId, projectId, boardId, taskId, title, description, assignedTo, dueDate, priorityId, labelId)
    res.status(200).json({
      message: 'Task updated successfully',
      task
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Access denied: insufficient permissions') {
      return res.status(403).json({ error: [error.message] })
    }
    if (error.message === 'Task not found' || error.message === 'Priority not found' || error.message === 'Label not found') {
      return res.status(404).json({ error: [error.message] })
    }
    if (error.message === 'Forbidden') {
      return res.status(409).json({ error: ['Assigned user does not belong to this project'] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const deleteTask = async (req, res) => {
  const userId = req.user.id
  const { projectId, boardId, taskId } = req.params
  try {
    const task = await deleteTaskService(userId, projectId, boardId, taskId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Task not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}