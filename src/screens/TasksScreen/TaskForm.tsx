import { useForm, FormProvider } from 'react-hook-form'
import { Task } from '../../models/Task.model'
import { Button } from 'react-native-paper'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import FlexContainer from '../../components/ui/flex/FlexContainer'
import FlexItem from '../../components/ui/flex/FlexItem'
import FormTextInput from '../../components/ui/form/FormTextInput'
import { SQLiteResponse } from '../../models/SQLiteResponse.model'

const defaultValues: Task = {
  value: '',
  done: false,
}
interface Props {
  onSubmitForm: (data: Task) => Promise<Task | SQLiteResponse>
}
const TaskForm = ({ onSubmitForm }: Props) => {
  const validation = Yup.object({
    value: Yup.string().trim().required('Task is required')
  })
  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation)
  })
  const submitFormHandler = async (data: Task) => {
    await onSubmitForm(data)
    methods.reset()
  }
  return (
    <FormProvider {...methods}>
      <FlexContainer style={{ paddingHorizontal: 3 }}>
        <FlexItem>
          <FormTextInput
            name="value"
            label="Write a task..."
            onSubmitEditing={methods.handleSubmit(submitFormHandler)}
          />
        </FlexItem>
        <FlexItem>
          <Button
            mode="contained"
            onPress={methods.handleSubmit(submitFormHandler)}
          >
            Add task
          </Button>
        </FlexItem>
      </FlexContainer>
    </FormProvider>
  )
}
export default TaskForm
