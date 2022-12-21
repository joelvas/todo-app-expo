import React from 'react'
import {
  getAll,
  getById,
  create,
  remove,
  finish,
  removeAll,
  finishAll
} from '../localstorage/services/Task.service'
import { Task } from '../models/Task.model'

export const useGetTaskList = () => {
  const [data, setData] = React.useState<Task[]>([])
  const getList = async () => {
    try {
      const res = await getAll()
      if (res) {
        setData(res as Task[])
      }
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    getList()
  }, [])
  return { data, refetch: getList }
}

export const useGetTask = (id: number) => {
  const [data, setData] = React.useState<Task | null>(null)
  const getOne = async () => {
    try {
      const res = await getById(id)
      if (res) {
        setData(res as Task)
      }
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    getOne()
  }, [])
  return { data, refetch: getOne }
}

export const useTaskMutations = () => {
  const createTask = async (data: Task) => {
    const res = await create(data)
    console.log(res)
    return res
  }

  const deleteTask = async (id: number) => {
    const res = await remove(id)
    console.log(res)
    return res
  }

  const deleteAllTask = async () => {
    const res = await removeAll()
    console.log(res)
    return res
  }

  const finishTask = async (id: number) => {
    const res = await finish(id)
    console.log(res)
    return res
  }

  const finishAllTask = async () => {
    const res = await finishAll()
    console.log(res)
    return res
  }


  return { createTask, deleteTask, finishTask, finishAllTask, deleteAllTask }
}
