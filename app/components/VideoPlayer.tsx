import React from 'react';


export const VideoPlayer = ({src, className} : {src:any, className:string}) => {
  return (
    <video controls muted className={className}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};   