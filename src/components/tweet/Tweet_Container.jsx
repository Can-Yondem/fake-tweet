import React from "react";

import {
  ApprovedIcon,
  CircleIcon,
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
} from "../icons/Icons";
import AvatarLoader from "./AvatarLoader";

export const Tweet_Container = ({ props }) => {
  const formatNumber = (number) => {
    if (number >= 1000000000) {
      const new_number = (number / 1000000000).toFixed(1);
      return `${new_number}B`;
    } else if (number >= 1000000) {
      const new_number = (number / 1000000).toFixed(1);
      return `${new_number}M`;
    } else if (number >= 1000) {
      const new_number = (number / 1000).toFixed(1);
      return `${new_number}K`;
    }
    return number;
  };

  const formatDate = (date) => {
    const months = props.language.card_months;

    const split_date = date.split("-");
    const day = split_date[2];
    const month = months[split_date[1] - 1];
    const year = split_date[0];
    if(props.language.lang === "tr"){
      return `${day} ${month} ${year}`;
    }
    return `${month} ${day}, ${year}`;
  };

  const formatTime = (time) => {
    const split_time = time.split(":");
    const hour = split_time[0];
    const min = split_time[1];

    if(props.language.lang === "tr"){
      if(hour < 12){
        return `${props.language.card_AM} ${hour}:${min}`
      }
      return `${props.language.card_PM} ${hour-12}:${min}`
    }
    else if(props.language.lang === "en"){
      if(hour < 12){
        return `${hour}:${min} ${props.language.card_AM}`
      }
      return `${hour}:${min} ${props.language.card_PM}`
    }
    
  }

  const formatTweet = (tweet) => {
    tweet = tweet
    .replace(/@([\wü]+)/g, '<span class="blue">@$1</span>')
    .replace(/#([\wşçöğüıİ]+)/gi, '<span class="blue">#$1</span>')
    .replace(/(https?:\/\/[\w\.\/]+)/, '<span class="blue">$1</span>')
    .replace(/\n/g, '<br />');
  return tweet;
  }

  return (
    <div className="tweet-card">
      <div className="tweet-author">
        <div>
          {(props.avatar && <img src={props.avatar} />) || (
            <AvatarLoader className="avatar" />
          )}
        </div>
        <div className="name-container">
          <div className="name">
            <span className="approved">{props.name || props.language.card_name}</span>{" "}
            {props.approved == 1 && <ApprovedIcon />}
          </div>
          <div className="username">@{props.username || props.language.card_username}</div>
        </div>
        <div className="circle">
          <CircleIcon />
        </div>
      </div>
      <div className="tweet">
      <p
              dangerouslySetInnerHTML={{
                __html:
                props.tweet ? formatTweet(props.tweet) : props.language.card_tweet
              }}
            />

      </div>
      <div className="status-one">
        <a href="">
          <span>{props.time ? formatTime(props.time) : props.language.lang === "tr" ? `${props.language.card_AM} 01:00` : `01:00 ${props.language.card_AM}`} · </span>
          <span>{props.date ? formatDate(props.date) : props.language.lang === "tr" ? `01 ${props.language.card_months[0]} 2021` : `${props.language.card_months[0]} 01, 2021`}</span>
        </a>
        <span>.</span>
        <a href="">
          <span>· {props.device || "Twitter Web App"}</span>
        </a>
      </div>
      <div className="status-two">
        <a href="">
          <span>{formatNumber(props.retweet) || 0} </span>
          <span>{props.language.card_retweet}</span>
        </a>
        <a href="">
          <span>{formatNumber(props.quote) || 0} </span>
          <span>{props.language.card_quotetweet}</span>
        </a>
        <a href="">
          <span>{formatNumber(props.like) || 0} </span>
          <span>{props.language.card_like}</span>
        </a>
      </div>
      <div className="icons">
        <ReplyIcon />
        <RetweetIcon />
        <LikeIcon />
        <ShareIcon />
      </div>
    </div>
  );
};
