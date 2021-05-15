import React from 'react';

import { ImageField } from '.';

export default {
  component: ImageField,
  title: 'ImageField',
};

export const Default: React.FC = () => {
  const uploadFilesToServer = async (e) => {
    console.log('=======');
    console.log('uploadFilesToServer.e:');
    console.log(e);
    console.log('=======');
  };

  const removeFilesFromServer = (e) => {
    console.log('=======');
    console.log('removeFilesFromServer.e:');
    console.log(e);
    console.log('=======');
  };

  return (
    <div style={{ width: '200px', height: '200px', outline: '2px solid tomato', margin: '10px' }}>
      <ImageField
        label="My file"
        name="Some image"
        image="https://picsum.photos/150/300"
        grow={false}
        uploadFiles={uploadFilesToServer}
        onRemove={removeFilesFromServer}
        percentCompleted={0}
        removable
        accept=".jpg,.jpeg"
      />
    </div>
  );
};
