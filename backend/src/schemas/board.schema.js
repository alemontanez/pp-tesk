import { z } from 'zod'

export const boardSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' })
})

export const updateBoardLabelSchema = z.object({
  labelId: z
    .number({
      required_error: 'labelId is required',
      invalid_type_error: 'labelId must be a number'
    })
    .int()
    .positive()
})