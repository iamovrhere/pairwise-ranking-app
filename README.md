# Pairwise Ranking Web

["Pairwise Ranking"](https://en.wikipedia.org/wiki/Pairwise_comparison) (sometimes called "Preference Ranking"), can be best described as taking a "divide and conquer" approach to prioritizing/ranking a set.

In it we expand the comparisons into a every possible combination of 2, compare a pair, assign one a winner, and repeat. After we've assigned every possible pair a winner, we will have an aggregate of winners, where repeated winners gravitate to the top and losers to the bottom.

> L. L. Thurstone first introduced a scientific approach to using pairwise comparisons for measurement in 1927, which he referred to as the law of comparative judgment.

This is intended as a simple web app to aggregate a preference list from input (using local storage for now), by simplifying to a simple A or B choice.

# Requirements

* **Recommended:** Node 14

