import { openDatabase } from './dbConfig'
import { SQLiteResponse } from '../../models/SQLiteResponse.model'

const db = openDatabase()

export const executeQuery = <T>(query: string): Promise<T | SQLiteResponse> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (_, result) => {
          const { rows } = result
          console.log(result)
          const { _array } = rows
          resolve(_array as T)
        })
      },
      (err) => {
        const error = err as SQLiteResponse
        error.success = false
        reject(error)
      }
    )
  })
}

export const getFieldsString = <T>(data: T): string => {
  return Object.keys(data)
    .map((key) => `${key}`)
    .join(', ')
}

export const getValuesString = <T>(data: T): string => {
  return Object.values(data)
    .map((val) => `'${val}'`)
    .join(', ')
}

export const getKeysValuesString = <T>(data: T): string => {
  return Object.entries(data)
    .map(([key, val]) => `${key} = '${val}'`)
    .join(', ')
}
