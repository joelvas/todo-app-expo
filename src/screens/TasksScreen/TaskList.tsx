import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import TaskItem from './TaskItem'
import { Task } from '../../models/Task.model'
import { TaskStatus } from '../../models/TaskStatus'

interface Props {
  data: Task[]
  statusSelected: TaskStatus
  onPressRemove: (id: number) => void
  onPressFinish: (id: number) => void
}
const TaskList = (props: Props) => {
  const { data, onPressRemove, onPressFinish, statusSelected } = props
  const filteredList = React.useMemo(() => {
    return data.filter((item) => {
      if (statusSelected.text === 'Completed') {
        return item.done
      } else if (statusSelected.text === 'Uncompleted') {
        return !item.done
      } else {
        return true
      }
    }) || []
  }, [statusSelected, data])

  return (
    <FlatList
      style={{ paddingVertical: 7 }}
      data={filteredList}
      ItemSeparatorComponent={() => <></>}
      renderItem={(item: ListRenderItemInfo<Task>) => (
        <TaskItem
          task={item.item}
          onPressFinish={onPressFinish}
          onPressRemove={onPressRemove}
        />
      )}
    />
  )
}
export default TaskList
