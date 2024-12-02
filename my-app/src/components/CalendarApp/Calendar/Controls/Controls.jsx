import {nextMonthHandler, prevMonthHandler} from "../../../../store/calendarSlice";
import {useDispatch} from "react-redux";

const Controls = () => {
    const dispatch = useDispatch();
    return (
        <div className="buttons">
            <i
                className="bx bx-chevron-left"
                onClick={() => dispatch(prevMonthHandler())}
                role="button"
                aria-label="Previous Month"
            ></i>
            <i
                className="bx bx-chevron-right"
                onClick={() => dispatch(nextMonthHandler())}
                role="button"
                aria-label="Next Month"
            ></i>
        </div>
    );
};

export default Controls;
