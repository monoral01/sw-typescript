const getURL = (pageNumber: number, query?: string) => {
  const baseURL = new URL('https://swapi.dev/api/people/');
  baseURL.searchParams.set('page', String(pageNumber));
  if (query) {
    baseURL.searchParams.set('search', query);
  }
  return String(baseURL);
};

export const fetchData = async (pageNumber: number, query?: string) => {
  const url = getURL(pageNumber, query);
  return await fetch(url).then((res) => res.json());
};
