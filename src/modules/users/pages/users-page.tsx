import { useState } from 'react';
import { UserList } from '../components';
import { SearchInput } from '@/modules/search/components/search-input';
import { useDebounce } from '@/modules/search/hooks/useDebounce';

export default function UsersPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500); // 500ms debounce delay

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          GitHub Users Explorer
        </h1>

        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search GitHub users..."
        />
      </div>
      
      <UserList 
        searchQuery={debouncedSearchTerm} 
      />
    </main> 
  );
}