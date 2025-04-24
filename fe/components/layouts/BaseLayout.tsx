import React from 'react';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full max-w-3xl mx-auto">{children}</div>;
};

export default BaseLayout;
