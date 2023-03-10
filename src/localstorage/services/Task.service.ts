import {
  executeQuery,
  getFieldsString,
  getValuesString,
  getKeysValuesString
} from '../database/SQLiteQuery'
import { TASKS } from '../database/dbConst'
import { Task } from '../../models/Task.model'
import { SQLiteResponse } from '../../models/SQLiteResponse.model'

interface GetTaskListParams {
  status?: string
}
export const getAll = async ({
  status
}: GetTaskListParams): Promise<Task[] | SQLiteResponse> => {
  try {
    let query = `SELECT * FROM ${TASKS};`
    if (status === 'Completed') query = `SELECT * FROM ${TASKS} WHERE done = 1;`
    if (status === 'Uncompleted') query = `SELECT * FROM ${TASKS} WHERE done = 0;`
    const res = (await executeQuery<Task[]>(query)) as Task[]
    return res.map((item) => taskResponseToTask(item))
  } catch (e: unknown) {
    const error = e as SQLiteResponse
    return error
  }
}

export const getById = async (id: number): Promise<Task | SQLiteResponse> => {
  try {
    const query = `SELECT * FROM ${TASKS} WHERE id=${id};`
    const res = (await executeQuery<Task>(query)) as Task
    return taskResponseToTask(res)
  } catch (e: unknown) {
    const error = e as SQLiteResponse
    return error
  }
}

export const create = async (data: Task): Promise<Task | SQLiteResponse> => {
  try {
    const newData = {
      value: data.value,
      done: 0,
      createdAt: new Date()
    }
    const fields = getFieldsString(newData)
    const values = getValuesString(newData)

    const query = `INSERT INTO ${TASKS} (${fields}) VALUES (${values});`
    return await executeQuery<Task>(query)
  } catch (e: unknown) {
    const error = e as SQLiteResponse
    return error
  }
}

export const remove = async (id: number): Promise<Task | SQLiteResponse> => {
  try {
    const query = `DELETE FROM ${TASKS} where id=${id};`
    return await executeQuery<Task>(query)
  } catch (e: unknown) {
    const error = e as SQLiteResponse
    return error
  }
}

export const removeAll = async (): Promise<Task | SQLiteResponse> => {
  try {
    const query = `DELETE FROM ${TASKS};`
    return await executeQuery<Task>(query)
  } catch (e: unknown) {
    const error = e as SQLiteResponse
    return error
  }
}

export const update = async (
  id: number,
  data: Task
): Promise<Task | SQLiteResponse> => {
  try {
    const newData = {
      value: data.value
    }
    const keysValues = getKeysValuesString(newData)
    const query = `UPDATE ${TASKS} set ${keysValues} where id=${id};`
    return await executeQuery<Task>(query)
  } catch (e: unknown) {
    const error = e as SQLiteResponse
    return error
  }
}

export const finish = async (id: number): Promise<Task | SQLiteResponse> => {
  try {
    const query = `UPDATE ${TASKS} set done = 1 where id=${id};`
    return await executeQuery<Task>(query)
  } catch (e: unknown) {
    const error = e as SQLiteResponse
    return error
  }
}

export const finishAll = async () => {
  try {
    const query = `UPDATE ${TASKS} set done = 1;`
    return await executeQuery<Task>(query)
  } catch (e: unknown) {
    const error = e as SQLiteResponse
    return error
  }
}

const taskResponseToTask = (item: Task) => {
  return {
    id: Number(item.id),
    value: `${item.value}`,
    done: Boolean(item.done),
    createdAt: new Date(item.createdAt)
  } as Task
}

const taskToTaskResponse = (item: Task) => {
  return {
    id: item.id,
    value: `${item.value}`,
    done: item.done ? 1 : 0,
    createdAt: `${item.createdAt}`
  }
}
