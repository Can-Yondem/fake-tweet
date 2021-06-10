import React from "react";
import ContentLoader from "react-content-loader";

const AvatarLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={48}
    height={48}
    viewBox="0 0 48 48"
    backgroundColor="#333"
    foregroundColor="#444"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="24" cy="24" r="24" />
  </ContentLoader>
);

export default AvatarLoader;
