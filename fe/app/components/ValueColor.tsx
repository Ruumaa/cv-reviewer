import React from 'react';

const ValueColor = ({ value }: { value: number | undefined }) => {
  if (!value) return <div className="text-black">0</div>;
  if (value >= 80) {
    return <div className="text-green-500">{value}%</div>;
  } else if (value >= 50) {
    return <div className="text-orange-400">{value}%</div>;
  } else {
    return <div className="text-red-600">{value}%</div>;
  }
};

export default ValueColor;
