import React from "react";
import ContentLoader from "react-content-loader";

const Loader: React.FC = () => (
  <ContentLoader 
    speed={2}
    width={260}
    height={400}
    viewBox="0 0 260 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="20" ry="20" width="260" height="400" />
  </ContentLoader>
);

export default Loader;