## Results

Query:

```graphql
{
  companies( id: "uuid-2" ) { 
    id, createdAt, name, parentId, cost, children 
  }
}
```

Result:

```json
{
  "data": {
    "companies": [
      {
        "id": "uuid-2",
        "createdAt": "2021-02-25T10:35:32.978Z",
        "name": "Stamm LLC",
        "parentId": "uuid-1",
        "cost": 5199,
        "children": [
          {
            "id": "uuid-4",
            "createdAt": "2021-02-25T06:11:47.519Z",
            "name": "Price and Sons",
            "parentId": "uuid-2",
            "cost": 1340
          },
          {
            "id": "uuid-7",
            "createdAt": "2021-02-25T07:56:32.335Z",
            "name": "Zieme - Mills",
            "parentId": "uuid-2",
            "cost": 1636
          },
          {
            "id": "uuid-19",
            "createdAt": "2021-02-25T21:06:18.777Z",
            "name": "Schneider - Adams",
            "parentId": "uuid-2",
            "cost": 794
          }
        ]
      }
    ]
  }
}
```

## Installation

```bash
$ pnpm install
$ cp .env.example .env
```

## Running the app

```bash
# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

