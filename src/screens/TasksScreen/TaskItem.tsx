import { Task } from '../../models/Task.model'
import { Text, Button, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import FlexContainer from '../../components/ui/flex/FlexContainer'
import FlexItem from '../../components/ui/flex/FlexItem'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CustomThemeProps } from '../../themes/CustomTheme'

interface Props {
  task: Task
  onClickFinish: (id: number) => void
  onClickRemove: (id: number) => void
}
const TaskItem = ({ task, onClickFinish, onClickRemove }: Props) => {
  const theme = useTheme<CustomThemeProps>()
  const clickFinishHandler = (id: number) => {
    if (task.done) return
    onClickFinish(id)
  }
  return (
    <FlexItem style={styles.container}>
      <Text variant="bodyLarge" lineBreakMode='clip' style={{flexShrink: 1}}>{`${task.value}`}</Text>
      <FlexContainer style={styles.buttonContainer}>
        <Button
          buttonColor={theme.colors.success}
          disabled={task.done}
          textColor={'white'}
          onPress={() => clickFinishHandler(task.id)}
        >
          <MaterialCommunityIcons name="check" size={22} />
        </Button>
        <Button
          buttonColor={theme.colors.error}
          textColor={'white'}
          onPress={() => onClickRemove(task.id)}
        >
          <MaterialCommunityIcons name="trash-can-outline" size={22} />
        </Button>
      </FlexContainer>
    </FlexItem>
  )
}
export default TaskItem

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
