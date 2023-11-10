import { useState } from "react";

import ProjectsSidebars from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";


function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    //undefined - we are doing nothing
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
        //TUKA mu stava ID
      };
      return (
        {
          ...prevState,
          tasks: [...prevState.tasks, newTask]
        }
      )
    })
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return (
        {
          ...prevState,
          tasks: prevState.tasks.filter((task) => task.id !== id)
        }
      )
    });
  }

  function handleSelectProject(id) {
    //ako funkcijata prima parameter kako id-to tuka i ja nosime so prop vo ProjectSidebar
    //vo ProjectSidebar mora da se staj pak id-to so project.id onClick={() => onSelectProject(project.id)}
    setProjectsState((prevState) => {
      return (
        {
          ...prevState,
          selectedProjectId: id
        }
      )
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return (
        {
          ...prevState,
          selectedProjectId: null
          //null - we are adding a new project
        }
      )
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return (
        {
          ...prevState,
          selectedProjectId: undefined
        }
      )
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
        //TUKA mu stava ID
      };
      return (
        {
          ...prevState,
          selectedProjectId: undefined,
          projects: [...prevState.projects, newProject]
        }
      )
    })
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return (
        {
          ...prevState,
          selectedProjectId: undefined,
          projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
        }
      )
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks.filter(
        ({ projectId }) => projectId === projectsState.selectedProjectId
      )}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebars
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}

    </main>
  );
}

export default App;
