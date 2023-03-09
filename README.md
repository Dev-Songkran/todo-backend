## Getting Started

สร้างฐานข้อมูล

```bash
$ docker-compose -f docker-compose.yml up -d
```

ติดตั้งแพคเกจ

```bash
npm i
# or
yarn
# or
pnpm i
```

config .env

```bash
DB_HOST={{HOST}}
DB_PORT={{PORT}}
DB_USER={{USER}}
DB_PASS={{PASS}}
DB_NAME={{NAME}}
```

## Runing Server

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

#### [API Document](api.rest)
