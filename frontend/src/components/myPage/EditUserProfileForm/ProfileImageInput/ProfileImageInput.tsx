import type { ComponentPropsWithoutRef } from 'react';
import { memo, useCallback, useRef } from 'react';

import { Box, Button } from 'hang-log-design-system';

import {
  imageStyling,
  inputStyling,
  uploadButtonStyling,
  wrapperStyling,
} from '@components/myPage/EditUserProfileForm/ProfileImageInput/ProfileImageInput.style';

import { useSingleImageUpload } from '@hooks/common/useSingleImageUpload';

import type { UserData } from '@type/member';

interface ProfileImageInputProps extends ComponentPropsWithoutRef<'div'> {
  initialImageUrl: string;
  updateInputValue: <K extends keyof UserData>(key: K, value: UserData[K]) => void;
}

const ProfileImageInput = ({
  initialImageUrl,
  updateInputValue,
  ...attributes
}: ProfileImageInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const handleImageUrlsChange = useCallback(
    (imageUrl: string) => {
      updateInputValue('imageUrl', imageUrl);
    },
    [updateInputValue]
  );

  const { uploadedImageUrl, handleImageUpload } = useSingleImageUpload({
    initialImageUrl,
    onSuccess: handleImageUrlsChange,
  });

  return (
    <Box css={wrapperStyling} {...attributes}>
      <Button
        css={uploadButtonStyling}
        type="button"
        size="small"
        variant="text"
        onClick={handleImageUploadButtonClick}
      >
        수정
      </Button>
      <input
        css={inputStyling}
        type="file"
        accept="image/*"
        id="profile-image"
        ref={inputRef}
        onChange={handleImageUpload}
      />
      <img css={imageStyling} src={uploadedImageUrl!} alt="사용자 프로필 이미지" />
    </Box>
  );
};

export default memo(ProfileImageInput);
