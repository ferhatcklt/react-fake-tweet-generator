import React, {useState, createRef, useEffect} from 'react';
import './App.scss';
import { LikeIcon, ReplyIcon, RetweetIcon, ShareIcon, VerifiedIcon } from './components/icons';
import {AvatarLoader} from './components/loaders';
import {useScreenshot} from 'use-react-screenshot';
import Switch from '@material-ui/core/Switch';

function convertImgToBase64(url, callback, outputFormat){
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var img= new Image;
  img.crossOrigin = 'Anonymous';
  img.onload=function(){
    canvas.height=img.height;
    canvas.width=img.width;
    ctx.drawImage(img,0,0);
    var dataUrl = canvas.toDataURL(outputFormat || 'image/png');
    callback.call(this, dataUrl);
    canvas=null;
  };
  img.src=url;
}

const tweetFormat = tweet => {
  tweet = tweet
  .replace(/@([\w]+)/g,'<span>@$1</span>')
  .replace(/#([\wşçöğıİÜÖÇŞĞ]+)/gi,'<span>#$1</span>')
  .replace(/(https?:\/\/[\w\.\/]+)/gi,'<span>$1</span>')
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
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState();
  const [username,setUsername] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [tweet, setTweet] = useState();
  const [avatar,setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [image,takeScreenshot ] = useScreenshot();
  const getImage = () => takeScreenshot(tweetRef.current);
  useEffect(() => {
    if(image){
      downloadRef.current.click();
    }
  }, [image]);
  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function(){
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  const fetchTwitterInfo = () => {
    fetch(`https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${username}`
  )
  .then(res => res.json())
  .then(data => {
    const twitter = data[0];
    setAvatar(twitter.profile_image_url_https);
    convertImgToBase64(twitter.profile_image_url_https, function(base64Image){
      setAvatar(base64Image);
    });
    setName(twitter.name);
    setTweet(twitter.status.text);
    setRetweets(twitter.status.retweet_count);
    setLikes(twitter.status.favorite_count);
    setIsVerified(twitter.verified);
  })
  }

  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet Ayarları</h3>
        <ul>
          <label>Ad Soyad</label><li><input type="text" className="input"  value={name} onChange={e => setName(e.target.value)} /></li>
          <label>Kullanıcı Adı</label><li><input type="text" className="input" value={username} onChange={e => setUsername(e.target.value)}/></li>
          <label>Tweet</label><li><textarea type="text" className="input" value={tweet} onChange={e => setTweet(e.target.value)}  maxLength="290" /></li>
          <label>Avatar</label><li><input type="file" className="input"  onChange={avatarHandle}   /></li>
          <label>Retweet</label><li><input type="text" className="input"  value={retweets} onChange={e => setRetweets(e.target.value)}/></li>
          <label>Alıntı Tweet</label><li><input type="text" className="input" value={quoteTweets} onChange={e => setQuoteTweets(e.target.value)}/></li>
          <label>Beğeni</label><li><input type="text" className="input"  value={likes} onChange={e => setLikes(e.target.value)}/></li>
          <label>Onaylı Hesap</label><li><Switch color="primary"  value={isVerified} onChange={e => setIsVerified(e.target.checked)}/></li>
          
          <button onClick={getImage}>Oluştur</button>
          <a href={image} download="tweet.png" ref={downloadRef} style={{display:"none"}}>Tweeti indir</a>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="fetch-info">
          <input value={username}  onChange={e => setUsername(e.target.value)} className="input" placeholder="Kullanıcı adı"/>
          <button onClick={fetchTwitterInfo}>Son Tweeti Çek</button>
        </div>
        <div className="tweet" ref={tweetRef}>
          <div className="tweet-author">
            {(avatar && <img src={avatar} alt="" />) || <AvatarLoader />}
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
