# Pagination

This component is using the «calculatePages» function
This function is poorly implemented. This is because in order to get the list of items for the page numbers to render, we are first creating an array with a total size of the total number of pages.
For average number of pages —10, 100, 1000, 10.000— this is not a problem; but when we have a considerable number of items that are creating an array of considerable length, this may create overhead on the client.

A refactoring will be needed to avoid creating this array.
