import React from 'react';

const ValueColor = ({ value }: { value: number | undefined }) => {
  if (!value) return <div className="text-black font-pixelify-sans">0</div>;
  if (value >= 80) {
    return <div className="text-green-500 font-pixelify-sans">{value}%</div>;
  } else if (value >= 50) {
    return <div className="text-yellow-500 font-pixelify-sans">{value}%</div>;
  } else {
    return <div className="text-red-500 font-pixelify-sans">{value}%</div>;
  }
};

export default ValueColor;
