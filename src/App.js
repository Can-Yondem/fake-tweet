import React, { useState, useEffect, createRef } from "react";
import { useScreenshot } from "use-react-screenshot";
import "./App.css";
import { Tweet_Container } from "./components/tweet/Tweet_Container";
import { Warning } from "./components/tweet/Warning";
import { languages } from "./languages";
import axios from "axios";

function App() {
  /*States*/
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [tweet, setTweet] = useState("");
  const [retweet, setRetweet] = useState(0);
  const [quote, setQuote] = useState(0);
  const [like, setLike] = useState(0);
  const [avatar, setAvatar] = useState();
  const [approved, setApproved] = useState(0);
  const [fetchUsername, setFetchUsername] = useState("");
  const [isFind, setIsFind] = useState(true);
  const [image, takeScreenshot] = useScreenshot();
  const [device, setDevice] = useState("Twitter Web App");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [language, setLanguage] = useState(languages["tr"]);
  const getImage = () => takeScreenshot(tweetRef.current);

  /*Props*/
  const props = {
    name,
    username,
    tweet,
    retweet,
    quote,
    like,
    avatar,
    approved,
    device,
    date,
    time,
    language,
  };

  /*Twitter API*/
  const fetchTwitter = async () => {
    const url = `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${fetchUsername}`;
    await axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          const twitter = res.data[0];
          if (!twitter.status) {
            setIsFind(false);
            return 0;
          }
          convertImgToBase64(
            twitter.profile_image_url_https,
            function (base64Image) {
              setAvatar(base64Image);
            }
          );
          setName(twitter.name);
          setUsername(twitter.screen_name);
          setTweet(twitter.status.text);
          setRetweet(twitter.status.retweet_count);
          setLike(twitter.status.favorite_count);
        }
      })
      .catch(() => setIsFind(false));
  };

  /*Convert Avatar Format*/
  function convertImgToBase64(url, callback, outputFormat) {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL(outputFormat || "image/png");
      callback.call(this, dataURL);
      // Clean up
      canvas = null;
    };
    img.src = url;
  }

  /*Get Avatar*/
  const avatarHandle = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setAvatar(this.result);
      });
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFind(true);
    }, 3000);
  }, [isFind]);

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);

  return (
    <>
    {/*Tweet Seetings*/}
      <div className="tweet-settings">
        <h3 className="setting-title">{language.settings}</h3>
        <ul>
          <li>
            <label>{language.name}</label>
            <input
              type="text"
              name=""
              id=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>{language.username}</label>
            <input
              type="text"
              name=""
              id=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label>{language.tweet}</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              maxLength="280"
            ></textarea>
          </li>
          <li>
            <label>{language.avatar}</label>
            <input type="file" name="" id="" onChange={avatarHandle} />
          </li>
          <li>
            <label>{language.retweet}</label>
            <input
              type="number"
              value={retweet}
              onChange={(e) => setRetweet(e.target.value)}
            />
          </li>
          <li>
            <label>{language.quotetweet}</label>
            <input
              type="number"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </li>
          <li>
            <label>{language.like}</label>
            <input
              type="number"
              value={like}
              onChange={(e) => setLike(e.target.value)}
            />
          </li>
          <li>
            <label>{language.approved}</label>
            <select
              defaultValue={approved}
              onChange={(e) => setApproved(e.target.value)}
            >
              <option value="1">{language.yes}</option>
              <option value="0">{language.no}</option>
            </select>
          </li>
          <li>
            <label>{language.dateandtime}</label>
            <div className="date-and-time">
              <input
                className="time"
                type="time"
                onChange={(e) => setTime(e.target.value)}
              />
              <input
                className="date"
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </li>
          <li>
            <label>{language.device}</label>
            <select
              defaultValue="Twitter Web App"
              onChange={(e) => setDevice(e.target.value)}
            >
              <option value="Twitter Web App">Twitter Web App</option>
              <option value="Twitter for iPhone">Twitter for iPhone</option>
              <option value="Twitter for Android">Twitter for Android</option>
            </select>
          </li>
        </ul>
        <button className="button" onClick={getImage}>
          {language.create}
        </button>
        <div className="download-tweet">
          {image && <a ref={downloadRef} href={image} download="tweet.png"></a>}
        </div>
      </div>

      <div className="tweet-container">
        <div className="lang">
          <span
            onClick={() => setLanguage(languages["tr"])}
            className={language["lang"] === "tr" && "active"}
          >
            Türkçe
          </span>
          <span
            onClick={() => setLanguage(languages["en"])}
            className={language["lang"] === "en" && "active"}
          >
            English
          </span>
        </div>
        <Warning classname={!isFind ? "Active" : ""} language={language} /> 
        <div className="fetch-info">
          <input
            type="text"
            value={fetchUsername}
            onChange={(e) => setFetchUsername(e.target.value)}
            placeholder={language.gettweetinput}
          />
          <button className="button" onClick={fetchTwitter}>
            {language.gettweet}
          </button>
        </div>

        {/*Tweet Container*/}
        <div ref={tweetRef}>
          <Tweet_Container props={props} />
        </div>
      </div>
    </>
  );
}

export default App;
