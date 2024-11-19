import React from "react";
import cardCss from "../css/card.css";
import{CAMPUSM_ASSETS_SANDBOX} from "../constants";
import { Swiper, SwiperItem } from "../components/swiper";
import DraggableCard from "../components/draggablecard";
import NavigableActionButtons from "../components/utils/navigableActionButtons";
const contentData = [
  {
    id: 1,
    title: "Content 1",
    description: "Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho Lorem ipsum dimsum cho",
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
const AMT_img = `${CAMPUSM_ASSETS_SANDBOX}/images/recumbent-bike.svg`;
const bck_img = 'https://www.loveandoliveoil.com/wp-content/uploads/2015/03/soy-sauce-noodlesH2.jpg';

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
              <div className={cardCss.card_header} style={{ backgroundImage: `url(${bck_img})`, backgroundSize: 'cover' }}>>

              </div>
              <div className={cardCss.card_body}>
                <div>
                  <h1>{content.title}</h1>
                  <p>Myanmar Cuisine</p>
                  <span>{content.description}</span>
                </div>

                <div>
                  <button className={cardCss.rateButton} onClick={()=>console.log("wohooo")}>Rate Your Place</button>
                </div>
              </div>
              <div className={cardCss.card_footer}>
                <div className={cardCss.navigableButtons}>
                  <h1>Navigate here</h1>
                  <div className={cardCss.navButtonsFlexContainer}>
                    <div className={cardCss.navButtonComponent}>
                      <NavigableActionButtons actionName="Drive" actionLink="" img={AMT_img}>
                      </NavigableActionButtons>
                    </div>
                    <div className={cardCss.navButtonComponent}>
                      <NavigableActionButtons actionName="Drive" actionLink="" img={AMT_img}>
                      </NavigableActionButtons>
                    </div>
                    <div className={cardCss.navButtonComponent}>
                      <NavigableActionButtons actionName="Drive" actionLink="" img={AMT_img}>
                      </NavigableActionButtons>
                    </div>
                    <div className={cardCss.navButtonComponent}>
                      <NavigableActionButtons actionName="Drive" actionLink="" img={AMT_img}>
                      </NavigableActionButtons>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DraggableCard>
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default Screen;
