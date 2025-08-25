import { Outlet } from "react-router"
import CommonLayout from "./Components/Layouts/CommonLayout"


function App() {

  return (
    <>
      <CommonLayout>
        <Outlet/>
      </CommonLayout>
    </>
  )
}

export default App
