import React from 'react'
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { useGetTaskList, useTaskMutations } from '../../queries/Task.query'
import { Task } from '../../models/Task.model'
import FlexContainer from '../../components/ui/flex/FlexContainer'
import FlexItem from '../../components/ui/flex/FlexItem'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import BasicModal from '../../components/ui/basics/BasicModal'
import BasicFloatingButton from '../../components/ui/basics/BasicFloattingButton'
import { FABAction } from '../../components/ui/basics/BasicFloattingButton'
import { CustomThemeProps } from '../../themes/CustomTheme'

const TasksScreen = () => {
  const theme = useTheme<CustomThemeProps>()
  const { data: tasksList, refetch } = useGetTaskList()
  const [openModal, setOpenModal] = React.useState(false)
  const { createTask, deleteTask, finishTask } = useTaskMutations()

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
    const ids: number[] = tasksList.map((task) => task.id)
    ids.forEach(async (id) => await deleteTask(id))
    refetch()
  }
  const pressFinishAllHandler = async () => {
    const ids: number[] = tasksList.map((task) => task.id)
    ids.forEach(async (id) => await finishTask(id))
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
        <Button
          buttonColor={theme.colors.primary}
          textColor={theme.colors.inverseOnSurface}
          onPress={() => setOpenModal(true)}
          mode="elevated"
        >
          New task
        </Button>
      </FlexItem>
      <FlexItem style={styles.listContainer}>
        <FlatList
          style={{ paddingVertical: 7 }}
          data={tasksList}
          ItemSeparatorComponent={() => <></>}
          renderItem={(item: ListRenderItemInfo<Task>) => (
            <TaskItem
              task={item.item}
              onClickFinish={pressFinishHandler}
              onClickRemove={pressDeleteHandler}
            />
          )}
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
