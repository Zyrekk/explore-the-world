import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const renderStars = (rating: number): React.ReactElement => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = Array.from({ length: totalStars }, (_, index) => (
        <FontAwesome
            key={index}
            name={index < fullStars ? 'star' : hasHalfStar ? 'star-half-empty' : 'star-o'}
            size={20}
            color="#FDCC0D"
        />
    ));

    return <>{stars}</>;
};

export const StarRating = ({ rating }: { rating: number }) => {
    return renderStars(rating);
};
