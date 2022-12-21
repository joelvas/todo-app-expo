import React from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useGetTaskList, useTaskMutations } from '../../queries/Task.query'
import { Task } from '../../models/Task.model'
import FlexContainer from '../../components/ui/flex/FlexContainer'
import FlexItem from '../../components/ui/flex/FlexItem'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import BasicModal from '../../components/ui/basics/BasicModal'
import BasicFloatingButton from '../../components/ui/basics/BasicFloattingButton'
import { FABAction } from '../../components/ui/basics/BasicFloattingButton'
import { CustomThemeProps } from '../../themes/CustomTheme'
import TaskFilter from './TaskFilter'
import useStatusHandler from '../../hooks/useStatusHandler'

const TasksScreen = () => {
  const theme = useTheme<CustomThemeProps>()
  const { data: tasksList, refetch } = useGetTaskList()
  const [openModal, setOpenModal] = React.useState(false)
  const { createTask, deleteTask, finishTask, finishAllTask, deleteAllTask } =
    useTaskMutations()

  const { statusList, selectStatus, statusSelected } = useStatusHandler()
  
  const submitFormHandler = async (data: Task) => {
    const res = await createTask(data)
    setOpenModal(false)
    refetch()
    return res
  }
  const pressDeleteHandler = async (id: number) => {
    await deleteTask(id)
    refetch()
  }
  const pressDeleteAllHandler = async () => {
    await deleteAllTask()
    refetch()
  }
  const pressFinishAllHandler = async () => {
    await finishAllTask()
    refetch()
  }
  const pressFinishHandler = async (id: number) => {
    await finishTask(id)
    refetch()
  }
  const FABActions = React.useMemo(() => {
    return [
      {
        icon: 'trash-can-outline',
        label: 'Delete all tasks',
        style: { backgroundColor: theme.colors.error },
        color: 'white',
        onPress: pressDeleteAllHandler
      },
      {
        icon: 'check',
        label: 'Finish all tasks',
        style: { backgroundColor: theme.colors.success },
        color: 'white',
        onPress: pressFinishAllHandler
      },
      {
        icon: 'note-plus',
        label: 'New task',
        style: { backgroundColor: theme.colors.primary, color: 'white' },
        color: 'white',
        onPress: () => setOpenModal(true)
      }
    ]
  }, []) as FABAction[]

  return (
    <FlexContainer style={{ paddingVertical: 5 }}>
      <FlexItem>
        <TaskFilter
          statusList={statusList}
          onPressStatus={selectStatus}
        />
      </FlexItem>
      <FlexItem style={styles.listContainer}>
        <TaskList
          data={tasksList}
          statusSelected={statusSelected}
          onPressFinish={pressFinishHandler}
          onPressRemove={pressDeleteHandler}
        />
      </FlexItem>
      <BasicModal visible={openModal} onDismiss={() => setOpenModal(false)}>
        <TaskForm onSubmitForm={submitFormHandler} />
      </BasicModal>
      <BasicFloatingButton FABActions={FABActions} />
    </FlexContainer>
  )
}
export default TasksScreen

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 5,
    maxWidth: '100%'
  }
})
