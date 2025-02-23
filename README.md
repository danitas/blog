This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Make sure that your node version is greater or match the expected

```bash
  "engines" : {
    "npm" : ">=10.8.1",
    "node" : ">=20.16.0"
  },
```

First, run the development server:

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing
For testing run command

```bash
npm run test
```

This will create a coverage folder automatically that can be used to understand code coverage

Most of the components are covered with unit test, except `Home` component where several integration tests has been created

All tests are stored under the `src/__test__/`folder: [__tests__](src%2F__tests__)

## Deploy on Vercel

The Blog app is automatically deploying to Vercel you can check it out by using this link https://blog-danitas.vercel.app/


## App

The Blog app uses https://jsonplaceholder.typicode.com `/posts` API to retrieve data about posts.

On Home [page.tsx](src%2Fapp%2Fpage.tsx) user can create post, delete post, update post and open detailed post view.

Those posts are persisted in local storage inside the [PostStoreContext.tsx](src%2Fcontext%2FPostStoreContext.tsx)

To maintain compatibility with manually created posts, on PostDetail page [page.tsx](src%2Fapp%2Fpost%2F%5Bid%5D%2Fpage.tsx) the data isn't fetched from API, to keep the possibility to show manually created posts even after page refresh.

On Post Detail page the post can be only updated.

## TechStack

- axios
- jest
- react-testing-library
- eslint
- prettier
- next.js
- typescript
- tailwind
- lucid-icons
