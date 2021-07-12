# 14 hotel
- Node.js express framework + REACT
- mongodb
[homepage]()


# packages
- mongoose
- joi
- express
- jsonwebtoken
- ejs (for test)
- cors
- bcrypt


# 이름, 맡은 일
1. 이정원: 팀장, 틀 잡기, review
2. 박정훈: login, register, book
3. 권오빈: room, CORS

# 기능 (폴더별, 특징, 넣고 싶었는데 못 넣은 것)
- routers: router for urls, APIs
- schemas: for DB
- views: for test

# DB schema
- index.js: 
- room.js: name(String), image(String), price(Number)
- review.js: userId(ObjectID, ref), date(String), title(String), content(String)
- user.js: nickname(String), email(String), password(String. bcrypted)
- book.js: userId(ObjectId, ref), roomId(ObjectId, ref), startDate(String), endDate(String), adult(Number), kid(Number), price(Number)


# 배운 점, 느낀 점
- 이정원


- 박정훈


- 권오빈