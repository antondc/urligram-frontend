export interface UploadFileToServerResponse {
  aspect: number;
  height: number;
  width: number;
  id: number;
  temp: boolean;
  img: {
    original: string;
  };
}

export type UploadFileToServer = (urlApiUpload: string, data: FormData) => Promise<UploadFileToServerResponse>;

export interface RemoveFilefromServerResponse {
  success: boolean;
}

export type RemoveFilefromServer = (urlApiUpload: string, data: string[]) => Promise<RemoveFilefromServerResponse>;

export interface PropsBaseComponent {
  name?: string;
  label?: string;
  url?: string;
  textButton?: string;
  className?: string;
  file?: string;
  grow?: boolean;
  rounded?: boolean;
  percentCompleted?: number;
  removable?: boolean;
  accept?: string;
  size?: string;
  maxLength?: number;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  onDrop?: (acceptedFiles: File[]) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}
