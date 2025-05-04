import React from 'react';

const ValueColor = ({
  value,
  withPercent = true,
}: {
  value: number | undefined;
  withPercent?: boolean;
}) => {
  if (!value) return <div className="text-red-600">0{withPercent && '%'}</div>;
  if (value >= 80) {
    return (
      <div className="text-green-500">
        {value}
        {withPercent && '%'}
      </div>
    );
  } else if (value >= 50) {
    return (
      <div className="text-orange-400">
        {value}
        {withPercent && '%'}
      </div>
    );
  } else {
    return (
      <div className="text-red-600">
        {value}
        {withPercent && '%'}
      </div>
    );
  }
};

export default ValueColor;
