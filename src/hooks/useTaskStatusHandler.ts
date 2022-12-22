import React from 'react'
import { useTheme } from 'react-native-paper'
import { TaskStatus } from '../models/TaskStatus'
import { CustomThemeProps } from '../themes/CustomTheme'

const useStatusHandler = () => {
  const theme = useTheme<CustomThemeProps>()

  const [statusList, setStatusList] = React.useState<TaskStatus[]>([
    {
      id: 1,
      color: theme.colors.primary,
      text: 'All',
      selected: true
    },
    {
      id: 2,
      color: theme.colors.success,
      text: 'Completed',
      selected: false
    },
    {
      id: 3,
      color: theme.colors.warning,
      text: 'Uncompleted',
      selected: false
    }
  ])

  const [statusSelected, setStatusSelected] = React.useState<TaskStatus>(
    statusList[0]
  )

  React.useEffect(() => {
    const newList = statusList.map((item) => {
      if (item.id === statusSelected.id) {
        return {
          ...item,
          selected: true
        }
      }
      return item
    })
    setStatusList(newList)
  }, [statusSelected])

  const selectStatus = (id: number) => {
    const newStatus = statusList.find((item) => item.id === id)
    setStatusSelected(newStatus)
  }
  return { statusList, selectStatus, statusSelected }
}
export default useStatusHandler
