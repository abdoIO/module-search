import React from 'react';
import { Module } from '../types';

interface ModuleListProps {
  modules: Module[];
}

const ModuleList: React.FC<ModuleListProps> = ({ modules }) => {
  return (
    <div className="module-list" role="list" aria-label="Module List">
      {modules?.map((module, index) => (
        <div key={index} className="module-item" role="listitem">
          <h3>{module.name}</h3>
          <p>
            Owner:{' '}
            <a
              href={module?.repository_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {module?.repository_url}
            </a>
          </p>
          <p>Stars: {module?.stars}</p>
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
