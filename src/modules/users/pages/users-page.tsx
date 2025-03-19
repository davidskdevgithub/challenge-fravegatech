import { useState } from 'react';
import { UserList } from '../components';
import { SearchInput } from '@/modules/search/components/search-input';
import { useDebounce } from '@/modules/search/hooks/useDebounce';

export default function UsersPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500); // 500ms debounce delay

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" data-testid="page-title">
        GitHub Users
      </h1>
      
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search GitHub users..."
      />
      
      <UserList 
        searchQuery={debouncedSearchTerm} 
      />
    </main> 
  );
}