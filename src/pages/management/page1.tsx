import React, { useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import request from 'umi-request';

function onchange(current: any) {
  current.setState({ value: current.state.value == '1' ? '2' : '1' });
}
export default () => {
  const inputRef: any = useRef();
  const a = { a: 'a1', b: 'b2', c: 3 };
  const value = a.toString();
  useEffect(()=>{
    console.log('1');
    request.get('http://jsonplaceholder.typicode.com/posts/1').then(res=>console.log(res));
  })
  return (
    <>
      <Input ref={inputRef} defaultValue="1" />
      <Button onClick={() => onchange(inputRef.current)}>切换</Button>
      <Button>c1</Button>
      {/* {console.log(value)} */}
      {/* <Input defaultValue={value}/> */}
    </>
  );
};
