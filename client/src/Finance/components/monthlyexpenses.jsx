import React from 'react';

const monthlyexpenses = () => {
  return (
    <iframe
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      }}
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-shyqbfp/embed/charts?id=66796847-dde3-433c-817d-cbfff31439d7&maxDataAge=3600&theme=light&autoRefresh=true"
      title="MongoDB Chart"
    ></iframe>
  );
};

export default monthlyexpenses;
