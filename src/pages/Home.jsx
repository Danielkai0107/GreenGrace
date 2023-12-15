import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Home() {
  const [current, setCurrent] = useState('p1');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => {
        switch (prev) {
          case 'p1': return 'p2';
          case 'p2': return 'p3';
          default: return 'p1';
        }
      });
    }, 8000); // Change slide every 3 seconds

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <section className='home'>
      <ul className={current === 'p1' ? 'p1 active' : 'p1'}>
        <figure></figure>
        <li className='context-home'>
          <p className='logo-zh'>質栽設計</p>
          <p className='main'>自己空間<span>｜</span>自己佈置</p>
          <p className='second'>與我們一起，讓佈置變得更簡單，更有趣</p>
          <p className='second-sm'>打造您的綠色空間</p>
          <section className='home-btn'>
            <Link to='/GreenDeco'>植栽佈置</Link>
            {/* <Link to='/WeddingDeco'>婚禮佈置</Link> */}
          </section>
        </li>
      </ul>
      <ul className={current === 'p2' ? 'p2 active' : 'p2'}>
        <figure></figure>
        <li className='context-home'>
          <p className='logo-zh'>質栽設計</p>
          <p className='main'>一鍵佈置<span>｜</span>即時預覽</p>
          <p className='second'>與我們一同創作，將質感化為現實</p>
          <p className='second-sm'>一站式解決佈置困擾</p>
          <section className='home-btn'>
            <Link to='/GreenDeco'>植栽佈置</Link>
            {/* <Link to='/WeddingDeco'>婚禮佈置</Link> */}
          </section>
        </li>
      </ul>
      <ul className={current === 'p3' ? 'p3 active' : 'p3'}>
        <figure></figure>
        <li className='context-home'>
          <p className='logo-zh'>質栽設計</p>
          <p className='main'>創造您的質感生活</p>
          <p className='second'>讓我們為您編織一個絕美的空間</p>
          <p className='second-sm'>編織夢想空間</p>
          <section className='home-btn'>
            <Link to='/GreenDeco'>植栽佈置</Link>
            {/* <Link to='/WeddingDeco'>婚禮佈置</Link> */}
          </section>
        </li>
      </ul>
    </section>
  )
}

export default Home
