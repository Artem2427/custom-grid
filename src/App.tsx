import './App.css'
import MatrixForm from '@/components/matrix-form/MatrixForm'
import { MatrixProvider } from '@/context/MatrixContext'
import MatrixTable from '@/components/matrix-table/MatrixTable'

function App() {

  return (
    <MatrixProvider>
      <MatrixForm />
      <MatrixTable />
    </MatrixProvider>
  )
}

export default App
