import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import { connect } from 'react-redux';
import { selectLanguage } from 'rdx/user/selectors'

import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es';
import enUS from 'src/translations/en-US.json'
import ES from 'src/translations/sp-ES.json'

addLocaleData([...en, ...es]);


const messages = {
  'en-US': enUS,
  es: ES,
}

const TranslationContext = React.createContext();

class I18NProvider extends React.PureComponent {
  render() {
    const { lang, children } = this.props

    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        { children }
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  lang: selectLanguage(state),
})

export default connect(mapStateToProps)(I18NProvider);
