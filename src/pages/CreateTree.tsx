import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toolbar from '@/components/tree/Toolbar';
import WorkArea from '@/components/tree/WorkArea';
import usePersonsData from '@/hooks/usePersonsData';

/**
 * Страница создания и редактирования семейного древа
 * 
 * Компонент разделен на модули:
 * - Toolbar - верхняя панель инструментов с кнопками действий
 * - WorkArea - основная рабочая область, содержащая:
 *   - LeftSidebar - левая панель с инструментами
 *   - TreeCanvas - холст для отображения древа
 *   - RightSidebar - правая панель для редактирования данных
 */
const CreateTree = () => {
  // Состояние для открытия/закрытия боковой панели
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Используем кастомный хук для управления данными людей
  const {
    people,
    selectedPerson,
    handleSelectPerson,
    handleSavePerson,
    handleAddRelative
  } = usePersonsData();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        {/* Верхняя панель инструментов */}
        <Toolbar />
        
        {/* Рабочая область */}
        <WorkArea 
          people={people}
          selectedPerson={selectedPerson}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onSelectPerson={handleSelectPerson}
          onSavePerson={handleSavePerson}
          onAddRelative={handleAddRelative}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CreateTree;