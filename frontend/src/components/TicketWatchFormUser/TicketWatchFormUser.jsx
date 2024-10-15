import React, { useEffect, useState } from 'react'
import styles from './styles/TicketWatchFormUser.module.css'
import ithub from '../../../images/ithub.jpg'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { statusColorChecker, typeColorChecker } from '../../utils/ColorsChecker/ColorsChecker'


const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'

function TicketWatchFormUser() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const STATUS = Object.freeze({
        rejected: 'отказано',
        done: 'выполнено',
        inProgress: 'выполняется',
        sent: 'отправлено'
    })

    const TYPES = Object.freeze({
        complaint: 'Жалоба',
        offer: 'Предложение'
    })


    const page = 1
    const limit = 10

    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendServer}/user/ticket/${id}`, {
                    headers: { 
                        'Content-Type': 'application/json', 
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                setData(response?.data)
            } catch(error) {
                console.error(error)
            }
        }

        fetchData()
    }, [id])

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${backendServer}/image/getTicket/${id}`, {
                    responseType: 'blob', // Указываем, что ожидаем Blob (изображение)
                    headers: { 
                        'Content-Type': 'application/json', 
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const url = URL.createObjectURL(response.data);
                setImageUrl(url); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchImage();
    }, [id]);


    const truncateText = (text) => {
        return text?.length > 13 ? text.slice(0, 13) + '...' : text
    }

    const truncateTextFamilyName = (text) => {
        return text?.length > 1 ? text.slice(0, 1) + '.' : text
    }

  return (
    <div className={styles.ticket__watch__form__user}>
      <div className={`${styles.ticket__watch__form__user__container} _container`}>
        <div className={`${styles.ticket__watch__form__user__headers__block} ${styles.headers__block}`}>
            <div className={`${styles.headers__block__title__block} ${styles.title__block}`}>
                <h6 className={styles.title__block__header}>Название</h6>
                <p className={styles.title__block__parg}>{truncateText(data?.heading)}</p>
            </div>
            <div className={`${styles.headers__block__type__block} ${styles.type__block}`}>
                <h6 className={styles.type__block__header}>Тип</h6>
                <p 
                    className={styles.type__block__parg}
                    style={typeColorChecker(data?.type)}
                >{data?.type}</p>
            </div>
            <div className={`${styles.headers__block__status__block} ${styles.status__block}`}>
                <h6 className={styles.status__block__header}>Статус</h6>
                <p 
                    className={styles.status__block__parg}
                    style={statusColorChecker(data?.status)}
                >{data?.status}</p>
            </div>
        </div>

        <div className={`${styles.ticket__watch__form__user__desc__block} ${styles.desc__block}`}>
            <div className={styles.desc__block__header}><span>Описание</span></div>
            <p className={styles.desc__block__description}>
                {data?.description}
            </p>
        </div>

        {imageUrl && 
            <div className={`${styles.ticket__watch__form__user__image__block} ${styles.image__block}`}>
                <img className={styles.image__block__img} src={imageUrl} alt="uploaded" />
                <div className={styles.image__block__text}><span>Картинка</span></div>
            </div>
        }
        {data?.comment &&
        <div className={`${styles.ticket__watch__form__user__comment__block} ${styles.comment__block}`}>
            <div className={styles.comment__block__header}>
                <span className={styles.comment__block__header__title}>Комментарий к ответу</span>
                <span className={styles.comment__block__header__author__name}>{truncateTextFamilyName(data?.moderator_name)}{truncateTextFamilyName(data?.moderator_patronymic)} {truncateText(data?.moderator_surname)}</span>
            </div>
            <p className={styles.comment__block__response}>{data?.comment}</p>
        </div>  
        }
        <div className={`${styles.ticket__watch__form__user__back__button__block} ${styles.back__button__block}`}>
            <Link 
                className={styles.back__button__block__btn}
                to={'/main-page-user'}
            >Назад</Link>
        </div>
      </div>
    </div>
  )
}

export default TicketWatchFormUser
