# Karnaugh Map

The following objections were made:

* Group := 4 formulas in a 2x2 grid

| Inputs | Formulas | Group rows | Group columns   |
| ------ | -------- | ---------- | --------------- |
| 1      | 2        | 1          | 1/2 (EDGE CASE) |
| 2      | 4        | 1          | 1               |
| 3      | 8        | 2          | 1               |
| 4      | 16       | 2          | 2               |
| 5      | 32       | 4          | 2               |
| 6      | 64       | 4          | 4               |
| 7      | 128      | 8          | 4               |
| 8      | 256      | 8          | 8               |
| 9      | 512      | 16         | 8               |
| 10     | 1024     | 16         | 16              |

```js
// This algorithm gets a tuple of [columns, rows] from n inputs

const getGrid = numberOfInputs => {
  // Handle edge case
  if (numberOfInputs === 1) return [1, 1]

  let grid = [1, 1] // columns, rows

  for (let i = 2; i < numberOfInputs; i++) {
    const [columns, rows] = grid

    if (columns === rows) grid[0] = columns * 2
    else grid[1] = rows * 2
  }

  return grid
}
```



## Observation: Positioning of fields in groups

| Truth table row | Group column | Group row  |
| --------------- | ------------ | ---------- |
| 0               | **Left**     | **Top**    |
| 1               | Right        | Top        |
| 2               | Left         | Bottom     |
| 3               | Right        | Bottom     |
| 4               | **Right**    | **Top**    |
| 5               | Left         | Top        |
| 6               | Right        | Bottom     |
| 7               | Left         | Bottom     |
| 8               | **Left**     | **Bottom** |
| 9               | Right        | Bottom     |
| 10              | Left         | Top        |
| 11              | Right        | Top        |
| 12              | **Right**    | **Bottom** |
| 13              | Left         | Bottom     |
| 14              | Right        | Top        |
| 15              | Left         | Top        |
| 16              | **Right**    | **Top**    |
| 17              | Left         | Top        |
| 18              | Right        | Bottom     |
| 19              | Left         | Bottom     |
| 20              | **Left**     | **Top**    |
| 21              | Right        | Top        |
| 22              | Left         | Bottom     |
| 23              | Right        | Bottom     |
| 24              | **Right**    | **Bottom** |
| 25              | Left         | Bottom     |
| 26              | Right        | Top        |
| 27              | Left         | Top        |
| 28              | **Left**     | **Bottom** |
| 29              | Right        | Bottom     |
| 30              | Left         | Top        |
| 31              | Right        | Top        |

## Observation: Positioning of groups

**BOLD**: First group when grid is a square after map got folded -> this group will be positioned at the most outer-left-bottomed cell

Folding: Alternating between folding over **horizontal-bottom** and **vertical-right**

When folding number is even, 

Each **fold k adds 2^k new groups**, where k > 0



### Vertical folding

* Grid **becomes a rectangle, where length = 2 * height**
* New groups **get added as a square**
* First group is placed on **first row** and **last column**
* Always spreads over all rows
* Always spreads over second half of columns



### Horizontal folding

* Grid **becomes a square**

* New groups **get added as a rectangle, where length = 2 * height**

* First group is placed on **last row** and **first column**

* Pattern of rows: (rows/2) times repeat last row/last row -1, then switch to last row -3/last row -2

* Pattern of cols: Groups of 4: Alternating between 2 values

* Always spreads over second half of rows


## Positioning of groups in grid system

| Group  | Row   | Col   | Added on Fold       | Inputs |
| ------ | ----- | ----- | ------------------- | ------ |
| 0      | 1     | 1     | 1                   | 2      |
| **1**  | **1** | **2** | **2 (right fold)**  | **3**  |
| **2**  | **2** | **1** | **3 (bottom-fold)** | **4**  |
| 3      | 2     | 2     | 3                   | 4      |
| **4**  | **1** | **4** | **4 (right fold)**  | **5**  |
| 5      | 1     | 3     | 4                   | 5      |
| 6      | 2     | 4     | 4                   | 5      |
| 7      | 2     | 3     | 4                   | 5      |
| **8**  | **4** | **1** | **5 (bottom-fold)** | **6**  |
| 9      | 4     | 2     | 5                   | 6      |
| 10     | 3     | 1     | 5                   | 6      |
| 11     | 3     | 2     | 5                   | 6      |
| 12     | 4     | 4     | 5                   | 6      |
| 13     | 4     | 3     | 5                   | 6      |
| 14     | 3     | 4     | 5                   | 6      |
| 15     | 3     | 3     | 5                   | 6      |
| **16** | **1** | **8** | **6 (right-fold)**  | **7**  |
| 17     | 1     | 7     | 6                   | 7      |
| 18     | 2     | 8     | 6                   | 7      |
| 19     | 2     | 7     | 6                   | 7      |
| 20     | 1     | 5     | 6                   | 7      |
| 21     | 1     | 6     | 6                   | 7      |
| 22     | 2     | 5     | 6                   | 7      |
| 23     | 2     | 6     | 6                   | 7      |
| 24     | 4     | 8     | 6                   | 7      |
| 25     | 4     | 7     | 6                   | 7      |
| 26     | 3     | 8     | 6                   | 7      |
| 27     | 3     | 7     | 6                   | 7      |
| 28     | 4     | 5     | 6                   | 7      |
| 29     | 4     | 6     | 6                   | 7      |
| 30     | 3     | 5     | 6                   | 7      |
| 31     | 3     | 6     | 6                   | 7      |

Useful variables: 

dec(63)