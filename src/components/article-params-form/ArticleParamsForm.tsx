import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui//button';
import { Text } from 'src/ui/text';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, FormEvent } from 'react';

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setAppState } = props;

	const [isOpened, setIsOpened] = useState<boolean>(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setAppState(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setFormState(defaultArticleState);

		setAppState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				onClick={() => setIsOpened((currentIsOpened) => !currentIsOpened)}
				isOpen={isOpened}
			/>
			<div
				onClick={() => setIsOpened(false)}
				className={clsx(styles.overlay, isOpened && styles.overlay_open)}></div>
			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
