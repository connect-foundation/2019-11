## (api)server 개발 서버 실행 절차

```bash
#[중요] .env.example 파일을 참고하여 .env 파일 설정
npm install
npm run build
docker-compose up -d mysql-server
docker-compose up -d api-server
```
