import React from 'react'
import './ProductCarousel.scss'
import Carousel from "react-elastic-carousel";
import Product from "../Product/Product";
import { Link } from 'react-router-dom';

function ProductCarousel({products, title, categoryLink}) {

    // Refs

    const carouselRef = React.useRef(null);

    // Variables

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 700, itemsToShow: 2 },
        { width: 1000, itemsToShow: 3 },
        { width: 1300, itemsToShow: 4 },
    ];

    // Functions

    const onNextStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
        // we hit the last item, go to first item
        carouselRef.current.goTo(0);
      }
    };
    
    const onPrevStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
        // we hit the first item, go to last item
        carouselRef.current.goTo(products.length);
      }
    };

    return (
        <div className="carousel">
            <div className="carousel__top">
                <h1>{title}</h1>
                {
                    categoryLink && <Link to={categoryLink}>See all</Link>
                }
            </div>
            <Carousel 
                breakPoints={breakPoints}
                ref={carouselRef}
                onPrevStart={onPrevStart}
                onNextStart={onNextStart}
                disableArrowsOnEnd={false}
            >
                {
                    products.map(({id, product}) => (
                        <Product key={id} product={product} />
                    ))
                }
            </Carousel>
        </div>
    )
}

export default ProductCarousel
