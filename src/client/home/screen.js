import React from "react";
import cardCss from "../css/card.css";
import { Swiper, SwiperItem } from "../components/swiper";
import DraggableCard from "../components/draggablecard";
const contentData = [
  {
    id: 1,
    title: "Content 1",
    description: "This is the description for Content 1",
  },
  {
    id: 2,
    title: "Content 2",
    description: "This is the description for Content 2",
  },
  {
    id: 3,
    title: "Content 3",
    description: "This is the description for Content 3",
  },
  {
    id: 4,
    title: "Content 4",
    description: "This is the description for Content 4",
  },
];

const Screen = () => {
  const [data, setData] = React.useState(contentData);

  return (
    <Swiper
      loadMore={() => {
        alert('Load More');
        setData(() => [...data, ...data]);
      }}
    >
      {data.map((content) => (
        <SwiperItem key={content.id}>
          <DraggableCard
            onSwipeLeft={()=>alert('You Swipe Left')}
            onSwipeRight={()=>alert('You Swipe Right')}
          >
            <div className={cardCss.card}>
              <div className={cardCss.card_header}>{content.title}</div>
              <div className={cardCss.card_body}>
                <p className={cardCss.card_text}>{content.description}</p>
              </div>
              <div className={cardCss.card_footer}>footer</div>
            </div>
          </DraggableCard>
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default Screen;
