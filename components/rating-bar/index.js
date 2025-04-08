const RatingBar = (props) => {


    return (
        function RatingBar({ rating }) {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                stars.push(
                    <span key={i} className={i <= rating ? 'filled' : ''}>★</span>
                );
            }
            return <div>{stars}</div>;
        }
    )
}


export default RatingBar;