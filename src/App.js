 import './App.scss';
import './icons';
import { LikeIcon, ReplyIcon, RetweetIcon, ShareIcon, VerifiedIcon } from './icons';

function App() {
  return (
    <>
    <div className="tweet-settings">
      <h3>Tweet Ayarları</h3>
    </div>
      <div className="tweet-container">
        <div className="tweet">
          <div className="tweet-author">
            <img src="https://pbs.twimg.com/profile_images/1421390859858235398/O20MKpKX_normal.jpg" alt="" />
            <div>
              <div className="name">Haluk Levent <VerifiedIcon /></div>
              <div className="username">@haluklevent</div>
            </div>
          </div>
          <div className="tweet-content">
            <p>
            Yangınlarda zarar gören ihtiyaç sahipleri için 
            Serkan Buyruk ve
            Özgür Uludağ kardeşlerimiz
            50 şer bin TL destekte bulundular.

            Teşekkürler canlarım!
            
            </p>
          </div>
          <div className="tweet-stats">
            <span><b>24</b> Retweet</span>
            <span><b>24</b> Alıntı Tweetler</span>
            <span><b>24</b> Beğeni</span>
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
