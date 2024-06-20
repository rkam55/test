import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: '무단횡단사고다발지' },
  { name: '보행어린이사고다발지' },
  { name: '자전거사고다발지' },
];

const Categories = () => {
  return (
    <div className="categoryBox">
      <ul>
        {categories.map((c) => (
          <Link
            to={c.name === 'all' ? '/' : `/${c.name}`}
            key={c.name}
            className="category"
          >
            {c.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
