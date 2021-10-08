import { ReviewFormProps } from "./ReviewForm.props"
import React, { ForwardedRef, useState } from "react"
import { Input } from "../Input/Input"
import { Rating } from "../Rating/Rating"
import { Textarea } from "../Textarea/Textarea"
import { Button } from "../Button/Button"
import { Controller, useForm } from "react-hook-form"
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface"
import { API } from "../../helpers/api"
import styles from './ReviewForm.module.scss'
import CloseIcon from './close.svg'
import cn from 'classnames'
import axios from "axios"

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps, ref: ForwardedRef<HTMLFormElement>): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset  } = useForm<IReviewForm>()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId })
            if (data.message) {
                setIsSuccess(true)
                reset()
            } else {
                setError('Что-то пошло не так')
            }
        } catch (e: any) {
            setError(e.message)
        }
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className={cn(styles.reviewForm, className)} { ...props }>
                <Input
                    { ...register('name', { required: { value:true, message: 'Введите имя' }}) }
                    placeholder='Имя'
                    error={ errors.name }
                />
                <Input
                    { ...register('title', { required: { value:true, message: 'Введите заголовок' }}) }
                    placeholder='Заголовок отзыва'
                    className={ styles.title }
                    error={ errors.title }
                />
                <div className={ styles.rating }>
                    <span>Оценка:</span>
                    <Controller
                        control={ control }
                        name={ 'rating' }
                        rules={ { required: { value:true, message: 'Укажите рейтинг' }} }
                        render={ ({ field}) => (
                            <Rating
                                isEditable
                                rating={ field.value }
                                ref={ field.ref }
                                setRating={ field.onChange }
                                error={ errors.rating }
                            />
                        )}
                    />
                </div>
                <Textarea
                    { ...register('description', { required: { value:true, message: 'Введите заголовок' }}) }
                    placeholder='Текст отзыва'
                    className={ styles.description }
                    error={ errors.title }
                />
                <div className={ styles.submit }>
                    <Button appearance='primary'>Отправить</Button>
                    <span className={ styles.info }>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            { isSuccess && <div className={ cn(styles.success, styles.panel) }>
                <div className={ styles.successTitle }>Ваш отзыв отправлен !</div>
                <div className={ styles.successTitle }>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <CloseIcon className={ styles.close } onClick={ () => setIsSuccess(false) }/>
            </div> }
            { error && <div className={ cn(styles.error, styles.panel) }>
                Что-то пошло не так, попробуйте обновить страницу
                <CloseIcon className={ styles.close } onClick={ () => setError(undefined) }/>
            </div> }
        </form>
    )
}