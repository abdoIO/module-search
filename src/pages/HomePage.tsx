// Example usage in HomePage component
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ModuleList from '../components/ModuleList';
import Pagination from '../components/Pagination';
import { searchModules } from '../api/librariesApi';
import { Module } from '../types';

const HomePage: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      const data = await searchModules(query, currentPage);

      if (!data) {
        setLoading(false);
        setError(true);
        return;
      }

      setLoading(false);
      setModules(data);
    };

    fetchModules();
  }, [query, currentPage]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>There was an error, please try again</p>}
      {modules.length > 0 && !loading && (
        <>
          <ModuleList modules={modules} />
          <Pagination
            currentPage={currentPage}
            totalPages={10} // Assuming 10 pages for simplicity
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
