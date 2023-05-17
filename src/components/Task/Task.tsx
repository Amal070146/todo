import styles from './task.module.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { AiOutlineEdit } from "react-icons/ai";


interface Todos {
	id: string;
	title: string;
	isCompleted: boolean;
}

type TodoT = {
  key: string;
  task: Todos;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onEdit: (taskId: string, title: string) => void;
};

export function Task({ task, onDelete, onComplete, onEdit }: TodoT) {
	
  return (
    <div>
      <hr />
      <div className={styles.task}>
        <button
          className={styles.checkContainer}
          onClick={() => onComplete(task.id)}
        >
          {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
        </button>

        <p className={task.isCompleted ? styles.textCompleted : ""}>
          {task.title}
        </p>
        <button
          className={styles.deleteButton}
          onClick={() => onEdit(task.id, task.title)}
        >
          <AiOutlineEdit size={20} />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(task.id)}
        >
          <TbTrash size={20} />
        </button>
      </div>
     
    </div>
  );
}