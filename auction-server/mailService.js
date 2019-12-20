const axios = require("axios");

const mailTemplate = (isSeller, isSold, content) => `
<div>
    <h3>세상의 모든 중고 경매 팔다 알림메일 입니다.</h3>
    <span>${isSeller ? "등록하신" : "입찰하신"} ${content}이 
    ${
      isSeller
        ? isSold
          ? "판매되었"
          : "유찰되었"
        : isSold
        ? "낙찰되었"
        : "유찰되었"
    }습니다.</span>
    <div>팔다에 접속해 확인하시기 바랍니다.</div>
</div>
`;

const mailTitleTemplate = (isSeller, isSold) => {
  if (isSeller) return `${isSold ? "판매" : "유찰"} 되었습니다.`;
  return `${isSold ? "낙찰" : "유찰"} 되었습니다.`;
};

const mailFooter = `
<a href="http://palda.shop" style="
    display: flex;
    width: 500px;
    text-decoration: none;
    color: black;
    border: #cccccc solid 1px;
    border-radius: 20px;
    margin: 50px 0;
">
        <img style="width:75px;height:75px;margin: 5px 10px;" src="https://kr.object.ncloudstorage.com/paldastorage/logo/palda.png">
        <div style="display:flex;width: 100%;flex-direction:column;justify-content: space-around;border-left: #cccccc solid 1px;padding: 0 10px;">
            <h3 style="
    margin: 0;
">중고 물건은 이곳 팔다에서!</h3>
            <span>http://palda.shop</span>
        </div>
    </a>`;

const user = {
  id: process.env.MAIL_ID,
  password: process.env.MAIL_PASSWORD
};

const mailService = (toEmail, content, isSeller, isSold) => {
  if (!toEmail) return;
  // text html 택1 (html이 우선순위 높음)
  const mail = {
    to: toEmail,
    subject: `[팔다] 상품 ${content}이(가) ${mailTitleTemplate(
      isSeller,
      isSold
    )}`,
    html: mailTemplate(isSeller, isSold, content) + mailFooter
  };

  const instance = axios.create({
    baseURL: process.env.MAIL_BASE,
    headers: {
      "content-type": "application/json",
      Accept: "application/json"
    }
  });

  let cookie = "";

  const getCookie = async () => {
    const response = await instance.post("/auth/login", user);
    cookie = response.headers["set-cookie"][0];
  };

  const sendMail = () =>
    instance.post("/mail", mail, {
      headers: {
        Cookie: cookie
      }
    });

  const run = async () => {
    try {
      await sendMail();
      return true;
    } catch (error) {
      if (error.response.status !== 401) {
        return error;
      }
    }
    await getCookie();
    const result = await sendMail();
  };

  run();
};

const sendMail = (pool, userid, title, isSeller, isSold) => {
  pool.query(
    "select email from users where id = ?",
    [userid],
    (err, row, field) => {
      if (!row) return;
      if (!row[0]) return;
      if (!row[0].email) return;
      mailService(row[0].email, title, isSeller, isSold);
    }
  );
};

module.exports = { sendMail };
