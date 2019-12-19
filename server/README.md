## (api)server 개발 서버 실행 절차

```bash
#[중요] .env.example 파일을 참고하여 .env 파일 설정
npm install
npm run build
docker-compose up -d mysql-server
docker-compose up -d api-server
```

## Notice
  - Client를 테스트 해보기 위해서는 seed 작업이 필요합니다.
```bash
   npm run seed
```

## .env.example
```
## Database
DB_TYPE=mysql
DB_HOST= YOUR-HOST
DB_DOCKER_COMPOSE_SERVICE_HOST=mysql-server
DB_PORT= YOUR-PORT
DB_USER= YOUR-USER
DB_PASSWORD= YOUR-PASSWORD
DB_NAME= YOUR-NAME

## Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_KEY=
KAKAO_API_KEY=

### Obeject Storeage
END_POINT=https://kr.object.ncloudstorage.com
REGION=kr-standard
ACCESS_KEY=
SECRET_KEY=
DEV_BUCKET=
BUCKET=

### Firebase
FIRE_API_KEY= 
FIRE_AUTH_DOMAIN= 
FIRE_DATABASE_URL= 
FIRE_PROJECT_ID= 
FIRE_STORAGE_BUCKET= 
FIRE_MESSAGING_SENDERID= 
FIRE_APP_ID= 
FIRE_MEASUREMENT_ID= 
```

### API
  - Default Path는 /api 입니다.
  
  - About Bids /bids
     - @Get() /
        - 모든 입찰 정보를 반환합니다.
     - @Get() /:id
        - 특정 입찰 정보를 반환합니다.
     - @Post() /
        - 새로운 입찰 정보를 생성합니다.
       
  - About Itmes /items
      - @Get() /category/:code
        - 특정 카테고리의 상품을 전부 가져옵니다.
      - @Get() /hot
        - 실시간 Hot 경매에 상품 5개를 반환합니다.
      - @Get() /deadline
        - 마감시간이 임박한 상품 5개를 반환합니다.
      - @Get() /related/:code/:id
        - 특정 상품과 연관된 상품을 반환합니다.
        
   - About Log /log
      - @Post() /filter
          - 필터가 적용된 상품 내역을 출력합니다. 
          
   - About Login /sign
      - @Post() /login
          - 사용자의 Id, password를 받아 로그인을 진행합니다.
          - jwt를 결과값으로 반환합니다.
      - @Post() /kakao
          - kakao OAuth login을 진행합니다.
          - 토큰을 확인하며 만료된 토큰인 경우 토큰을 새로 발급합니다.
          
       - @Post() /google
          - google 로그인을 진행합니다.
          - kakao OAuth와 진행 방식이 똑같습니다.
          
   - About Product /products
      - @Get() / 
        - 상품 목록을 반환합니다.
        - start와 limits를 인자로 받으며 시작 id와 받아올 개수 입니다.
      - @Get() /:id
        - id에 해당하는 상품 정보를 반환합니다.
        
      - @Get() /withBids/:id
        - 특정 id에 해당하는 상품을 반환합니다.
        - 해당 API는 입찰 정보를 포함하여 반환합니다.
        
      - @Get() /onlySale/:id/:start/:limits
        - 상품중 현재 판매중인 상품만 반환합니다.
        - 특정 사용자 id값을 기준으로 반환하며 start 부터 limits 개 만큼을 반환합니다.
       
      - @Patch() /:id
        - 특정 상품의 판매 상태를 변경합니다.
        - 판매 가격, 판매 일, 구매자 정보를 받아 입력합니다.
        
      - @Put() /:id
        - 특정 상품의 제목과 내용을 변경합니다.
      
      - @Post() /
        - 상품을 등록합니다.
        - timestamp를 필요로 하며 서버시간 기준으로 상품을 등록합니다.
        
      - @Post() /rating
        - 구매 또는 판매자의 매너지수를 변경합니다.
        - 거래 이후에 활성화 됩니다.
        
      - @Delete() /:id
        - 상품을 삭제합니다.
        - id에 해당하는 상품을 삭제합니다.
       
   - About Statics /statics
      - @Get() /categories
          - 카테고리 정보를 반환합니다.
          
   - About Storages /storage
      - @Post() /image
          - 이미지를 등록합니다.
          - 해당 이미지는 Base64로 인코딩 된 정보를 디코딩 하여 저장합니다.
          - Blob에서 타입을 제외한 순수한 데이터 영역만 있어야 합니다.
       - @Post() /profile
          - 프로필 이미지를 등록합니다.
          - 상세 내용은 image와 유사합니다.
       - @Delete() /image
          - 등록된 이미지를 삭제합니다.
          - 상품 등록간에 문제가 생겼을 때 사용됩니다.
          
   - About Users /users
       - @Get() /
          - 사용자의 정보를 받아옵니다.
          - 로그인 중인 사용자의 token을 헤더로 반환합니다.
          
       - @Delete() /:id
          - 특정사용자를 회원 탈퇴 처리합니다.
        
       - @Post() /idx
          - 특정 id를 받아 사용자의 정보를 합니다.
          - 로그인 이후 사용되며 사용자의 정보를 가져오는 역할을 합니다.
     
