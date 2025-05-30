import {
  fontSizeOptions,
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  defaultArticleState,
} from 'src/constants/articleProps';
import { 
   useEffect, 
   SyntheticEvent, 
   useState, 
   useRef 
} from 'react';

import { Button } from 'src/ui/button';
import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
  
interface IArticleParamsForm {
  articleState: typeof defaultArticleState;
  setArticleState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
}

export const ArticleParamsForm = ({
  articleState,
  setArticleState,
}: IArticleParamsForm) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(articleState);
  const panelRef = useRef<HTMLElement>(null);

  const togglePanel = () => {
    if (!isOpen) {
      setFormState(articleState);
    }
    setIsOpen(prev => !prev);
  };

  const applySettings = (e: SyntheticEvent) => {
    e.preventDefault();
    setArticleState(formState);
    setIsOpen(false);
  };

  const onReset = () => {
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  const onClosePanel = (event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormState(articleState);
      document.addEventListener('mousedown', onClosePanel);
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', onClosePanel);
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('mousedown', onClosePanel);
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, articleState]);

  const asideClassName = `${styles.container} ${isOpen ? styles.container_open : ''}`;

  return (
    <>
      <ArrowButton 
        isOpen={isOpen} 
        onClick={togglePanel}
      />
      
      <aside
        ref={panelRef}
        className={asideClassName}
        aria-hidden={!isOpen}
      >
        <form className={styles.form} onSubmit={applySettings}>
          <Text as="h1" weight={800} size={31} uppercase>
            Задайте параметры
          </Text>
          
          <Select
            title="шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) => setFormState(prev => ({
              ...prev,
              fontFamilyOption: option
            }))}
          />
          
          <RadioGroup
            title="Размер шрифта"
            name="font-size"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(option) => setFormState(prev => ({
              ...prev,
              fontSizeOption: option
            }))}
          />
          
          <Select
            title="цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => setFormState(prev => ({
              ...prev,
              fontColor: option
            }))}
          />
          
          <Separator />
          
          <Select
            title="цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) => setFormState(prev => ({
              ...prev,
              backgroundColor: option
            }))}
          />
          
          <Select
            title="ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => setFormState(prev => ({
              ...prev,
              contentWidth: option
            }))}
          />
          
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={onReset}
            />
            <Button 
              title="Применить" 
              htmlType="submit" 
              type="apply" 
            />
          </div>
        </form>
      </aside>
    </> 
  );
};