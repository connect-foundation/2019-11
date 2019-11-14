import styled from 'styled-components';
import React, { useState , useEffect} from 'react';
import ButtonSelect from './ButtonSelect';
import ButtonDays from './ButtonDays';
const TradeWrap= styled.div` 
    margin: 0 auto;
    width:63rem;
`;
const TradeTitle = styled.div`

    text-align:left;
`;

const RightAlign = styled.div` 
display:flex;
justify-content:flex-end;
height:2rem;
margin:0 0 0.5rem;
`;

const PageWrap = styled.div` 
display:flex;
justify-content:center;
`;

const TableWrap = styled.div`
width:100%;
height:30.5rem;
border-bottom:solid 0.1rem #FEF2C7;
`;
const TableCustom = styled.table` 
text-align:center;
width:100%;
border-collapse:separate;
border-spacing:0 0.5rem;
`;
const TableHeadWrap = styled.thead` 
background-color:#FEF2C7;
`;

const TableHead = styled.th` 
width:10%;
`;
const TableHeadDate = styled.th` 
width:12%;
`;
const TableHeadTitle = styled.th` 
width:36%;
`;

const TdCategory = styled.td` 
color:${props => props.isSale ? "red":"green"}
`;
const TdDeviation = styled.td` 
color:${props => props.isPlus ? "blue":"red"}
`;

//page_num
//selected_num
const ButtonPage = styled.button`
    all:unset;
    margin:0 0.5rem 0 0.5rem;
    width:1rem;
    height:1rem;
    color:${props => props.page_num===props.selected_num ? "black":"#FEAA6E"};
    &:hover{
        cursor:pointer;
      }
      
`;

function TradeList(props) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [sale_s, setSale_s] = useState(true);
    const [buy_s, setBuy_s] = useState(true);
    const [all_s, setAll_s] = useState(true);
    const [day_s, setDay_s] = useState(1);
    const [page, setPage] = useState(1);

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

    function pageclick(page_num){
        setPage(page_num);
    }


    return (
      <TradeWrap>
        <TradeTitle>
            <h3>거래 내역</h3>
        </TradeTitle>

        <RightAlign>
            <ButtonSelect name="판매" select={()=>setSale()}/>  
            <ButtonSelect name="구매" select={()=>setBuy()}/>            
        </RightAlign>
        <RightAlign>
            <ButtonDays 
            select_1d={()=>setDay(1)} select_1w={()=>setDay(7)}
            select_1y={()=>setDay(365)} select_3y={()=>setDay(365*3)}
            />
        </RightAlign>
        
        <TableWrap>

            <TableCustom>
                <TableHeadWrap>
                    <tr>
                        <TableHead></TableHead>
                        <TableHeadTitle>상품제목</TableHeadTitle>
                        <TableHeadDate>등록일</TableHeadDate>
                        <TableHeadDate>거래일</TableHeadDate>
                        <TableHead>편차</TableHead>
                        <TableHead>희망가격</TableHead>
                        <TableHead>거래가격</TableHead>
                    </tr>
                </TableHeadWrap>
                <tbody>
                    {loading ? <div>데이터 로딩중...</div> : data.map((item) => {
                        let category="판매";
                        if(item["판매"]===0){
                            category="구매"
                        }
                        return (
                        <tr>
                            <TdCategory isSale={item["판매"]}>{category}</TdCategory>
                            <td>{item["상품제목"]}</td>
                            <td>{item["등록일"]}</td>
                            <td>{item["거래일"]}</td>
                            <TdDeviation isPlus={item["편차"]>=0}>{item["편차"]}</TdDeviation>
                            <td>{item["희망가격"]}</td>
                            <td>{item["거래가격"]}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </TableCustom>
        </TableWrap>
        <PageWrap>
            <ButtonPage>&lt;</ButtonPage>
            <ButtonPage page_num={1} onClick={()=>pageclick(1)} selected_num={page}>1</ButtonPage>
            <ButtonPage page_num={2} onClick={()=>pageclick(2)} selected_num={page}>2</ButtonPage>
            <ButtonPage page_num={3} onClick={()=>pageclick(3)} selected_num={page}>3</ButtonPage>
            <ButtonPage page_num={4} onClick={()=>pageclick(4)} selected_num={page}>4</ButtonPage>
            <ButtonPage page_num={5} onClick={()=>pageclick(5)} selected_num={page}>5</ButtonPage>
            <ButtonPage page_num={6} onClick={()=>pageclick(6)} selected_num={page}>6</ButtonPage>
            <ButtonPage page_num={7} onClick={()=>pageclick(7)} selected_num={page}>7</ButtonPage>
            <ButtonPage page_num={8} onClick={()=>pageclick(8)} selected_num={page}>8</ButtonPage>
            <ButtonPage page_num={9} onClick={()=>pageclick(9)} selected_num={page}>9</ButtonPage>
            <ButtonPage page_num={10} onClick={()=>pageclick(10)} selected_num={page}>10</ButtonPage>
            <ButtonPage>&gt;</ButtonPage>
        </PageWrap>
      </TradeWrap>
    );
  }
  
  export default TradeList;