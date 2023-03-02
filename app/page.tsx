import styles from './page.module.css'

import ShowTasks from './components/tasks/ShowTasks'
import Options from './components/options/Options'
import Search from './components/options/search/Search'
import CreateTask from './components/options/createTask/CreateTask'
import FilterTasks from './components/options/filter/FilterTasks'
import TasksProvider from './context/tasksProvider'

export default function Home() {
 
  return (
    <main className={styles.main}>
      <TasksProvider>
        <ShowTasks />
        <Options />
        <Search />
        <CreateTask />
        <FilterTasks />
      </TasksProvider>
    </main>
  )
}
