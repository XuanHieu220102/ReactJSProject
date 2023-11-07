import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const responApi = useSelector(state => state.apiSave.responApi);
  const responApiDetail = useSelector(state => state.apiSave.responApiDetail)
  console.log(responApiDetail);
  return <>
    {
      responApi?.length > 0 ?
        <>
          {
            responApi.map((el, index) =>
              <div key={index}>{el.name}</div>
            )

          }
        </> : 'no data'
    }
    <h2>{responApiDetail.name}</h2>
  </>
}
export default Form;