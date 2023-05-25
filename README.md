* `yarn` or `npm install`
* `yarn start` or `npm run start`

# Minimal repro for [@TanStack/table#4739](https://github.com/TanStack/table/discussions/4739)

See commit `8409f3d` in [src/App.tsx](src/App.tsx): the "React-closure-in-cell" and "table-meta-in-cell" methods react to the increment, but no methods involving `accessorFn` (desired) do
