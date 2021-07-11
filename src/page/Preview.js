import styles from '../styles/Preview.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'

function Preview() {
    const name = useParams().name;
    const level = useParams().level;
    const [preview, setpreview] = useState([])

    useEffect(() => {
        axios({
            method: "POST",
            url: "http://104.155.150.122/preview",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                name,
                level
            })
        }).then(res => {
            setpreview(res.data.level.previewvideo)
        })
    }, [])
    return (
        <div className={styles.bg}>
            <h2 className={styles.title}>ตัวอย่างวิดิโอ</h2>
            {preview ? preview.map((item, index) =>
                    <div className = {styles.video} key={index}>
                        <ReactPlayer
                            url={[{ src: `https://storage.googleapis.com/video-course/${preview[index]}`, type: 'video/mp4' }]}
                            controls  // gives the front end video controls 
                            width='95%'
                            height='90%'
                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                            onContextMenu={e => e.preventDefault()}
                        />
                    </div>
                ) : null
                }
        </div>
    )
}
export default Preview;