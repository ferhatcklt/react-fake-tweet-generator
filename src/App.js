import Q from 'q';
import React, {useState} from 'react';
import './App.scss';
import { LikeIcon, ReplyIcon, RetweetIcon, ShareIcon, VerifiedIcon } from './components/icons';

const tweetFormat = tweet => {
  tweet = tweet
  .replace(/@([\w]+)/g,'<span>@$1</span>')
  .replace(/#([\wşçöğıİÜÖÇŞĞ]+)/gi,'<span>#$1</span>')
  .replace(/(https?:\/\/[\w\.\/]+)/,'<span>$1</span>')
  return tweet;
};

const formatNumber = number => {
  if(number < 1000){
    return number;
  }
  number /= 1000;
  number = String(number).split('.');
  return number[0] + (number[1] > 100 ? ','+number[1].slice(0,1)+' B':' B');
};

function App() {
  const [name, setName] = useState();
  const [username,setUsername] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [tweet, setTweet] = useState();
  const [avatar,setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);

  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet Ayarları</h3>
        <ul>
          <label>Ad Soyad</label><li><input type="text" className="input"  value={name} onChange={e => setName(e.target.value)} /></li>
          <label>Kullanıcı Adı</label><li><input type="text" className="input" value={username} onChange={e => setUsername(e.target.value)}/></li>
          <label>Tweet</label><li><textarea type="text" className="input" value={tweet} onChange={e => setTweet(e.target.value)}  maxLength="290" /></li>
          <label>Retweet</label><li><input type="text" className="input"  value={retweets} onChange={e => setRetweets(e.target.value)}/></li>
          <label>Alıntı Tweet</label><li><input type="text" className="input" value={quoteTweets} onChange={e => setQuoteTweets(e.target.value)}/></li>
          <label>Beğeni</label><li><input type="text" className="input"  value={likes} onChange={e => setLikes(e.target.value)}/></li>
          <button>Oluştur</button>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="tweet">
          <div className="tweet-author">
            <img src="https://pbs.twimg.com/profile_images/1421390859858235398/O20MKpKX_normal.jpg" alt="" />
            <div>
              <div className="name">{name || 'Ad Soyad'} {isVerified && <VerifiedIcon />} </div>
              <div className="username">@{username || 'kullaniciadi'}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p dangerouslySetInnerHTML={{__html:(tweet && tweetFormat(tweet)) || 'Tweet bu alanda görüntülenecek.'}}></p>
          </div>
          <div className="tweet-stats">
            <span><b>{formatNumber(retweets)}</b> Retweet</span>
            <span><b>{formatNumber(quoteTweets)}</b> Alıntı Tweetler</span>
            <span><b>{formatNumber(likes)}</b> Beğeni</span>
          </div>
          <div className="tweet-actions">
            <span><ReplyIcon /></span>
            <span><RetweetIcon /></span>
            <span><LikeIcon /></span>
            <span><ShareIcon /></span>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default App;
