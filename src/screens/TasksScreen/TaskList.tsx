import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import TaskItem from './TaskItem'
import { Task } from '../../models/Task.model'
import { TaskStatus } from '../../models/TaskStatus'

interface Props {
  data: Task[]
  onPressRemove: (id: number) => void
  onPressFinish: (id: number) => void
}
const TaskList = (props: Props) => {
  const { data, onPressRemove, onPressFinish } = props

  return (
    <FlatList
      style={{ paddingVertical: 7 }}
      data={data}
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
