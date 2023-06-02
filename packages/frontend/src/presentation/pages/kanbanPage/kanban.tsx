import KanbanBoard from "@/presentation/components/kanban/kanbanBoard";
import Styles from './kanbanStyle.scss'

const KanbanPage: React.FC = () => {
  return (
    <div className={Styles.container}>
      <KanbanBoard />
    </div>
  );
};

export default KanbanPage;
