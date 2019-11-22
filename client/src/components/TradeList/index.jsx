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
color:${props => props.isSaleElement ? "red":"green"}
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
    const [isSale, setIsSale] = useState(true);
    const [isBuy, setIsBuy] = useState(true);
    const [dayago, setDayago] = useState(1);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(1);

    const getData = (sale,buy,day) => {
        fetch('http://localhost:3000/api/log/filter',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userid":2,
                "dayago":day,
                "isSale":sale,
                "isBuy":buy,
                "page":page,
                "limit":10
            })
        }
        ).then(result => {
            return result.json();
        }).then(result => {
            setData([]);
            //임시로 판매, 구매 분기 처리/ 페이지 제작중
            if(sale&&buy){
                setData([]);
            }else if(sale||buy){
                if(buy){
                    let refactor = result[0].reduce((acc,ele,i)=>{
                        acc.push({
                            "title": ele.product.title,
                            "register_date": ele.product.registerDate,
                            "auction_price": ele.auctionPrice,
                            "auction_date": ele.auctionDate,
                            "is_winning": 1
                        });
                        return acc;
                    },[]);
                    setData(refactor);
                }else{
                    setData(result[0]);
                }
                result[1] = Number(result[1]);
                setAllPage(result[1]);//형변환이 안되고있는 문제가 생김
            }else{
                setData([]);
            }
            setLoading(false);
        })
    }

    useEffect(()=>{
        getData(isSale,isBuy,dayago);
    },[isSale,isBuy,dayago]);


    function setSale(){
        setIsSale(!isSale);  
    }
        
    function setBuy(){
        setIsBuy(!isBuy);
    }
    
    function setDay(day){
        setDayago(day);
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
                        let category="분류";//분류에 대해 페이지 제작중
                        let deviation =0;
                        if(item["hope_price"]!==undefined){
                            deviation= Math.floor((item["auction_price"]/item["hope_price"])*100);
                        }
                        return (
                        <tr>
                            {<TdCategory>{category}</TdCategory>}
                            <td>{item["title"]}</td>
                            <td>{item["register_date"]}</td>
                            <td>{item["auction_date"]}</td>
                            <TdDeviation isPlus={deviation>=0}>{deviation}</TdDeviation>
                            <td>{item["hope_price"]}</td>
                            <td>{item["auction_price"]}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </TableCustom>
        </TableWrap>
        <PageWrap>
            <ButtonPage>&lt;</ButtonPage>
            <ButtonPage page_num={1} onClick={()=>pageclick(1)} selected_num={page}>1</ButtonPage>
            <ButtonPage>&gt;</ButtonPage>
        </PageWrap>
      </TradeWrap>
    );//page부분 전체 페이지수(pageall)에 대해 반복으로 버튼 생성이 필요
  }
  
  export default TradeList;