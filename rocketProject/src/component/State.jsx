import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount } from "./features/couter/couterReducer";
import { getInfor, getInfoById, getAllGroup } from "./features/apiSave/recalApiLoading";
import RecalApiLoading from "./features/apiSave/recalApiLoading";
export const State = () => {
    const count = useSelector(state => state.counter.value)
    const name = useSelector(state => state.counter.name)
    const responGroupApi = useSelector(state => state.apiSave.responGroupApi);
    const dispatch = useDispatch()
    dispatch(getAllGroup);
    console.log(responGroupApi,"111");
    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(getInfor())}
                >
                    call api
                </button>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(getInfoById(16))}
                >
                    call api by id
                </button>
                <button
                    aria-label="Increment value"
                    onClick={() => {
                        dispatch(getAllGroup())
                        console.log("HERE:", responGroupApi);
                    }}
                >
                    call group api
                </button>
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
                <h1>Group List</h1>
                {/* <ul>
                    {responGroupApi.content.map(group => (
                        <li key={group.id}>{group.groupName}</li>
                    ))}
                </ul> */}
            </div>
        </div>
    )
}