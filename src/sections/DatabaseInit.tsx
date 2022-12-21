import { useEffect } from 'react'
import { initDatabase } from '../localstorage/database/dbConfig'

const DatabaseInit = () => {
  useEffect(() => {
    initDatabase()
  }, [])

  return null
}
export default DatabaseInit
