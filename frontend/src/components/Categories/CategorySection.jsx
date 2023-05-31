import React from 'react';
import { Link } from 'react-router-dom';

function CategorySection() {
const categories = ["Action","Aventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror", "Music","Mystery", "Romance", "Science-Fiction","TV movie", "Thriller", "War","Western"];

  return (
    <div>
      <h2>Catégories de Films</h2>
      <div className="categories">
        {categories.map(category => (
          <div key={category} className="category">
            <Link to={`/category/${category}`}>
            <h3>{category}</h3>
                </Link>
            {/* Ajoutez ici le contenu spécifique à chaque catégorie */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;