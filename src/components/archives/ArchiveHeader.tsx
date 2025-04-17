import SearchBar from './SearchBar';

interface ArchiveHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ArchiveHeader = ({ searchQuery, setSearchQuery }: ArchiveHeaderProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Цифровой архив</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Исследуйте исторические документы для поиска информации о ваших предках. 
        Доступ к оцифрованным архивам поможет прояснить родственные связи и узнать больше о своих корнях.
      </p>
      
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
};

export default ArchiveHeader;
