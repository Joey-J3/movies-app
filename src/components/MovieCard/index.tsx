import React from "react";
import cardStyle from "./card.module.scss";

interface CardInterface {
  url: string;
  title: string;
  subTitle: string;
  publishDate: string;
}

function Card({ url, title, subTitle, publishDate }: CardInterface) {
  return (
    <div className={cardStyle["card"]} tabIndex={1}>
      <div className={cardStyle["card__img"]}>
        <img src={url} alt={title} />
        <div className={cardStyle["card__context-menu"]}>
          <div className={cardStyle["card__context-menu__ovals"]}>
            <div className={cardStyle["oval"]} />
            <div className={cardStyle["oval"]} />
            <div className={cardStyle["oval"]} />
          </div>
        </div>
      </div>
      <div className={cardStyle["card__content"]}>
        <div className={cardStyle["card__title"]}>
          <p>{title}</p>
          <div className={cardStyle["card__publish-date-box"]}>
            <span className={cardStyle["card__publish-date"]}>
              {publishDate}
            </span>
          </div>
        </div>
        <div className={cardStyle["card__sub-title"]}>{subTitle}</div>
      </div>
    </div>
  );
}

export default Card;
