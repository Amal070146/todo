import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Tasks } from "../Tasks/Tasks";
import { axiosPrivate } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import { AxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EditTodoModal from "./EditTodoModal";

const TODO_URL = "todo/";

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

function Todo() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const { auth }: any = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [editTodotitle, setEditTodotitle] = useState<string | null>(null);
  let navigate = useNavigate();
  const access = localStorage.getItem("access");

  const getTodo = async () => {
    try {
      const response = await axiosPrivate.get(TODO_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access,
        },
      });
      const todo: any = response?.data;
      console.log(todo);
      setTasks(todo);
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error?.response) {
        console.log(error.response);
        //notify3();
      }
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const deleteTodo = async (taskId: string) => {
    try {
      const response = await axiosPrivate.delete("todo/" + taskId + "/", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      const todo: any = response?.data;
      console.log("Success");
      console.log(todo);
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        console.log("Login expired");
        localStorage.clear();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (error?.response) {
        console.log(error.response);
        console.log("An Error occured, try again");
      }
    }
    getTodo();
  };

  function deleteTaskById(taskId: string) {
    deleteTodo(taskId);
  }

  const putTodo = async (taskId: string) => {
    try {
      const response = await axiosPrivate.put(
        "todo/" + taskId + "/",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const todo: any = response?.data;
      console.log(todo);
      console.log("Success");
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        console.log("Login expired");
        localStorage.clear();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (error?.response) {
        console.log(error.response);
        console.log("An Error occured, try again");
      }
    }
    getTodo();
  };

  function toggleTaskCompletedById(taskId: string) {
    putTodo(taskId);
  }
  const editTodo = async (taskId: string, title: string) => {
    try {
      const response = await axiosPrivate.delete(
        "todo/" + taskId + "/",

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const edit = await axiosPrivate.post(
        "todo/",
        {
          title: title,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const todo: any = response?.data;
      const todos: any = edit?.data;
      console.log("Success");
      console.log(todo);
      console.log(todos);
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        console.log("Login expired");
        localStorage.clear();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (error?.response) {
        console.log(error.response);
        console.log("An Error occured, try again");
      }
    }
    getTodo();
  };
  function edittask(taskId: string, title: string) {
    console.log(taskId, title);
    console.log("edit area");
    openEditModal(taskId, title);
  }

  const openEditModal = (todoId: string, title: string) => {
    setEditTodoId(todoId);
    setEditTodotitle(title);
    setShowEditModal(true);
    console.log(todoId, title);
    console.log("open edit area");
  };
  const closeModals = () => {
    setShowEditModal(false);
  };

  const updateTodo = (todoId: string, title: string) => {
    console.log(todoId, title);
    editTodo(todoId, title);
  };
  return (
    <>
      <Header handleAddTask={getTodo} />
      {tasks && tasks.length > 0 && (
        <>
          <Tasks
            tasks={tasks}
            onDelete={deleteTaskById}
            onComplete={toggleTaskCompletedById}
            onEdit={edittask}
          />{" "}
          <div
            style={{
              width: "100%",
              height: "40%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {showEditModal && editTodoId && editTodotitle && (
              <EditTodoModal
                isOpen={showEditModal}
                todoId={editTodoId}
                initialText={editTodotitle}
                onClose={closeModals}
                onUpdateTodo={updateTodo}
              />
            )}
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
}

export default Todo;
