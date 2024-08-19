import React from 'react';
import { Module } from '../types';

interface ModuleListProps {
  modules: Module[];
}

const ModuleList: React.FC<ModuleListProps> = ({ modules }) => {
  return (
    <div className="module-list">
      {modules?.map((module, index) => (
        <div key={index} className="module-item">
          <h3>{module.name}</h3>
          <p>Owner: {module?.owner?.username}</p>
          <p>Stars: {module?.stars}</p>
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
