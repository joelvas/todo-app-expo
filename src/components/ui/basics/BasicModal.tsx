import React from 'react'
import { Portal, Modal, Card, Text } from 'react-native-paper'

interface Props {
  children: React.ReactNode
  onDismiss: () => void
  visible: boolean
}
const BasicModal = ({ children, onDismiss, visible }: Props) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Card>
          <Card.Title title={<Text variant="titleLarge">New task</Text>} />
          <Card.Content>{children}</Card.Content>
        </Card>
      </Modal>
    </Portal>
  )
}
export default BasicModal
