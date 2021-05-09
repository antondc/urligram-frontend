import HttpClient from 'Services/HttpClient';

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
  private uploadEndpoint: string;
  private deleteEndpoint: string;

  constructor() {
    this.uploadEndpoint = '/images/upload/single';
    this.deleteEndpoint = '/images/single';
  }

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
      const { data } = await HttpClient.post<void, ImageUploadResponse>(this.uploadEndpoint, formData, config);

      return data;
    } finally {
      setPercentCompleted(0);
    }
  };

  removeFileFromServer: RemoveFileFromServer = async ({ url, onRemoved }) => {
    if (!confirm('Are you sure?')) return;

    // TODO: WIP, read from WithUploadLogic
    try {
      await HttpClient.delete<void, ImageUploadResponse>(this.deleteEndpoint, { url });

      onRemoved();
    } finally {
      // Do nothing
    }
  };
}
