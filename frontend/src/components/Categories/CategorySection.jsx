import React from 'react';
import { Link } from 'react-router-dom';
import './CategorySection.css';

function CategorySection() {
const categories = ["Action","Aventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror", "Music","Mystery", "Romance", "ScienceFiction","TVmovie", "Thriller", "War","Western"];

  return (
    <div>
      <div className="Titre">Films par genres</div>
      <div className="categories">
        {categories.map((category) => (
          <div key={category} className="category">
            <Link to={`/category/${category}`} className="category-link">
              {category}
            </Link>
            {/* Ajoutez ici le contenu spécifique à chaque catégorie */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
