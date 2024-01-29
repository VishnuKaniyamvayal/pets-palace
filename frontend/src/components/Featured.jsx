import React from 'react';

const FeaturedCategories = () => {
  const categories = [
    { id: 1, name: 'Dog ', image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg' },
    { id: 2, name: 'Cat ', image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg' },
    { id: 3, name: 'Beaver', image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Featured Categories</h2>
      <div style={styles.categoryContainer}>
        {categories.map((category) => (
          <div key={category.id} style={styles.category}>
            <img src={category.image} alt={category.name} style={styles.image} />
            <p style={styles.categoryName}>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '29px',
    marginBottom: '15px',
    color: '#333',
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  category: {
    textAlign: 'center',
    width: '30%',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  categoryName: {
    fontSize: '16px',
    color: '#444',
  },
};

export default FeaturedCategories;
