import { useEffect } from "react";

import { Avatar, Box, Button, Stack } from "@mui/material";

interface Props {
  selectedFile: Blob | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<Blob | undefined>>;
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImagePreview: React.FC<Props> = ({ selectedFile, setSelectedFile, preview, setPreview }) => {
  // Adapted from https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <Stack>
        <Avatar src={preview} alt="preview" sx={{ width: 160, height: 160, alignSelf: "center" }} />
      </Stack>
      <Box textAlign="center" p={1}>
        <Button variant="contained" component="label">
          Choose Avatar
          <input
            type="file"
            name="avatar"
            onChange={onSelectFile}
            accept="image/png, image/jpeg, image/jpg, image/gif"
            hidden
          />
        </Button>
      </Box>
    </>
  );
};

export default ImagePreview;
