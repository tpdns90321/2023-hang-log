import { css } from '@emotion/react';
import { Theme } from 'hang-log-design-system';

export const suggestionContainer = css({
  width: '500px',
  transform: 'translateY(0)',
});

export const getSuggestionItemStyling = (isFocused: boolean) =>
  css({
    backgroundColor: isFocused ? Theme.color.gray200 : Theme.color.white,
  });

export const emptyTextStyling = css({
  color: Theme.color.gray500,
  margin: Theme.spacer.spacing2,
});
