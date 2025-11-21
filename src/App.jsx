import AppRouter from '@/routers/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import toàn bộ solid icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas); // Thêm tất cả icon solid vào thư viện
function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
