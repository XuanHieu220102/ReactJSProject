import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount } from "./features/couter/couterReducer";
export const State = () => {
    const count = useSelector(state => state.counter.value)
    const name = useSelector(state => state.counter.name)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <button aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}>
                        Decrepment
                </button>
                <button aria-label="Decrement by mount value"
                    onClick={() => dispatch(incrementByAmount(5))}>
                        DecrepmentByMount
                </button>
                <h2>This is state of Redux {count}</h2>
                <h2>This is state name pf Redux {name}</h2>
            </div>
        </div>
    )
}