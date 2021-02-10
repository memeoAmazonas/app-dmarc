import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectLanguage } from 'rdx/user/selectors'
import { changeLanguage } from 'rdx/user/actions'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Font from 'common/components/Font';
import Button from 'common/components/Button';

export const LANG_CODES = {
  ENGLISH: 'en-US',
  SPANISH: 'es',
}

const getLangStr = (code) => {
  switch (code) {
    case LANG_CODES.ENGLISH:
      return 'English';
    case LANG_CODES.SPANISH:
      return 'Español';
    default:
      return '';
  }
}

const LanguageMenu = ({ language, changeLanguage }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const selelectLang = (newLang) => {
    changeLanguage(newLang);
    setAnchorEl(undefined);
  }

  return (
    <React.Fragment>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Font variant="h5" component="span">
          {getLangStr(language)}
        </Font>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={selelectLang.bind(this, LANG_CODES.ENGLISH)}>
          {getLangStr(LANG_CODES.ENGLISH)}
        </MenuItem>
        <MenuItem onClick={selelectLang.bind(this, LANG_CODES.SPANISH)}>
          {getLangStr(LANG_CODES.SPANISH)}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
};

const mapStateToProps = (state) => ({
  language: selectLanguage(state),
})
const mapDispatchToProps = ({
  changeLanguage,
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageMenu);
