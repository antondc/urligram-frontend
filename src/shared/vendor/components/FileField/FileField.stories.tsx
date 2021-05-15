import React from 'react';

import { H1 } from '../H1';
import { Hr } from '../Hr';
import { FileField } from '.';

export default {
  component: FileField,
  title: 'FileField',
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
    <>
      <H1>File upload</H1>
      <Hr size="big" spacer />
      <div style={{ width: '200px', height: '200px', outline: '2px solid tomato', margin: '10px' }}>
        <FileField
          label="My file"
          name="Some file"
          accept=".pdf"
          fileUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          uploadFiles={uploadFilesToServer}
          onRemove={removeFilesFromServer}
          percentCompleted={0}
          removable
        />
      </div>
    </>
  );
};
