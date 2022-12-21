import { Provider as PaperProvider } from 'react-native-paper'
import Main from './src/components/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CustomTheme from './src/themes/CustomTheme'

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CustomTheme}>
        <Main />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
