import HttpClient from 'Services/HttpClient';

const UPLOAD_ENDPOINT = '/files/upload/single';
const DELETE_ENDPOINT = '/files/upload/single';

type ImageUploadResponse = {
  data: {
    image: string;
  };
};

type UploadFileToServer = (options: {
  file: File;
  setPercentCompleted: (number: number) => void;
}) => Promise<{ image: string }>;

type RemoveFileFromServer = (options: { url: string; onRemoved: () => void }) => Promise<void>;

export class ImageUpload {


  uploadFileToServer: UploadFileToServer = async ({ file, setPercentCompleted }) => {
    const formData = new FormData();
    formData.append('image', file);

    const config = {
      onUploadProgress: (progressEvent): void => {
        const { loaded, total } = progressEvent;
        const completed = Math.round((loaded * 100) / total);

        setPercentCompleted(completed);
      },
    };

    try {
      const { data } = await HttpClient.post<void, ImageUploadResponse>(UPLOAD_ENDPOINT, formData, config);

      return data;
    } finally {
      setPercentCompleted(0);
    }
  };

  removeFileFromServer: RemoveFileFromServer = async ({ url, onRemoved }) => {
    if (!confirm('Are you sure?')) return;

    try {
      await HttpClient.delete<void, ImageUploadResponse>(DELETE_ENDPOINT, { url });

      onRemoved();
    } finally {
      // Do nothing
    }
  };
}
