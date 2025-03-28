import Board from '../models/board.model.js'
import Task from '../models/task.model.js'
import Priority from '../models/priority.model.js'
import Label from '../models/label.model.js'
import User from '../models/user.model.js'
import Comment from '../models/comment.model.js'
import { checkPermissions } from '../utils/checkPermissions.js'

export const fetchTasks = async (userId, projectId, boardId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_view) throw new Error('Forbidden')
  const board = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const tasks = await Board.findOne({
    where: {
      id: boardId,
    },
    include: [{
      model: Task,
      where: {
        board_id: boardId
      },
      attributes: ['id', 'title', 'description', 'due_date', 'updatedAt'],
      required: false,
      include: [
        { model: Label, attributes: ['hex_code'] },
        { model: Priority, attributes: ['name'] },
        { model: User, attributes: ['first_name', 'last_name'], as: 'assignedTo' },
        { model: User, attributes: ['first_name', 'last_name'], as: 'createdBy' }
      ]
    }]
  })
  return tasks
}

export const fetchTask = async (userId, projectId, boardId, taskId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_view) throw new Error('Forbidden')
  const task = await Task.findOne({
    where: {
      id: taskId
    },
    include: [
      {
        model: Board,
        where: {
          id: boardId,
          project_id: projectId
        },
        attributes: []
      }, 
      {
        model: Comment,
        where: {
          task_id: taskId
        },
        required: false
      }
    ]
  })
  if (!task) throw new Error('Task not found')
  return task
}

export const createTaskService = async (userId, projectId, boardId, title, description, dueDate, priorityId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_edit) throw new Error('Forbidden')
  const boardValidation = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!boardValidation) throw new Error('Board not found')
  const priority = await Priority.findByPk(priorityId)
  if (!priority) throw new Error('Priority not found')
  const task = await Task.create({
    title,
    description,
    created_by: userId,
    assigned_to: userId,
    board_id: boardId,
    due_date: new Date(dueDate),
    priority_id: priorityId
  })
  return task
}

export const updateTaskService = async (userId, projectId, boardId, taskId, title, description, assignedTo, dueDate, priorityId, labelId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_edit) throw new Error('Forbidden')
  const verifyAssignedUser = await checkPermissions(assignedTo, projectId)
  if (!verifyAssignedUser.can_edit) throw new Error('Access denied: insufficient permissions')
  const task = await Task.findOne({
    include: [{
      where: {
        id: taskId
      },
      model: Board,
      where: {
        id: boardId,
        project_id: projectId
      },
      attributes: []
    }]
  })
  if (!task) throw new Error('Task not found')

  const priority = await Priority.findByPk(priorityId)
  if (!priority) throw new Error('Priority not found')
  const label = await Label.findByPk(labelId)
  if (!label) throw new Error('Label not found')

  const updatedTask = await task.update({
    title,
    description,
    assigned_to: assignedTo,
    due_date: new Date(dueDate),
    priority_id: priorityId,
    label_id: labelId
  })
  return updatedTask
}

export const deleteTaskService = async (userId, projectId, boardId, taskId) => {
  const role = await checkPermissions(userId, projectId)
  if (!role.can_manage) throw new Error('Forbidden')
  const task = await Task.findOne({
    where: {
      id: taskId
    },
    include: [{
      model: Board,
      where: {
        id: boardId,
        project_id: projectId
      },
      attributes: []
    }]
  })
  if (!task) throw new Error('Task not found')

  await task.destroy({ force: true })
}