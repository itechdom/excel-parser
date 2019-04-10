import React from "react";
import Dropzone from "react-dropzone";

const ImageFileInput = ({ field, onMediaDrop, media }) => {
  return (
    <div>
      <h2>{field.placeholder}</h2>
      <Dropzone id={field.name} onDrop={onMediaDrop}>
        <img width="200px" height="auto" src={media} />
      </Dropzone>
    </div>
  );
};

export default ImageFileInput;
