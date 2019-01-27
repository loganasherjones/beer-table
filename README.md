# Beer Table

[![Coverage Status](https://coveralls.io/repos/github/loganasherjones/beer-table/badge.svg?branch=master)](https://coveralls.io/github/loganasherjones/beer-table?branch=master)
[![Build Status](https://travis-ci.org/loganasherjones/beer-table.svg?branch=master)](https://travis-ci.org/loganasherjones/beer-table)

Beer Table is a simple Material-UI table wrapper for server and client side:

* filtering
* sorting
* pagination

NOTE: This package is currently in alpha and is subject to aggressive API changes.

## Install

```
npm install beer-table --save
```

## Demo

TODO: once this is deployed, add a link to CodeSandbox

## Usage

For a simple table:

```js
import BeerTable from 'beer-table';

const columns = [
    { name: 'Name', id: 'name' },
    { name: 'Age', id: 'age' },
]

const data = [
    { name: 'Alice', age: 28},
    { name: 'Bob', age: 30},
    { name: 'Charles', age: 21},
]

<BeerTable columns={columns} data={data} />
```

For a more advanced use-case, [checkout the examples.](examples/client/index.js)


## API

WARNING: The API is likely to change until I am out of alpha. You have been warned.

#### &lt;BeerTable />

|Name|Type|Required|Description|
|----|----|--------|-----------|
|`data`|array|`true`|Data to display, must be an array of objects.
|`columns`|array|`true`|Column description. Must be an array of objects. See the columns below fore more information.
|`loading`|boolean|`false`|Used to display a spinner while data is loading.
|`totalCount`|number|`false`|Used to indicate the total number of rows, default is the `data.length`
|`filterCount`|number|`false`|Used if filtering happens server-side. Indicates # of rows after filtering.
|`pagination`|object|`false`|Used if pagination happens server-side. See info below.

#### columns

The columns help you customize a column's behavior. Options:

|Name|Type|Required|Default|Description|
|----|----|--------|-------|-----------|
|`name`|string|true|N/A|Name of the column
|`id`|string|`false`|`col.name`|Identifies a column, also used as the accessor in `data`
|`formatter`|func|`false`|`null`|Format a value before it is displayed.
|`filterValue`|string|`false`|`null`|Set a filter value by default.
|`customSort`|func|`false`|`null`| Used to customize the way sorting works.
|`sortDirection`|string|`false`|`null`|Sort direction for this column. Only options are: `desc` or `asc`
|`disableSort`|boolean|`false`|`false`|Disable sorting for this column.
|`defaultSortDirection`|string|`false`|`desc`|On the first click to sort, which direction to sort.
|`customMatch`|func|`false`|`defaultMatch`|A match function to use for filtering. See [defaultMatch](src/utils.js)
|`filterEnum`|array|`false`|`null`|A list of possible values for the filter.
|`disableFilter`|boolean|`false`|`false`|Disable filtering on this column.
|`datetime`|boolean|`false`|`false`|Determine if type of value is datetime.

#### pagination

The pagination can be used to customize the pagination displays.

|Name|Type|Required|Default|Description|
|----|----|--------|-------|-----------|
|`currentPageNum`|number|`false`|`0`|What page number to start from.
|`rowsPerPageOptions`|array|`false`|`[10, 25, 50, 100]`|How many options for # of rows.
|`rowsPerPage`|number|`false`|`10`|How many rows to show by default. Should be a member of `rowsPerPageOptions`

## License

The files included in this repository are licensed under the MIT license

## Road to Beta

I plan on getting all the following working before I make the API more stable.

Feature | Client | Server | Mobile
------- | ------ | ------ | ------
Filtering | :heavy_check_mark: | :x: | :x:
Sorting | :heavy_check_mark: | :x: | :x:
Pagination | :heavy_check_mark: | :x: | :x:
Loading | :heavy_check_mark: | :heavy_check_mark: | :x:
Error | :heavy_check_mark: | :heavy_check_mark: | :x:
Empty | :heavy_check_mark: | :heavy_check_mark: | :x:
Column Width | :x: | :x: | :x:
