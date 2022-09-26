const requestURL = 'https://frontend-test-assignment-api.abz.agency';

export const getUsers = async (page: number, count: number) => {
  const response = await fetch(`${requestURL}/api/v1/users?page=${page}&count=${count}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getPositions = async () => {
  const response = await fetch(`${requestURL}/api/v1/positions`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

// export const createComment = async (
//   postId: number,
//   name: string,
//   email: string,
//   body: string,
// ) => {
//   const response = await fetch(`${BASE_URL}/comments`, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify({
//       postId,
//       name,
//       email,
//       body,
//     }),
//   });

//   const result = await response.json();

//   return result;
// };
