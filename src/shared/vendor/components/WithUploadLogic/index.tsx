import axios from 'axios';
import React from 'react';

import { PropsBaseComponent, RemoveFilefromServer, UploadFileToServer } from './WithUploadLogic.types';

interface Props {
  className?: string;
  url: string;
  grow?: boolean;
  rounded?: boolean;
  label?: string;
  textButton?: string;
  name?: string;
  accept?: string;
  removable?: boolean;
  percentCompleted?: number;
  maxLength?: number;
  urlApiUpload?: string;
  disabled?: boolean;
  onDrop?: (acceptedFiles: File[]) => void;
  onUploaded?: (url: string) => void;
  onRemove?: (url: string) => void;
}

interface State {
  url?: string;
  percentCompleted?: number;
  isUploading: boolean;
  filesToRemove: string[];
  error: boolean;
  success: boolean;
}

export const WithUploadLogic = (BaseComponent: React.ComponentType<PropsBaseComponent>): React.ComponentType<Props> =>
  class EnhancedComponent extends React.Component<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        url: undefined,
        percentCompleted: 0,
        isUploading: false,
        filesToRemove: [],
        error: false,
        success: false,
      };
    }

    componentDidMount = (): void => {
      const { url } = this.props;
      this.setState({ url });
    };

    uploadFileToServer: UploadFileToServer = async (urlApiUpload, data) => {
      const config = {
        onUploadProgress: (progressEvent): void => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);

          this.setState({ percentCompleted });
        },
      };

      return axios.post(urlApiUpload, data, config);
    };

    removeFilefromServer: RemoveFilefromServer = async (urlApiUpload, data) =>
      axios.delete(urlApiUpload, { params: data });

    onRemove = (): void => {
      const { onRemove, url, urlApiUpload } = this.props;
      // eslint-disable-next-line no-restricted-globals
      if (!confirm('Are you sure?')) return;
      if (onRemove) onRemove(url);

      this.removeFilefromServer(urlApiUpload, this.state.filesToRemove).then(() =>
        this.setState({
          url: undefined,
          filesToRemove: [],
        })
      );
    };

    onDrop = (acceptedFiles): void => {
      const { onDrop, urlApiUpload } = this.props;

      if (!acceptedFiles.length) return;
      if (onDrop) onDrop(acceptedFiles);

      this.setState({
        isUploading: true,
        url: undefined,
      });

      const data = new FormData();
      data.append('files', acceptedFiles[0]);

      this.uploadFileToServer(urlApiUpload, data)
        .then((res) => this.onUploadedSuccess(res))
        .catch((err) => this.onUploadedError(err));
    };

    onUploadedSuccess = (res): void => {
      const { onUploaded } = this.props;

      this.setState({
        url: res.data.img.original,
        percentCompleted: 0,
        isUploading: false,
        error: false,
      });

      if (onUploaded) onUploaded(res.data.img.original);
    };

    onUploadedError = (err): void => {
      this.setState({
        url: '',
        percentCompleted: 0,
        isUploading: false,
        error: !!err,
      });
    };

    render = (): React.ReactNode => {
      const { className, grow, label, textButton, name, accept, removable, maxLength, disabled, rounded } = this.props;
      const { error, success, url } = this.state;

      return (
        <BaseComponent
          className={className}
          url={url}
          grow={grow}
          rounded={rounded}
          label={label}
          textButton={textButton}
          name={name}
          accept={accept}
          removable={removable}
          onDrop={this.onDrop}
          percentCompleted={this.state.percentCompleted}
          onRemove={this.onRemove}
          maxLength={maxLength}
          error={error}
          success={success}
          disabled={disabled}
        />
      );
    };
  };
