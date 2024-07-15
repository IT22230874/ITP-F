import React from 'react';

const monthlyincome = () => {
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
      src="https://charts.mongodb.com/charts-project-0-shyqbfp/embed/charts?id=667967e1-ae06-4623-8ba8-e32a517e8178&maxDataAge=60&theme=light&autoRefresh=true"
      title="MongoDB Chart"
    ></iframe>
  );
};

export default monthlyincome;
