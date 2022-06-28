import React, { useState } from "react";
import cardStyle from "./card.module.scss";
import clsx from "clsx";

interface CardInterface {
  url: string;
  title: string;
  subTitle: string;
  release_date: string;
  menuList?: Array<string>;
  onClickMenuItem?: (value: string) => any;
}

function Card({
  url,
  title,
  subTitle,
  release_date: publishDate,
  menuList = [],
  onClickMenuItem,
}: CardInterface) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const onClickContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  const onClickMenuItemWithBlur = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    e.stopPropagation();
    setShowMenu(false);
    onClickMenuItem(value);
  };
  return (
    <div className={cardStyle["card"]} tabIndex={1}>
      <div className={cardStyle["card__img"]}>
        <img src={url} alt={title} />
        <div
          className={clsx(cardStyle["card__context-menu"], {
            [cardStyle["card__context-menu--active"]]: showMenu,
          })}
          onClick={onClickContextMenu}
          onBlur={() => setShowMenu(false)}
        >
          <div className={cardStyle["card__context-menu__ovals"]}>
            <div className={cardStyle["oval"]} />
            <div className={cardStyle["oval"]} />
            <div className={cardStyle["oval"]} />
          </div>
          <div
            className={clsx(cardStyle["card__context-menu__list"], {
              [cardStyle["card__context-menu__list--active"]]: showMenu,
            })}
          >
            {menuList.map((name, i) => (
              <div
                key={name + i}
                className={cardStyle["card__context-menu__list-item"]}
                onClick={(e) => onClickMenuItemWithBlur(e, name)}
              >
                {name}
              </div>
            ))}
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
