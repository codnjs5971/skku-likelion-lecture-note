import React, { useState } from "react";
import style from "../css/ApiPractice.module.css"

export default function ApiPractice(){
    const [유저아이디, 유저아이디변경] = useState(1);
    const [유저, 유저변경] = useState('');
    const [게시글제목, 게시글제목변경] = useState('');
    const [게시글내용, 게시글내용변경] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');

    const handleGetUser = () =>{
        console.log(유저아이디)
        console.log(게시글제목)
        console.log(게시글내용)
        fetch('https://jsonplaceholder.typicode.com/users/'+유저아이디).then(
        (res)=>{
            if(!res.ok) throw new Error('no user')
            return res.json();
    }).then((user) => {
        유저변경(user)
        console.log(user);

    }).catch((error)=>{
        setError(error.message);
        console.log(error);
    });
        
    }


    const handlePostBlog = () => {
        fetch('https://jsonplaceholder.typicode.com/users/',{
            method: "POST",
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
        body: JSON.stringify({
            title: 게시글제목,
            body: 게시글내용,
            userId:1
        })}
        ).then(
            (res)=>{
                return res.json();
            }).then((data) => {
                console.log(data);
                setResponse(data);
            }).catch((error)=>{
                setError(error.message);
                console.log(error.message);
            })
    }

    return (<div className={style.container}>
        <h1 className={style.heading}>API 연습</h1>
        <div className={style.section}>
            <input className={style.input}
            type='number'
            min='1'
            max='10'
            value={유저아이디}
            onChange={(e)=>{유저아이디변경(e.target.value)}}
            placeholder= 'User ID 1~10' />
            <button className={style.button} onClick={handleGetUser}>
                유저 정보 GET
            </button>
            <div className={style.card}>
                <p>
                    <strong>유저 이름: </strong> {유저.name}
                </p>
                <p>
                    <strong>유저 e-mail: </strong> {유저.email}
                </p>
                <p>
                    <strong>유저 전화번호: </strong> {유저.phone}
                </p>
                </div>
            </div>
            <hr/>
            <div className={style.section}>
                <input className={style.input} type='text' placeholder="게시글 제목" />
                <textarea className={style.textarea}
                value={게시글내용}
                onChange={(e)=>{게시글내용변경(e.target.value)}}
                placeholder='게시글 내용' rows='4' />
                <button className="{style.button}">
                    게시글 작성하기 post
                </button>
            </div>
            {response &&
            <div className={'${style.success} ${style.response}'}>
                게시글이 생성되었음: {response.id}
            </div>}
            {error &&
            <div className={'${style.error} ${style.response}'}>
                오류: {error}
            </div>}
        </div>
    );
}