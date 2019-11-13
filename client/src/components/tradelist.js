import styled from 'styled-components';
import React, { useState , useEffect} from 'react';

const Trade_title = styled.div` 
    text-align:left;
`;

const Right_align = styled.div` 
display:flex;
justify-content:flex-end;
height:2.5rem;
`;
const Center_align = styled.div` 
display:flex;
justify-content:center;
height:2.5rem;
`;
const Table_Wrap = styled.div`
border:solid 0.1rem;
width:50rem;
height:31.5rem;
`;
const Table_custom = styled.table` 
width:50rem;
`;
const Table_head = styled.th` 
width:4rem;
`;
const Table_head_date = styled.th` 
width:7rem;
`;
const Table_head_title = styled.th` 
width:20rem;
`;

function TradeList(props) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [sale_s, setSale_s] = useState(true);
    const [buy_s, setBuy_s] = useState(true);
    const [day_s, setDay_s] = useState(1);

    const getData = (sale,buy,day) => {
        fetch('mock/trade_mock/trade_dummy_data.json'
        ).then(result => {
            return result.json();
        }).then(result => {
            setData([]);
            setData(
                result.reduce((acc,ele,i)=>{
                let today = new Date();
                let check_day= new Date(ele["거래일"]);
                let day_check = (today-check_day)/1000/60/60/24;
                if(day>=day_check){
                    //판매만 참
                    if(ele["판매"]===1&&sale){
                        acc.push(ele);
                    }
                    if(ele["구매"]===1&&buy){
                        acc.push(ele);
                    }
                }
                return acc;
                },[])
            );
            setLoading(false);
        })
    }

    useEffect(()=>{
        getData(sale_s,buy_s,day_s);
    },[sale_s,buy_s,day_s]);


    function setSale(){
        if(sale_s){
            setSale_s(false); 
        }else{
            setSale_s(true); 
        }    
    }
    function setBuy(){
        if(buy_s){
            setBuy_s(false); 
        }else{
            setBuy_s(true); 
        }  
    }
    function setDay(day){
        setDay_s(day);
    }


    if (loading) return <div>Loading...</div>;
    return (
      <div>
        <Trade_title>
            <h3>거래 내역</h3>
        </Trade_title>

        <Right_align>
            <button onClick={setSale}>
                판매
            </button>
            <button onClick={setBuy}>
                구매
            </button>
        </Right_align>
        <Right_align>
            <button onClick={()=>setDay(1)}>1일</button>
            <button onClick={()=>setDay(7)}>1주일</button>   
            <button onClick={()=>setDay(365)}>1년</button>   
            <button onClick={()=>setDay(365*3)}>3년</button>     
        </Right_align>
        
        <Table_Wrap>
            <Table_custom>
                <thead>
                    <tr>
                        <Table_head></Table_head>
                        <Table_head_title>상품제목</Table_head_title>
                        <Table_head_date>등록일</Table_head_date>
                        <Table_head_date>거래일</Table_head_date>
                        <Table_head>편차</Table_head>
                        <Table_head>희망가격</Table_head>
                        <Table_head>거래가격</Table_head>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        let category="판매";
                        if(item["판매"]===0){
                            category="구매"
                        }
                        return (
                        <tr>
                            <td>{category}</td>
                            <td>{item["상품제목"]}</td>
                            <td>{item["등록일"]}</td>
                            <td>{item["거래일"]}</td>
                            <td>{item["편차"]}</td>
                            <td>{item["희망가격"]}</td>
                            <td>{item["거래가격"]}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </Table_custom>
        </Table_Wrap>
        <Center_align>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        </Center_align>
      </div>
    );
  }
  
  export default TradeList;