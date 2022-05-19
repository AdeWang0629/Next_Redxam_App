/**
 *  (c) redxam llc and affiliates. Confidential and proprietary.
 *
 *  @oncall dev+max
 *  @format
 */

'use strict';

const kthLargest = (arr, k) => {
  const sorted = arr.sort((a, b) => b - a);
  return sorted[k];
};

console.log(kthLargest([5, 2, 9, 6, 1], 1)); // ==> 6
