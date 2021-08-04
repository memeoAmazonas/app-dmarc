import React from 'react';
import { ItemsRadioList, ContainerCardRadio } from 'common/components/FlexContainer/CardContainer';
import Font from 'common/components/Font';
import { FormattedMessage } from 'react-intl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const RadioButtonList = ({
  title = 'empty', values = {}, selected, onSelected = () => null, details = [],
}) => {
  const content = details.map((item) => (
    <FormControlLabel
      control={<Radio color="primary" />}
      key={item.label}
      label={<FormattedMessage id={item.label} />}
      value={item.value}
      disabled={item.disabled}
    />
  ));
  return (
    <ContainerCardRadio>
      <React.Fragment>
        <Font variant="h3" component="h2">
          <FormattedMessage id={title} values={values} />
        </Font>
        <ItemsRadioList>
          <RadioGroup
            aria-label={title}
            name={title}
            value={selected}
            onChange={onSelected}
          >
            { content }
          </RadioGroup>
        </ItemsRadioList>
      </React.Fragment>
    </ContainerCardRadio>
  );
}
export default RadioButtonList;
