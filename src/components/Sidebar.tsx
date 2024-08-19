import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <a href="/#">Home</a>
        </li>
        <li>
          <a href="/#">About</a>
        </li>
        <li>
          <a href="/#">Contact</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
