import React from 'react'
import { TaskStatus } from '../../models/TaskStatus'
import FlexContainer from '../../components/ui/flex/FlexContainer'
import { Chip } from 'react-native-paper'
import FlexItem from '../../components/ui/flex/FlexItem'

interface Props {
  statusList: TaskStatus[]
  onPressStatus: (id: number) => void
}
const TaskFilter = ({ statusList, onPressStatus }: Props) => {
  const pressChipHandler = (id: number) => {
    onPressStatus(id)
  }
  return (
    <FlexContainer
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
      }}
    >
      {statusList.map((item) => {
        return (
          <FlexItem
            key={item.id}
            style={{ flexDirection: 'row', marginHorizontal: 5 }}
          >
            <Chip
              selectedColor="white"
              elevated={item.selected}
              style={{ backgroundColor: item.color }}
              onPress={() => pressChipHandler(item.id)}
            >
              {item.text}
            </Chip>
          </FlexItem>
        )
      })}
    </FlexContainer>
  )
}
export default React.memo(TaskFilter)
