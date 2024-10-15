import React from 'react';
import Header from './components/Header';
import LanguageSelection from './components/LanguageSelection';
import SignInDropdown from './components/SignInDropdown';
import TextBoxes from './components/TextBoxes';
import TranslationOptions from './components/TranslationOptions';
import './index.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <SignInDropdown />
      <LanguageSelection />
      <TextBoxes />
      <TranslationOptions />
    </div>
  );
};

export default App;
