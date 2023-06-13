import { ChangeEvent, FC } from 'react';
import styles from './ButtonFile.module.scss';

interface ButtonFileProps {
  uniqId: string;
  text: string;
  changeValueInput: (file: File[]) => void;
  accept?: string;
  isEditing?: boolean;
  multiple?: boolean;
}

const ButtonFile: FC<ButtonFileProps> = ({
  uniqId,
  text,
  accept = '',
  changeValueInput,
  isEditing = true,
  multiple = true,
}): JSX.Element => {
  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    let filesArr: File[] = [];
    if (files) {
      filesArr = Array.from(files);
    }

    changeValueInput(filesArr);
  };

  // const uniqId = nanoid();
  return (
    <>
      <label htmlFor={uniqId} className={styles.label}>
        {text}
        {/* <AttachIcon className={styles.icon} /> */}
      </label>
      <input
        id={uniqId}
        type="file"
        accept={accept}
        multiple={multiple}
        className={styles.inputFile}
        onChange={onChangeFiles}
        disabled={!isEditing}
      />
    </>
  );
};

export default ButtonFile;
