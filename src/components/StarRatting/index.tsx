import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

type StarRatingProps = {
  rating: number;
};

const StartRatting = ({ rating }: StarRatingProps) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} size={14} />);
    } else if (i === fullStars && halfStar) {
      stars.push(<FaRegStarHalfStroke key={i} size={14} />);
    } else {
      stars.push(<FaRegStar key={i} size={14} />);
    }
  }
  return <>{stars.map((start) => start)}</>;
};

export default StartRatting;
