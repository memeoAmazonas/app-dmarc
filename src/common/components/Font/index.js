import styled from 'styled-components';

import { theme } from 'src/theme';
import Typography from '@material-ui/core/Typography';


const Font = styled(Typography)`
   font-family: '${theme.fonts.fontFamilyPrimary}', ${theme.fonts.fontFamilySecondary} !important;

   label, input {
      font-family: '${theme.fonts.fontFamilyPrimary}', ${theme.fonts.fontFamilySecondary} !important;
   }

   &.MuiTypography-colorSecondary {
      color: ${theme.colors.grey5};
   }

   &.MuiTypography-body2 {
      font-size: ${theme.fonts.sizes.body2};
   }

   &.MuiTypography-body1 {
      font-size: ${theme.fonts.sizes.body1};
   }

   &.MuiTypography-h1 {
      font-size: ${theme.fonts.sizes.h1};
   }

   &.MuiTypography-h2 {
      font-size: ${theme.fonts.sizes.h2};
   }

   &.MuiTypography-h3 {
      font-size: ${theme.fonts.sizes.h3};
   }

   &.MuiTypography-h4 {
      font-size: ${theme.fonts.sizes.h4};
      color: ${(props) => (props.color ? props.color : 'inherit')}
   }

   &.MuiTypography-h5 {
      font-size: ${theme.fonts.sizes.h5};
   }

   &.MuiTypography-caption	{
      font-size: ${theme.fonts.sizes.caption};
   }

`;

export default Font;
