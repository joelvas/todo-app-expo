import { Platform } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { CREATE_TABLE_TASKS } from './dbCreateTables'

const openDatabase = () => {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {
        return {
          executeSql: () => {}
        }
      }
    }
  }

  const db = SQLite.openDatabase('db.db')
  return db
}

const initDatabase = () => {
  const db = openDatabase()
  const query = CREATE_TABLE_TASKS

  db.transaction((tx) => {
    tx.executeSql(query)
  })

  return null
}

export { openDatabase, initDatabase }
