import { createRoot } from 'react-dom/client';
import { useState, StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

type ArticleState = typeof defaultArticleState;

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
const [articleState, setArticleState] = useState<ArticleState>(defaultArticleState);
  
  const {
    fontFamilyOption,
    fontSizeOption,
    fontColor,
    backgroundColor,
    contentWidth
  } = articleState;

  const cssVariables = {
    '--font-family': fontFamilyOption.value,
    '--font-size': fontSizeOption.value,
    '--font-color': fontColor.value,
    '--bg-color': backgroundColor.value,
    '--container-width': contentWidth.value,
  } as CSSProperties;

  return (
    <main
      className={clsx(styles.main)}
      style={cssVariables}>
      <ArticleParamsForm 
        articleState={articleState}
        setArticleState={setArticleState}
      />
      <Article />
    </main>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);