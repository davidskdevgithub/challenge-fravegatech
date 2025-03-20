import { Search } from 'lucide-react';
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  return (
    <div className="relative w-full md:w-96">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-900 border-0 rounded-full focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all duration-200"
        data-testid="search-input"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};