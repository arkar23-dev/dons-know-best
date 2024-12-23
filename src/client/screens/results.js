import React, { useRef } from "react";
import cardCss from "../css/card.css";
import { CAMPUSM_ASSETS_SANDBOX } from "../constants";
import { Swiper, SwiperItem } from "../components/swiper";
import DraggableCard from "../components/draggablecard";
import NavigableActionButtons from "../components/utils/navigableActionButtons";
import { Rating } from "react-simple-star-rating";
import { BasicSegment } from "@ombiel/aek-lib";

const contentData = [
  {
    id: 1,
    title: "Content 1",
    description:
      "Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum",
    rating: 4,
  },
  {
    id: 2,
    title: "Content 2",
    description:
      "Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum",
    rating: 2.5,
  },
  {
    id: 3,
    title: "Content 3",
    description:
      "Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum",
    rating: 4.75,
  },
  {
    id: 4,
    title: "Content 4",
    description:
      "Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum",
    rating: 3,
  },
];
const AMT_img = `${CAMPUSM_ASSETS_SANDBOX}/images/recumbent-bike.svg`;
const bck_img =
  "https://www.loveandoliveoil.com/wp-content/uploads/2015/03/soy-sauce-noodlesH2.jpg";

const Screen = () => {
  const [data, setData] = React.useState(contentData);
  const [loading, setLoading] = React.useState(false);

  const swiperRef = useRef();

  return (
    <BasicSegment style={{ padding: 0 }}>
      <Swiper
        loadMore={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setData(() => [...data, ...data]);
            swiperRef.current.nextSlide();
          }, 2000);
        }}
        preventSwipeOnLoading={loading}
        ref={swiperRef}
      >
        {data.map((content, index) => (
          <SwiperItem key={content.id} loading={loading}>
            <DraggableCard
              onSwipeLeft={() => alert("You Swipe Left")}
              onSwipeRight={() => alert("You Swipe Right")}
            >
              <div className={cardCss.card}>
                <div
                  className={cardCss.card_header}
                  style={{
                    backgroundImage: `url(${bck_img})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className={cardCss.card_body}>
                  <div>
                    <h1>{content.title}</h1>
                    <p>
                      Myanmar Cuisine{" "}
                      <Rating
                        readonly={true}
                        initialValue={content.rating}
                        size={15}
                        allowFraction={true}
                      ></Rating>
                    </p>
                    <span>{content.description}</span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="button"
                      className={cardCss.rateButton}
                      onClick={() => console.log("wohooo")}
                    >
                      Rate This Place
                    </button>
                  </div>
                </div>
                <div className={cardCss.card_footer}>
                  <div className={cardCss.navigableButtons}>
                    <h1>Navigate here</h1>
                    <div className={cardCss.navButtonsFlexContainer}>
                      <div className={cardCss.navButtonComponent}>
                        <NavigableActionButtons
                          actionName="Drive"
                          actionLink=""
                          img={AMT_img}
                        ></NavigableActionButtons>
                      </div>
                      <div className={cardCss.navButtonComponent}>
                        <NavigableActionButtons
                          actionName="Drive"
                          actionLink=""
                          img={AMT_img}
                        ></NavigableActionButtons>
                      </div>
                      <div className={cardCss.navButtonComponent}>
                        <NavigableActionButtons
                          actionName="Drive"
                          actionLink=""
                          img={AMT_img}
                        ></NavigableActionButtons>
                      </div>
                      <div className={cardCss.navButtonComponent}>
                        <NavigableActionButtons
                          actionName="Drive"
                          actionLink=""
                          img={AMT_img}
                        ></NavigableActionButtons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DraggableCard>
          </SwiperItem>
        ))}
      </Swiper>
    </BasicSegment>
  );
};

export default Screen;
